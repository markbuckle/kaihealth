// SYNTHETIC SAMPLE DATA. Invented values for the demo dashboard.
// None of this belongs to a real person and none of it is medical guidance.

export type Status = 'good' | 'warn' | 'flag';

export const statusLabels: Record<Status, string> = {
  good: 'In range',
  warn: 'Watch',
  flag: 'Out of range',
};

export type RangeBand = { label: string; status: Status; weight: number };

export type Biomarker = {
  id: string;
  name: string;
  category: string;
  unit: string;
  // decimal places used to print values and changes
  precision: number;
  status: Status;
  range: {
    bands: RangeBand[];
    // where the current value sits along the bar, as a percentage of its width
    markerPercent: number;
  };
  reference: { value: number; label: string };
  // oldest first; the last entry is the current result
  history: { date: string; value: number }[];
};

export const sampleBiomarkers: Biomarker[] = [
  {
    id: 'apob',
    name: 'Apolipoprotein B (ApoB)',
    category: 'Heart',
    unit: 'g/L',
    precision: 2,
    status: 'good',
    range: {
      bands: [
        { label: 'Optimal', status: 'good', weight: 2 },
        { label: 'Borderline', status: 'warn', weight: 1.2 },
        { label: 'High', status: 'flag', weight: 1.6 },
      ],
      markerPercent: 27,
    },
    reference: { value: 0.8, label: 'Optimal' },
    history: [
      { date: 'Nov 24', value: 0.98 },
      { date: 'Nov 25', value: 0.86 },
      { date: 'Nov 26', value: 0.74 },
    ],
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D (25-OH)',
    category: 'Nutrients',
    unit: 'nmol/L',
    precision: 0,
    status: 'warn',
    range: {
      bands: [
        { label: 'Low', status: 'flag', weight: 1.2 },
        { label: 'Borderline', status: 'warn', weight: 1.1 },
        { label: 'Optimal', status: 'good', weight: 2.2 },
      ],
      markerPercent: 40,
    },
    reference: { value: 75, label: 'Optimal' },
    history: [
      { date: 'Nov 24', value: 48 },
      { date: 'Nov 25', value: 55 },
      { date: 'Nov 26', value: 62 },
    ],
  },
  {
    id: 'hs-crp',
    name: 'High-sensitivity CRP',
    category: 'Inflammation',
    unit: 'mg/L',
    precision: 1,
    status: 'flag',
    range: {
      bands: [
        { label: 'Low', status: 'good', weight: 1.4 },
        { label: 'Moderate', status: 'warn', weight: 1.6 },
        { label: 'High', status: 'flag', weight: 1.6 },
      ],
      markerPercent: 82,
    },
    reference: { value: 1, label: 'Low' },
    history: [
      { date: 'Nov 24', value: 1.9 },
      { date: 'Nov 25', value: 2.6 },
      { date: 'Nov 26', value: 3.4 },
    ],
  },
];

// counts for the summary panel in the hero dashboard
export const sampleSummary: Record<Status, number> = {
  good: 91,
  warn: 9,
  flag: 4,
};

export const sampleClinicianNote =
  'Your ApoB has come down across three tests and now sits in the optimal range. Keep going with your current plan and we will recheck it at your next draw.';

export function currentValue(biomarker: Biomarker): number {
  return biomarker.history.at(-1)?.value ?? 0;
}

export function formatValue(biomarker: Biomarker, value = currentValue(biomarker)): string {
  return value.toFixed(biomarker.precision);
}

// for example "0.12 lower than last test", or null with fewer than two results
export function describeChange(biomarker: Biomarker): string | null {
  const [previous, latest] = biomarker.history.slice(-2);
  if (!previous || !latest) return null;
  const diff = latest.value - previous.value;
  const direction = diff < 0 ? 'lower' : 'higher';
  return `${formatValue(biomarker, Math.abs(diff))} ${direction} than last test`;
}
