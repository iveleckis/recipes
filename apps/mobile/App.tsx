import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { type Recipe } from "@recipes/contracts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const tokens = {
  color: {
    ink: "#23201C",
    ink85: "rgba(35,32,28,.85)",
    ink72: "rgba(35,32,28,.72)",
    ink55: "rgba(35,32,28,.55)",
    ink45: "rgba(35,32,28,.45)",
    ink40: "rgba(35,32,28,.40)",
    ink35: "rgba(35,32,28,.35)",

    paper: "#FFFCF4",
    pageWarm: "#FBF7EC",
    pageTan: "#EDE6D6",

    redPen: "#C2503F",
    bluePen: "#33587F",

    rule: "rgba(120,150,180,.26)",
    hairline: "rgba(35,32,28,.14)",
    hairlineSoft: "rgba(35,32,28,.08)",
  },

  font: {
    hand: "Caveat, cursive",
    text: "Karla, system-ui, sans-serif",
  },

  type: {
    handXL: "700 40px/1.05 Caveat",
    handLg: "700 34px/1 Caveat",
    handMd: "600 26px/1 Caveat",
    handBtn: "400 24px/1 Caveat",
    handSm: "400 19px/1 Caveat",
    body: "400 15px/1.5 Karla",
    bodyStrong: "500 17px/1.25 Karla",
    meta: "400 12.5px Karla",
  },

  tracking: { wide: ".16em", wider: ".2em" },

  radius: { paper: "2px", pill: "12px", sheet: "18px", round: "50%" },

  space: { gutter: 22, gutterWide: 24, row: 11, rowShopping: 15 },

  shadow: {
    card: "0 6px 16px rgba(35,32,28,.1)",
    cardLift: "2px 3px 0 rgba(35,32,28,.07)",
    float: "0 8px 20px rgba(35,32,28,.13)",
    notif: "0 10px 30px rgba(0,0,0,.4)",
  },

  device: { width: 402, height: 874, tabBar: 78 },
};

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

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
    PlaywriteIN: require("./assets/fonts/PlaywriteIN-VariableFont_wght.ttf"),
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
    <SafeAreaProvider>
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
                <View style={styles.recipeItem} key={recipe.id}>
                  <Text style={styles.recipeItemTitle} key={recipe.id}>
                    {recipe.title}
                  </Text>
                  <Text>{recipe.prep_time_seconds / 60} mins</Text>
                </View>
              ))
            ) : (
              <Text>No recipes found...</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    borderBottomColor: tokens.color.ink,
    borderBottomWidth: 1,
    color: tokens.color.ink72,
    marginBottom: 24,
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
