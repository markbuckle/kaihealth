import { formatNumber } from './format';
import { interpret } from './status';
import type { Biomarker, Draw, Observation, Result, ResultSeries, Status } from './types';

const ucum = 'http://unitsofmeasure.org';

export function toObservation(
  biomarker: Biomarker,
  value: number,
  effectiveDateTime: string,
): Observation {
  return {
    resourceType: 'Observation',
    id: `${biomarker.id}-${effectiveDateTime}`,
    code: biomarker.code,
    valueQuantity: { value, unit: biomarker.unit.display, system: ucum, code: biomarker.unit.code },
    effectiveDateTime,
    referenceRange: biomarker.referenceRange,
    interpretation: interpret(value, biomarker.referenceRange),
  };
}

// Each biomarker with its results across the draws, oldest first. Draws must be oldest first.
export function resultSeries(
  biomarkers: readonly Biomarker[],
  draws: readonly Draw[],
): ResultSeries[] {
  return biomarkers.map(
    (biomarker): ResultSeries => ({
      biomarker,
      observations: draws.flatMap((draw) => {
        const value = draw.values[biomarker.id];
        return value === undefined ? [] : [toObservation(biomarker, value, draw.drawn)];
      }),
    }),
  );
}

// every biomarker's result from the draw on one date
export function resultsOn(series: readonly ResultSeries[], date: string): Result[] {
  return series.flatMap(({ biomarker, observations }) => {
    const observation = observations.find((entry) => entry.effectiveDateTime === date);
    return observation ? [{ biomarker, observation }] : [];
  });
}

export function statusCounts(results: readonly Result[]): Record<Status, number> {
  const counts: Record<Status, number> = {
    optimal: 0,
    'in-range': 0,
    borderline: 0,
    'out-of-range': 0,
  };
  for (const { observation } of results) counts[observation.interpretation.status] += 1;
  return counts;
}

export function formatValue(biomarker: Biomarker, value: number): string {
  return formatNumber(value, biomarker.precision);
}

// for example "0.13 lower than last test", or null with fewer than two results
export function describeChange({ biomarker, observations }: ResultSeries): string | null {
  const [previous, latest] = observations.slice(-2);
  if (!previous || !latest) return null;
  const diff = latest.valueQuantity.value - previous.valueQuantity.value;
  const direction = diff < 0 ? 'lower' : 'higher';
  return `${formatValue(biomarker, Math.abs(diff))} ${direction} than last test`;
}

export type RangeBand = { status: Status; weight: number };

// The zones as bands of the range bar, each as wide as its share of the scale.
export function rangeBands({ referenceRange, scale }: Biomarker): RangeBand[] {
  return referenceRange
    .map((zone) => ({
      status: zone.status,
      weight:
        Math.min(zone.high ?? scale.max, scale.max) - Math.max(zone.low ?? scale.min, scale.min),
    }))
    .filter((band) => band.weight > 0);
}

// where a value sits along the range bar, as a percentage of its width
export function markerPercent({ scale }: Biomarker, value: number): number {
  const percent = ((value - scale.min) / (scale.max - scale.min)) * 100;
  return Math.min(100, Math.max(0, percent));
}

// The edge of the optimal zone nearest the value, which the trend chart draws as a target line.
export function optimalEdge({ referenceRange }: Biomarker, value: number): number | null {
  const optimal = referenceRange.find((zone) => zone.status === 'optimal');
  if (!optimal) return null;
  const edges = [optimal.low, optimal.high].filter((edge) => edge !== undefined);
  return edges.reduce<number | null>(
    (nearest, edge) =>
      nearest === null || Math.abs(edge - value) < Math.abs(nearest - value) ? edge : nearest,
    null,
  );
}
