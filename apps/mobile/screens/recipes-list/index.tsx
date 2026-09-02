import { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type Recipe } from "@recipes/contracts";
import { RootStackParamList } from "../../types/navigation";
import { tokens } from "../../constants/tokens";
import { AuthContext } from "../../providers/AuthProvider";

function useFetchRecipes() {
  const authContext = useContext(AuthContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const navitaion = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (authContext === null || authContext.token === null) {
        navitaion.navigate("Login");
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/recipes`, {
          headers: {
            Authorization: authContext.token,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        setRecipes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return {
    recipes,
    isLoading,
    error,
  };
}

type RecipesListErrorProps = {
  onRetry: () => void;
};

function RecipesListError({ onRetry }: RecipesListErrorProps) {
  return (
    <View style={{ paddingHorizontal: 24, gap: 16, paddingVertical: 40 }}>
      <Text
        style={{
          fontFamily: "PlaywriteIN",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        The box didn’t open
      </Text>
      <Text
        style={{
          fontFamily: "PlaywriteIN",
          textAlign: "center",
          color: tokens.color.ink55,
        }}
      >
        Nothing’s lost — we just couldn’t fetch the list right now.
      </Text>
      <Pressable
        onPress={onRetry}
        style={{
          backgroundColor: tokens.color.ink,
          padding: 8,
          marginHorizontal: 36,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "PlaywriteIN",
            fontSize: 18,
            color: tokens.color.paper,
          }}
        >
          Try again
        </Text>
      </Pressable>
    </View>
  );
}

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { recipes, isLoading, error: recipeError } = useFetchRecipes();

  console.log(recipeError, recipes);

  const [query, setQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  const handleNavigate = (id: number) => {
    navigation.navigate("RecipeDetails", {
      id,
    });
  };

  const handleCreateRecipe = () => {
    navigation.navigate("CreateRecipe");
  };

  const [loaded, error] = useFonts({
    PlaywriteIN: require("../../assets/fonts/PlaywriteIN-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.paddingX}>
          <Text style={styles.pageTitle}>Our recipes</Text>
          <TextInput
            style={styles.searchBar}
            value={query}
            onChangeText={setQuery}
            placeholder="search..."
          />
        </View>
        <View>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : recipeError ? (
            <RecipesListError onRetry={console.log} />
          ) : (
            <View>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <Pressable
                    key={recipe.id}
                    onPress={() => handleNavigate(recipe.id)}
                  >
                    <View style={styles.recipeItem}>
                      <Text style={styles.recipeItemTitle} key={recipe.id}>
                        {recipe.title}
                      </Text>
                      <Text>{recipe.prep_time_seconds / 60} mins</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <Text>No recipes found...</Text>
              )}
            </View>
          )}
          <View style={[styles.paddingX, { paddingTop: 24 }]}>
            <Pressable onPress={handleCreateRecipe}>
              <View
                style={{
                  borderStyle: "dashed",
                  borderWidth: 1,
                  paddingVertical: 20,
                  width: "100%",
                  borderColor: tokens.color.ink55,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlaywriteIN",
                    fontSize: 18,
                    color: tokens.color.ink55,
                    textAlign: "center",
                  }}
                >
                  + Write a recipe
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.pageWarm,
    height: "100%",
    paddingTop: 16,
    paddingBottom: 16,
  },
  paddingX: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  pageTitle: {
    fontFamily: "PlaywriteIN",
    fontSize: 24,
  },
  searchBar: {
    padding: 0,
    borderBottomColor: tokens.color.ink,
    borderBottomWidth: 1,
    color: tokens.color.ink72,
    marginBottom: 24,
    paddingVertical: 10,
    includeFontPadding: false, // Android font metric space above/below glyphs
    textAlignVertical: "center", // Android only, no-op on iOS
  },
  recipeItem: {
    borderBottomColor: tokens.color.hairline,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  recipeItemTitle: {
    fontSize: 16,
  },
});
