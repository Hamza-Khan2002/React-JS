// Shared between work.tsx (the Examples tab list) and sections.tsx (the
// Services cards) so the two can talk without importing each other.

/** Dispatched by a Service card to make the Examples tabs jump to a category. */
export const WORK_TAB_EVENT = "foursee:set-work-tab";

/** Must match the keys of CATEGORIES in work.tsx. */
export const WORK_CATEGORY_NAMES = [
  "AI Agents",
  "Web Development",
  "Cloud Architecture",
  "UI/UX Design",
] as const;

export type WorkCategoryName = (typeof WORK_CATEGORY_NAMES)[number];
