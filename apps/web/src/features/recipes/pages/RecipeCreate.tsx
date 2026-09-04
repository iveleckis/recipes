import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createRecipe } from "../api/createRecipe";
import { useNavigate } from "react-router-dom";

const createRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Recipe name is required")
    .max(50, "Recipe name must be 50 characters or less"),
});

type CreateRecipeFormInputs = z.infer<typeof createRecipeSchema>;

export default function RecipeCreate() {
  const navigate = useNavigate();

  const form = useForm<CreateRecipeFormInputs>({
    resolver: zodResolver(createRecipeSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRecipe,
    onSuccess() {
      navigate("/recipes");
    },
  });

  const onSubmit: SubmitHandler<CreateRecipeFormInputs> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <input {...form.register("title")} placeholder="Name of the recipe" />
      </div>

      {form.formState.errors.title && (
        <div>{form.formState.errors.title.message}</div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Loading..." : "Create"}
      </button>
    </form>
  );
}
