import type { AreaId } from './areas';

// The action plan's categories, in the order the dashboard lists them.
export const planCategories = [
  { id: 'exercise', label: 'Exercise' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'screening', label: 'Screening' },
  { id: 'follow-up-testing', label: 'Follow-up testing' },
] as const;

export type PlanCategory = (typeof planCategories)[number];
export type PlanCategoryId = PlanCategory['id'];

export type Recommendation = {
  id: string;
  category: PlanCategoryId;
  // 1 is the first thing to focus on
  rank: number;
  title: string;
  areas: AreaId[];
  // a second link on the card, for example "Meal ideas"
  secondaryAction?: string;
};

export function planCategoryLabel(id: PlanCategoryId): string {
  return planCategories.find((category) => category.id === id)?.label ?? id;
}
