import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/createRecipe";
import {
  createRecipeSchema,
  type CreateRecipeFormInputs,
} from "../schemas/createRecipeSchema";
import { ROUTES } from "../../../constants/routes";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { GetRecipesResponse } from "@recipes/contracts";

export default function RecipeCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<CreateRecipeFormInputs>({
    resolver: zodResolver(createRecipeSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createRecipe,
    onSuccess(data) {
      const existingRecipes = queryClient.getQueryData<GetRecipesResponse>(
        QUERY_KEYS.recipes,
      );

      if (existingRecipes) {
        queryClient.setQueryData<GetRecipesResponse>(QUERY_KEYS.recipes, [
          ...existingRecipes,
          data,
        ]);
      }

      navigate(ROUTES.recipes);
    },
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<CreateRecipeFormInputs> = (data) => {
    mutate(data);
  };

  const onCancel = () => {
    navigate(ROUTES.recipes);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div style={{ paddingBottom: "4px" }}>
          <input {...form.register("title")} placeholder="Name of the recipe" />
        </div>

        {form.formState.errors.title && (
          <div>{form.formState.errors.title.message}</div>
        )}

        <button type="button" onClick={onCancel} disabled={isPending}>
          Cancel
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
