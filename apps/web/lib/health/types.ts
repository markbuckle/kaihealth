import type { AreaId } from './areas';

// Results are shaped like FHIR Observations. Field names follow the FHIR resource where one
// exists, so FHIR tables or a lab partner feed can map onto them later.

export type Coding = { system: string; code: string; display: string };

export const statuses = ['optimal', 'in-range', 'borderline', 'out-of-range'] as const;
export type Status = (typeof statuses)[number];

// which way a borderline or out-of-range result leans
export type Direction = 'high' | 'low';

// One zone of a reference range and the status a value inside it gets. A biomarker's zones
// run low to high and meet end to end: low is inclusive, high is exclusive.
export type ReferenceRange = { status: Status; low?: number; high?: number };

export type Interpretation = {
  status: Status;
  direction?: Direction;
  // FHIR v3 ObservationInterpretation: N normal, H high, L low
  code: 'N' | 'H' | 'L';
};

export type Biomarker = {
  id: string;
  code: Coding;
  name: string;
  // the name as it reads inside a sentence, for example "LDL" or "fasting glucose"
  shortName: string;
  area: AreaId;
  // a UCUM code for data and a display form for people
  unit: { code: string; display: string };
  // decimal places used to print values and changes
  precision: number;
  referenceRange: ReferenceRange[];
  // the values at either end of the range bar
  scale: { min: number; max: number };
};

export type Observation = {
  resourceType: 'Observation';
  id: string;
  code: Coding;
  valueQuantity: { value: number; unit: string; system: string; code: string };
  // an ISO date, or YYYY-MM when only the month is known (FHIR allows partial dates)
  effectiveDateTime: string;
  referenceRange: ReferenceRange[];
  // derived from the value and the range, never stored by hand
  interpretation: Interpretation;
};

// One blood draw. Values are keyed by biomarker id.
export type Draw = {
  drawn: string;
  reviewed?: { date: string; by: string };
  values: Readonly<Record<string, number>>;
};

// one biomarker and its results, oldest first
export type ResultSeries = { biomarker: Biomarker; observations: Observation[] };

// one biomarker's result from one draw
export type Result = { biomarker: Biomarker; observation: Observation };
