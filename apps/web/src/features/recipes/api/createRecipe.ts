import type {
  CreateRecipeRequest,
  CreateRecipeResponse,
} from "@recipes/contracts";
import { api } from "../../../config/axios";

export const createRecipe = async (
  input: CreateRecipeRequest,
): Promise<CreateRecipeResponse> => {
  const response = await api.post("/recipes", input);
  return response.data;
};
