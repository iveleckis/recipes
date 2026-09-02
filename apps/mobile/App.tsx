import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import RecipeListScreen from "./screens/recipes-list";
import RecipeDetailsScreen from "./screens/recipe-details";
import CreateRecipeScreen from "./screens/create-recipe";
import UpdateRecipeScreen from "./screens/update-recipe";
import LoginScreen from "./screens/login";

function useIsSignedIn() {
  const { token } = useAuth();

  return token !== null;
}

function useIsSignedOut() {
  const { token } = useAuth();

  return token === null;
}

const RootStack = createNativeStackNavigator({
  // initialRouteName: "RecipeList",
  screenOptions: {
    headerShown: false,
  },
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        Login: {
          screen: LoginScreen,
        },
      },
    },

    SignedIn: {
      if: useIsSignedIn,
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
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
