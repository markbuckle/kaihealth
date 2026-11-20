// SYNTHETIC DEMO DATA. Article titles from the wireframe. The articles are not written yet.
// None of this is medical guidance.

export type Insight = { id: string; title: string; minutes: number; topic: string };

export const demoInsights: Insight[] = [
  {
    id: 'apob-vs-ldl',
    title: 'What ApoB measures, and why it beats LDL alone',
    minutes: 4,
    topic: 'Heart',
  },
  {
    id: 'vitamin-d-winter',
    title: 'Why vitamin D dips in Newfoundland winters',
    minutes: 3,
    topic: 'Nutrients',
  },
  {
    id: 'lpa-inherited',
    title: 'Lp(a): the cholesterol marker you inherit',
    minutes: 5,
    topic: 'Heart',
  },
  { id: 'range-bars', title: 'Reading your range bars', minutes: 2, topic: 'Basics' },
];
