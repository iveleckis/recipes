import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { getRecipes } from "../api/getRecipes";

type Props = {
  onRecipeSelect: (id: number) => void;
};

export default function RecipeList({ onRecipeSelect }: Props) {
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
        <ul>
          <>
            <p>
              By time since last made - {recipes.length} entries
            </p>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <div onClick={() => onRecipeSelect(recipe.id)}>
                  {recipe.title}
                </div>
                <div>7 months</div>
              </li>
            ))}
          </>
        </ul>
      )}
    </>
  );
}
