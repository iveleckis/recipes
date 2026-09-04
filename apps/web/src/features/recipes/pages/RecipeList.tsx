import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/getRecipes";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
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
      <Link to="/recipes/create">
        <button>Add new recipe</button>
      </Link>
    </>
  );
}
