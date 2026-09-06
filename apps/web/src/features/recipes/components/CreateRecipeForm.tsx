import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/createRecipe";
import {
  createRecipeSchema,
  type CreateRecipeFormInputs,
} from "../schemas/createRecipeSchema";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { GetRecipesResponse } from "@recipes/contracts";

type Props = {
  onCreate: (id: number) => void;
};

export default function CreateRecipeForm({ onCreate }: Props) {
  const queryClient = useQueryClient();

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

      onCreate(data.id);
    },
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<CreateRecipeFormInputs> = (data) => {
    mutate(data);
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

        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
