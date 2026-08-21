import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "./screens/recipes-list";
import RecipeDetailsScreen from "./screens/recipe-details";

const RootStack = createNativeStackNavigator({
  initialRouteName: "RecipeList",
  screenOptions: {
    headerShown: false,
  },
  screens: {
    RecipeList: {
      screen: RecipeListScreen,
      headerStyle: {
        height: 0,
        display: "none",
      },
    },
    RecipeDetails: {
      screen: RecipeDetailsScreen,
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
