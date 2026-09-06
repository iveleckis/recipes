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
      ) : isError ? (
        <>Something went wrong...</>
      ) : recipes === undefined || recipes.length === 0 ? (
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
              <div onClick={() => onRecipeSelect(recipe.id)}>
                {recipe.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
