import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/getRecipes";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { QUERY_KEYS } from "../../../constants/queryKeys";

export default function RecipeList() {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.recipes,
    queryFn: getRecipes,
    staleTime: 60_000 * 10, // 10mins
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError || !recipes) {
    return <>Something went wrong...</>;
  }

  return (
    <>
      {recipes.length === 0 ? (
        <>No recipes found...</>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      )}
      <Link
        style={{
          border: "1px solid black",
          backgroundColor: "lightgrey",
          textDecoration: "none",
          color: "black",
          padding: "4px",
        }}
        to={ROUTES.createRecipe}
      >
        Add new recipe
      </Link>
    </>
  );
}
