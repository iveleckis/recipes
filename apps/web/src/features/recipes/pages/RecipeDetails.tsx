import { z } from "zod";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { ROUTES } from "../../../constants/routes";
import { getRecipe } from "../api/getRecipe";

const recipeDetailsParamsSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
});

export default function RecipeDetails() {
  const params = useParams<{ id: string }>();
  const result = recipeDetailsParamsSchema.safeParse(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.recipeDetails(result.data?.id ?? -1),
    queryFn() {
      if (!result.success) {
        throw new Error("Invalid recipe id");
      }

      return getRecipe({ id: result.data.id });
    },
    enabled: result.success,
  });

  if (isError || !result.success) {
    return <Navigate to={ROUTES.recipes} />;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Link to={ROUTES.recipes}>Back</Link>
      {data === undefined ? <>Recipe not found</> : <h3>{data.title}</h3>}
    </>
  );
}
