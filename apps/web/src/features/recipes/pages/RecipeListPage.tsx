import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetRecipesResponse } from "@recipes/contracts";
import { deleteRecipe } from "../api/deleteRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipeList from "../components/RecipeList";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import BookView from "../../../components/BookView";

export default function RecipeListPage() {
  const queryClient = useQueryClient();

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const { mutate } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess(data) {
      const existingRecipes =
        queryClient.getQueryData<GetRecipesResponse>(QUERY_KEYS.recipes) ?? [];

      queryClient.setQueryData<GetRecipesResponse>(
        QUERY_KEYS.recipes,
        existingRecipes.filter((recipe) => recipe.id !== data.id),
      );
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleDelete = (id: number) => {
    if (selectedRecipeId === id) {
      mutate({
        id: selectedRecipeId,
      });

      setSelectedRecipeId(null);
    }
  };

  const handleOpenRecipeDetails = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <main className="recipe-workspace">
      <header className="workspace-header">
        <h1>Recipes</h1>
      </header>
      <div>
        <BookView
          isRightPageActive={selectedRecipeId !== null}
          leftPage={
            <div>
              <RecipeList
                onRecipeSelect={handleOpenRecipeDetails}
                selectedRecipeId={selectedRecipeId}
              />
            </div>
          }
          rightPage={
            <>
              {selectedRecipeId ? (
                <RecipeDetails
                  id={selectedRecipeId}
                  onRemoveRecipe={handleDelete}
                  onBack={() => setSelectedRecipeId(null)}
                />
              ) : (
                <p className="recipe-placeholder">No recipe selected.</p>
              )}
            </>
          }
        />
      </div>
    </main>
  );
}
