import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetRecipesResponse } from "@recipes/contracts";
import { deleteRecipe } from "../api/deleteRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipeList from "../components/RecipeList";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import CreateRecipeForm from "../components/CreateRecipeForm";

export default function RecipeListPage() {
  const queryClient = useQueryClient();

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [isCreateRecipeFormOpen, setIsCreateRecipeFormOpen] = useState(false);

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
    setIsCreateRecipeFormOpen(false);
    setSelectedRecipeId(recipeId);
  };

  const handleOpenCreateRecipeForm = () => {
    setSelectedRecipeId(null);
    setIsCreateRecipeFormOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 4 }}>
        <div>
          <RecipeList onRecipeSelect={handleOpenRecipeDetails} />
          <button
            style={{
              width: "100%",
              marginTop: "12px",
              textAlign: "center",
              padding: "4px",
            }}
            onClick={handleOpenCreateRecipeForm}
          >
            Add new recipe
          </button>
        </div>
        {selectedRecipeId ? (
          <RecipeDetails id={selectedRecipeId} onRemoveRecipe={handleDelete} />
        ) : isCreateRecipeFormOpen ? (
          <CreateRecipeForm onCreate={handleOpenRecipeDetails} />
        ) : null}
      </div>
    </>
  );
}
