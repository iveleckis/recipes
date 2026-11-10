import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { getRecipes } from "../api/getRecipes";

type Props = {
  onRecipeSelect: (id: number) => void;
  selectedRecipeId: number | null;
};

export default function RecipeList({ onRecipeSelect, selectedRecipeId }: Props) {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.recipes,
    queryFn: getRecipes,
    staleTime: 60_000 * 10, // 10mins
  });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : isError || recipes === undefined ? (
        <>Something went wrong...</>
      ) : recipes.length === 0 ? (
        <>No recipes found...</>
      ) : (
        <>
            <p className="recipe-count">Your recipes / {recipes.length} entries</p>
            <ul className="recipe-list">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <button
                  className="recipe-list-item"
                  aria-pressed={selectedRecipeId === recipe.id}
                  onClick={() => onRecipeSelect(recipe.id)}
                >
                  <span>{recipe.title}</span>
                </button>
              </li>
            ))}
            </ul>
        </>
      )}
    </>
  );
}
