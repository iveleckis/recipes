import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetRecipesResponse } from "@recipes/contracts";
import { deleteRecipe } from "../api/deleteRecipe";
import RecipeDetails from "../components/RecipeDetails";
import RecipeList from "../components/RecipeList";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import CreateRecipeForm from "../components/CreateRecipeForm";
import BookView from "../../../components/BookView";

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
      <div
        style={{
          padding: "24px",
          backgroundColor: "rgb(169, 133, 0)",
        }}
      >
        <BookView
          leftPage={
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <RecipeList onRecipeSelect={handleOpenRecipeDetails} />
              <div
                style={{
                  borderBottom: "1px dotted lightgrey",
                }}
              />
              <span onClick={handleOpenCreateRecipeForm}>
                + Write a new recipe
              </span>
            </div>
          }
          rightPage={
            <>
              {selectedRecipeId ? (
                <RecipeDetails
                  id={selectedRecipeId}
                  onRemoveRecipe={handleDelete}
                />
              ) : isCreateRecipeFormOpen ? (
                <CreateRecipeForm onCreate={handleOpenRecipeDetails} />
              ) : null}
            </>
          }
        />
      </div>
    </>
  );
}
