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
      <div>
        <p>INGREDIENTS</p>
      </div>
      <div>
        <ul>
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
      <div>
        <p>METHOD</p>
      </div>
      <div>
        <ul>
          <li>
            <span>1 </span>
            <span>asdfasf</span>
          </li>
          <li>
            <span>2 </span>
            <span>yrgfbasdfasf</span>
          </li>
          <li>
            <span>3 </span>
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

          <div>
            <div>
              <IngredientsList />
            </div>
            <div>
              <MethodList />
            </div>
          </div>

          <button onClick={() => onRemoveRecipe(data.id)}>Remove recipe</button>
        </>
      )}
    </>
  );
}
