import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: string;
  prep_time_seconds: number;
};

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  return (
    <View style={styles.container}>
      <Text>wow</Text>
      <View>
        {recipes.map((recipe) => (
          <Text key={recipe.id}>{recipe.title}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
