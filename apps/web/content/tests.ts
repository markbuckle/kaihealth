export type TestCategory = { id: string; label: string; tests: string[] };

// placeholder: only Heart has a list so far; the other categories show this until filled in
export const testListPlaceholder = '[TEST LIST TO COME]';

export const testCategories: TestCategory[] = [
  {
    id: 'heart',
    label: 'Heart',
    tests: [
      'Apolipoprotein B (ApoB)',
      'LDL cholesterol',
      'HDL cholesterol',
      'Triglycerides',
      'Lipoprotein(a)',
      'High-sensitivity CRP',
    ],
  },
  { id: 'metabolic', label: 'Metabolic', tests: [] },
  { id: 'thyroid', label: 'Thyroid', tests: [] },
  { id: 'hormones', label: 'Hormones', tests: [] },
  { id: 'nutrients', label: 'Nutrients', tests: [] },
  { id: 'inflammation', label: 'Inflammation', tests: [] },
  { id: 'liver', label: 'Liver', tests: [] },
  { id: 'kidneys', label: 'Kidneys', tests: [] },
  { id: 'blood', label: 'Blood', tests: [] },
  { id: 'immune', label: 'Immune', tests: [] },
];
