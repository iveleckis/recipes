import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { getRecipe } from "../api/getRecipe";

type Props = {
  id: number;
  onRemoveRecipe: (id: number) => void;
};

export default function RecipeDetails({ id, onRemoveRecipe }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.recipeDetails(id),
    queryFn() {
      return getRecipe({ id });
    },
  });

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid light grey",
        boxShadow: "0 0 10px 10px black",
      }}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : isError || data === undefined ? (
        <>Error fetching </>
      ) : (
        <>
          <h3>{data.title}</h3>

          <button onClick={() => onRemoveRecipe(data.id)}>Remove recipe</button>
        </>
      )}
    </div>
  );
}
