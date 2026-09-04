import type { GetRecipesResponse } from "@recipes/contracts";
import { api } from "../../../config/axios";

export const getRecipes = async (): Promise<GetRecipesResponse> => {
  const { data } = await api.get<GetRecipesResponse>("/recipes");
  return data;
};
