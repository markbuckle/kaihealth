// The one place dashboard pages get member data from. Today it reads the synthetic demo
// content. When sign-in and a database exist, only this file changes; the screens and the
// pure functions in lib/health stay as they are.

import { demoInsights, type Insight } from '../content/demo/insights';
import { demoClinicianName, demoMember } from '../content/demo/member';
import { demoRecommendations, demoWeeklyFocus } from '../content/demo/recommendations';
import { demoBiomarkers, demoDraws } from '../content/demo/results';
import { demoTesting } from '../content/demo/testing';
import { type AreaId, areaLabel } from './health/areas';
import { planCategoryLabel, type Recommendation } from './health/plan';
import { resultSeries, resultsOn } from './health/results';
import { type Contribution, scoreResults } from './health/scores';
import type { Direction, Draw, Status } from './health/types';

export type Member = {
  firstName: string;
  fullName: string;
  initials: string;
  unreadNotifications: number;
};

export async function getMember(): Promise<Member> {
  const { firstName, lastName, unreadNotifications } = demoMember;
  return {
    firstName,
    fullName: `${firstName} ${lastName}`,
    initials: `${firstName.charAt(0)}${lastName.charAt(0)}`,
    unreadNotifications,
  };
}

export type AreaSummary = {
  id: AreaId;
  label: string;
  // rounded for display; areas are ranked on the unrounded scores
  score: number;
  previousScore?: number;
  status: Status;
  drivers: string[];
};

// one line of the "How this is calculated" panel
export type ScoreFactor = { name: string; status: Status; direction?: Direction; points: number };

export type PlanItem = Recommendation & { categoryLabel: string; areaLabels: string[] };

export type HomeSummary = {
  firstName: string;
  clinician: string;
  // newest first
  draws: Draw[];
  nextDrawDue: string;
  resultsConsultBooked: boolean;
  score: {
    value: number;
    previous?: number;
    areaCount: number;
    // most negative first
    holdingBack: ScoreFactor[];
    // most positive first
    helping: ScoreFactor[];
  };
  // where focus will help most first
  areas: AreaSummary[];
  focus: typeof demoWeeklyFocus & { categoryLabel: string; areaLabels: string[] };
  insights: Insight[];
  // by rank
  plan: PlanItem[];
};

function toFactor({ result, points }: Contribution): ScoreFactor {
  const { status, direction } = result.observation.interpretation;
  return { name: result.biomarker.name, status, direction, points };
}

function toPlanItem(recommendation: Recommendation): PlanItem {
  return {
    ...recommendation,
    categoryLabel: planCategoryLabel(recommendation.category),
    areaLabels: recommendation.areas.map(areaLabel),
  };
}

export async function getHomeSummary(): Promise<HomeSummary> {
  const series = resultSeries(demoBiomarkers, demoDraws);
  const [previousDraw, latestDraw] = demoDraws.slice(-2);
  if (!latestDraw) throw new Error('The demo member has no draws.');

  const current = scoreResults(resultsOn(series, latestDraw.drawn));
  const previous = previousDraw ? scoreResults(resultsOn(series, previousDraw.drawn)) : undefined;
  const previousArea = (id: AreaId) => previous?.areas.find((area) => area.area === id)?.score;
  const round = (score: number | undefined) =>
    score === undefined ? undefined : Math.round(score);

  const areas = [...current.areas]
    .sort((a, b) => a.score - b.score)
    .map(
      (area): AreaSummary => ({
        id: area.area,
        label: areaLabel(area.area),
        score: Math.round(area.score),
        previousScore: round(previousArea(area.area)),
        status: area.status,
        drivers: area.drivers.map((driver) => driver.biomarker.shortName),
      }),
    );

  const factors = current.contributions.map(toFactor);
  const focusRecommendation = demoRecommendations.find(
    (entry) => entry.id === demoWeeklyFocus.recommendationId,
  );
  if (!focusRecommendation) throw new Error('The weekly focus points at a missing recommendation.');

  return {
    firstName: demoMember.firstName,
    clinician: demoClinicianName,
    draws: [...demoDraws].reverse(),
    nextDrawDue: demoTesting.nextDrawDue,
    resultsConsultBooked: demoTesting.resultsConsultBooked,
    score: {
      value: Math.round(current.score),
      previous: round(previous?.score),
      areaCount: current.areas.length,
      holdingBack: factors.filter((f) => f.points < 0).sort((a, b) => a.points - b.points),
      helping: factors.filter((f) => f.points > 0).sort((a, b) => b.points - a.points),
    },
    areas,
    focus: {
      ...demoWeeklyFocus,
      categoryLabel: planCategoryLabel(focusRecommendation.category),
      areaLabels: demoWeeklyFocus.areas.map(areaLabel),
    },
    insights: demoInsights,
    plan: [...demoRecommendations].sort((a, b) => a.rank - b.rank).map(toPlanItem),
  };
}
