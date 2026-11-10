import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { getRecipe } from "../api/getRecipe";

type Props = {
  id: number;
  onRemoveRecipe: (id: number) => void;
  onBack: () => void;
};

function IngredientsList({ ingredients }: { ingredients: string[] }) {
  return (
    <>
      <div>
        <p>INGREDIENTS</p>
      </div>
      <div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function MethodList({ method }: { method: string[] }) {
  return (
    <>
      <div>
        <p>METHOD</p>
      </div>
      <div>
        <ol>
          {method.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default function RecipeDetails({ id, onBack }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.recipeDetails(id),
    queryFn() {
      return getRecipe({ id });
    },
  });

  return (
    <>
      <header className="recipe-title-row">
        <button
          className="recipe-back-button"
          type="button"
          onClick={onBack}
          aria-label="Back to recipes"
          title="Back to recipes"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h3>{data?.title ?? "Recipe"}</h3>
      </header>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError || data === undefined ? (
        <>Error fetching </>
      ) : (
        <>
          <p>{data.prepTimeMinutes} mins</p>

          <div>
            <div>
              <IngredientsList ingredients={data.ingredients} />
            </div>
            <div>
              <MethodList method={data.method} />
            </div>
          </div>

        </>
      )}
    </>
  );
}
