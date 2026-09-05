export const QUERY_KEYS = {
  recipes: ["recipes"],
  recipeDetails: (id: number) => ["recipes", id],
} as const;
