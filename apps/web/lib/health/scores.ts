import { type AreaId, healthAreas } from './areas';
import type { Result, Status } from './types';

// DEMO FORMULA, NOT A CLINICAL ONE. It shows how a dashboard score could combine results.
// No clinician has reviewed these points or weights, and the numbers mean nothing medically.
//
// 1. Each result earns points for its status.
// 2. An area's score averages its results, counting the weakest result twice so one poor
//    result is not averaged away.
// 3. The overall score averages the area scores, counting Heart and Metabolic twice.
// 4. A result's contribution is how far it moves the overall score away from the in-range
//    level. The in-range level plus every contribution equals the overall score, which is
//    what the "How this is calculated" panel lists.

const statusPoints: Record<Status, number> = {
  optimal: 100,
  'in-range': 85,
  borderline: 60,
  'out-of-range': 30,
};

const baseline = statusPoints['in-range'];

const areaWeights: Partial<Record<AreaId, number>> = { heart: 2, metabolic: 2 };

// the lowest area score for each status, highest first
const areaStatusFloors: [Status, number][] = [
  ['optimal', 90],
  ['in-range', 70],
  ['borderline', 50],
];

export type AreaScore = { area: AreaId; score: number; status: Status; drivers: Result[] };

// points this result adds to (positive) or takes from (negative) the overall score
export type Contribution = { result: Result; points: number };

export type ScoreBreakdown = { score: number; areas: AreaScore[]; contributions: Contribution[] };

export function areaStatus(score: number): Status {
  return areaStatusFloors.find(([, floor]) => score >= floor)?.[0] ?? 'out-of-range';
}

function pointsFor(result: Result): number {
  return statusPoints[result.observation.interpretation.status];
}

// the results below optimal, weakest first, or the area's own results when all are optimal
function driversOf(results: Result[]): Result[] {
  const sorted = [...results].sort((a, b) => pointsFor(a) - pointsFor(b));
  const belowOptimal = sorted.filter(
    (result) => result.observation.interpretation.status !== 'optimal',
  );
  return (belowOptimal.length > 0 ? belowOptimal : sorted).slice(0, 3);
}

// Areas come back in the order of healthAreas, unrounded, so callers round once for display.
export function scoreResults(results: readonly Result[]): ScoreBreakdown {
  const groups = healthAreas
    .map((area) => ({
      area: area.id,
      weight: areaWeights[area.id] ?? 1,
      results: results.filter((result) => result.biomarker.area === area.id),
    }))
    .filter((group) => group.results.length > 0);
  const totalWeight = groups.reduce((sum, group) => sum + group.weight, 0) || 1;

  const areas: AreaScore[] = [];
  const contributions: Contribution[] = [];
  let score = 0;

  for (const group of groups) {
    const scored = group.results.map((result) => ({ result, points: pointsFor(result) }));
    const weakest = scored.reduce((low, entry) => (entry.points < low.points ? entry : low));
    const weighted = scored.map((entry) => ({ ...entry, weight: entry === weakest ? 2 : 1 }));
    const resultWeight = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    const areaScore =
      weighted.reduce((sum, entry) => sum + entry.points * entry.weight, 0) / resultWeight;
    const areaShare = group.weight / totalWeight;

    areas.push({
      area: group.area,
      score: areaScore,
      status: areaStatus(areaScore),
      drivers: driversOf(group.results),
    });
    score += areaScore * areaShare;
    for (const entry of weighted) {
      contributions.push({
        result: entry.result,
        points: areaShare * (entry.weight / resultWeight) * (entry.points - baseline),
      });
    }
  }

  return { score, areas, contributions };
}
