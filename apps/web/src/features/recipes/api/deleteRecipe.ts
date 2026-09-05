import type {
  DeleteRecipeParams,
  DeleteRecipeResponse,
} from "@recipes/contracts";
import { api } from "../../../config/axios";

export const deleteRecipe = async (
  input: DeleteRecipeParams,
): Promise<DeleteRecipeResponse> => {
  const response = await api.delete<DeleteRecipeResponse>(
    `/recipes/${input.id}`,
  );
  return response.data;
};
