// SYNTHETIC DEMO DATA. The demo member's action plan, worded as in the wireframe.
// None of this is medical guidance.

import type { AreaId } from '../../lib/health/areas';
import type { Recommendation } from '../../lib/health/plan';

export const demoRecommendations: Recommendation[] = [
  {
    id: 'strength-training',
    category: 'exercise',
    rank: 1,
    title: 'Strength training twice a week',
    areas: ['heart', 'metabolic'],
    secondaryAction: 'Plan your sessions',
  },
  {
    id: 'soluble-fibre',
    category: 'nutrition',
    rank: 2,
    title: 'Add 10 g of soluble fibre a day to help lower ApoB',
    areas: ['heart'],
    secondaryAction: 'Meal ideas',
  },
  {
    id: 'lpa-follow-up',
    category: 'follow-up-testing',
    rank: 3,
    title: 'Talk to your family doctor about your Lp(a) result',
    areas: ['heart'],
  },
];

// one step from a recommendation, picked for this week
export const demoWeeklyFocus: {
  recommendationId: string;
  title: string;
  summary: string;
  detail: string;
  areas: AreaId[];
} = {
  recommendationId: 'strength-training',
  title: 'Add two strength sessions',
  summary: 'Two 25 minute sessions on non-back-to-back days.',
  detail: 'Strength work helps lower ApoB and improves how your body handles sugar.',
  areas: ['heart', 'metabolic'],
};
