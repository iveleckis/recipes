import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { getRecipe } from "../api/getRecipe";

type Props = {
  id: number;
  onRemoveRecipe: (id: number) => void;
};

function IngredientsList() {
  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid lightgrey",
          display: "flex",
        }}
      >
        <p>INGREDIENTS</p>
      </div>
      <div
        style={{
          padding: "16px",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <li>asdf</li>
          <li>dff</li>
          <li>sdafsdafas</li>
        </ul>
      </div>
    </>
  );
}

function MethodList() {
  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid lightgrey",
          display: "flex",
        }}
      >
        <p>METHOD</p>
      </div>
      <div
        style={{
          padding: "16px",
          paddingLeft: 0,
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <li>
            <span style={{ paddingRight: "8px" }}>1</span>
            <span>asdfasf</span>
          </li>
          <li>
            <span style={{ paddingRight: "8px" }}>2</span>
            <span>yrgfbasdfasf</span>
          </li>
          <li>
            <span style={{ paddingRight: "8px" }}>3</span>
            <span>asdfgasdfasf</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default function RecipeDetails({ id, onRemoveRecipe }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.recipeDetails(id),
    queryFn() {
      return getRecipe({ id });
    },
  });

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError || data === undefined ? (
        <>Error fetching </>
      ) : (
        <>
          <h3>{data.title}</h3>

          <p>35 mins</p>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <IngredientsList />
            </div>
            <div style={{ flex: 1 }}>
              <MethodList />
            </div>
          </div>

          <button onClick={() => onRemoveRecipe(data.id)}>Remove recipe</button>
        </>
      )}
    </>
  );
}
