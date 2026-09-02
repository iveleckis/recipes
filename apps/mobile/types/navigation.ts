export type RootStackParamList = {
  Login: undefined;
  RecipeList: undefined;
  RecipeDetails: {
    id: number;
  };
  CreateRecipe: undefined;
  UpdateRecipe: {
    id: number;
    title: string;
    time: number;
  };
};
