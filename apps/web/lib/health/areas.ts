// The health areas results are grouped into, in the order the dashboard lists them.
export const healthAreas = [
  { id: 'heart', label: 'Heart' },
  { id: 'inflammation', label: 'Inflammation' },
  { id: 'metabolic', label: 'Metabolic' },
  { id: 'nutrients', label: 'Nutrients' },
  { id: 'liver', label: 'Liver' },
  { id: 'hormones', label: 'Hormones' },
  { id: 'blood', label: 'Blood' },
  { id: 'kidney', label: 'Kidney' },
  { id: 'thyroid', label: 'Thyroid' },
] as const;

export type HealthArea = (typeof healthAreas)[number];
export type AreaId = HealthArea['id'];

export function areaLabel(id: AreaId): string {
  return healthAreas.find((area) => area.id === id)?.label ?? id;
}
