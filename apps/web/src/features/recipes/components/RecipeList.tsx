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
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <>
            <p>By time since last made - {recipes.length} entries</p>
            {recipes.map((recipe) => (
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "4px 0",
                  gap: "8px",
                }}
                key={recipe.id}
              >
                <div
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => onRecipeSelect(recipe.id)}
                >
                  {recipe.title}
                </div>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px dotted lightgrey",
                  }}
                />
                <div style={{ whiteSpace: "nowrap" }}>7 months</div>
              </li>
            ))}
          </>
        </ul>
      )}
    </>
  );
}
