import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../api/createRecipe";
import {
  createRecipeSchema,
  type CreateRecipeFormInput,
  type CreateRecipeFormOutput,
} from "../schemas/createRecipeSchema";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { GetRecipesResponse } from "@recipes/contracts";

type Props = {
  onCreate: (id: number) => void;
};

export default function CreateRecipeForm({ onCreate }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<CreateRecipeFormInput, unknown, CreateRecipeFormOutput>({
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

  const onSubmit: SubmitHandler<CreateRecipeFormOutput> = (data) => {
    const ingredients = data.ingredients.split("\\n");
    const method = data.method.split("\\n");

    mutate({
      ...data,
      ingredients,
      method,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" disabled={isPending}>
            CANCEL
          </button>
          <button className="primary" type="submit" disabled={isPending}>
            SAVE
          </button>
        </div>
        <div>
          <input
            {...form.register("title")}
            style={{
              fontSize: "32px",
            }}
            placeholder="Name of the recipe"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <label>
              TIME (minutes)
              <input
                {...form.register("prepTimeMinutes")}
                placeholder="35"
                type="number"
              />
            </label>

            <label>
              INGREDIENTS
              <textarea
                style={{ height: "120px" }}
                {...form.register("ingredients")}
                placeholder="One per line"
              />
            </label>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <label>
              SERVES
              <input
                {...form.register("serves")}
                type="number"
                placeholder="2"
              />
            </label>
            <label>
              METHOD
              <textarea
                style={{ height: "120px" }}
                {...form.register("method")}
                placeholder="One per line"
              />
            </label>
          </div>
        </div>

        <label>
          NOTE
          <input
            placeholder="best thing we cooked this spring"
            style={{ display: "block" }}
            {...form.register("note")}
          />
        </label>
      </form>
    </div>
  );
}
