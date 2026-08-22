import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "./screens/recipes-list";
import RecipeDetailsScreen from "./screens/recipe-details";
import CreateRecipeScreen from "./screens/create-recipe";
import UpdateRecipeScreen from "./screens/update-recipe";

const RootStack = createNativeStackNavigator({
  initialRouteName: "RecipeList",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    RecipeList: {
      screen: RecipeListScreen,
    },
    RecipeDetails: {
      screen: RecipeDetailsScreen,
    },
    CreateRecipe: {
      screen: CreateRecipeScreen,
    },
    UpdateRecipe: {
      screen: UpdateRecipeScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
