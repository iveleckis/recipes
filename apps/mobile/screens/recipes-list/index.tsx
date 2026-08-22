import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { type Recipe } from "@recipes/contracts";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { tokens } from "../../constants/tokens";

export default function RecipeListScreen() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/recipes`);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

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
