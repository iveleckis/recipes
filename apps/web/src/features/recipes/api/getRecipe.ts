import type { GetRecipeParams, GetRecipeResponse } from "@recipes/contracts";
import { api } from "../../../config/axios";

export const getRecipe = async (
  input: GetRecipeParams,
): Promise<GetRecipeResponse> => {
  const { data } = await api.get<GetRecipeResponse>(`/recipes/${input.id}`);
  return data;
};
