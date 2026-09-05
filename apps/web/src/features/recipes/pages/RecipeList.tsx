import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "../api/getRecipes";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { deleteRecipe } from "../api/deleteRecipe";
import type { GetRecipesResponse } from "@recipes/contracts";

export default function RecipeList() {
  const queryClient = useQueryClient();

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.recipes,
    queryFn: getRecipes,
    staleTime: 60_000 * 10, // 10mins
  });

  const { mutate } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess(data) {
      const existingRecipes =
        queryClient.getQueryData<GetRecipesResponse>(QUERY_KEYS.recipes) ?? [];

      queryClient.setQueryData<GetRecipesResponse>(
        QUERY_KEYS.recipes,
        existingRecipes.filter((recipe) => recipe.id !== data.id),
      );
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleDelete = (id: number) => {
    mutate({
      id,
    });
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError || !recipes) {
    return <>Something went wrong...</>;
  }

  return (
    <div
      style={{
        width: "fit-content",
      }}
    >
      {recipes.length === 0 ? (
        <>No recipes found...</>
      ) : (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {recipes.map((recipe) => (
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300px",
                borderBottom: "1px solid lightgrey",
                padding: "4px",
              }}
              key={recipe.id}
            >
              <span>{recipe.title}</span>
              <button onClick={() => handleDelete(recipe.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
      <Link
        style={{
          border: "1px solid black",
          backgroundColor: "lightgrey",
          textDecoration: "none",
          color: "black",
          display: "inline-block",
          width: "100%",
          marginTop: "12px",
          textAlign: "center",
          padding: "4px",
        }}
        to={ROUTES.createRecipe}
      >
        Add new recipe
      </Link>
    </div>
  );
}
