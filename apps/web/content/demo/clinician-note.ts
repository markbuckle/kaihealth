// SYNTHETIC DEMO DATA. The clinician note on the demo member's ApoB result, from the wireframe.
// None of this belongs to a real person and none of it is medical guidance.

import { demoClinicianName } from './member';

export const demoClinicianNote = {
  biomarkerId: 'apob',
  author: demoClinicianName,
  date: '2026-10-21',
  body: 'Good progress since April. With your Lp(a) and family history, I would like to see ApoB under 0.90 g/L. Strength training and more soluble fibre are your best next steps. We will recheck in April.',
} as const;
