import {
  type NavigationProp,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import { Recipe } from "@recipes/contracts";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/navigation";
import { tokens } from "../../constants/tokens";
import Checkbox from "expo-checkbox";

const MOCK_INGREDIENTS = [
  "500g ground beef",
  "2 onions",
  "7 carrots",
  "potato",
  "3 tbsp butter",
  "garlic to taste",
];

const MOCK_STEPS = [
  "Brown the beef",
  "Chop the onions",
  "Cook 7 carrots",
  "Peel potato",
  "Add 3 tbsp butter",
  "Add garlic to taste",
];

export default function RecipeDetailsScreen({
  route,
}: StaticScreenProps<{ id: number }>) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/recipes/${route.params.id}`,
        );
        const data = await res.json();
        if (!data) {
          navigation.navigate("RecipeList");
        }
        setRecipe(data);
      } catch (err) {
        navigation.navigate("RecipeList");
        console.error(err);
      }
    };

    fetchRecipeDetails();
  }, [route]);

  if (recipe === null) {
    return null;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: tokens.color.pageWarm,
          height: "100%",
          padding: 16,
        }}
      >
        <View
          style={{
            paddingBottom: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => navigation.navigate("RecipeList")}>
            <Text style={{ color: tokens.color.ink45 }}>back</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("UpdateRecipe", {
                id: recipe.id,
                time: recipe.prep_time_seconds,
                title: recipe.title,
              })
            }
          >
            <Text style={{ color: tokens.color.bluePen }}>edit</Text>
          </Pressable>
        </View>
        <View
          style={{
            borderColor: tokens.color.hairline,
            borderWidth: 1,
            backgroundColor: tokens.color.paper,
            elevation: 4,
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 24 }}>{recipe.title}</Text>
          <Text
            style={{
              color: tokens.color.ink35,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            {recipe.prep_time_seconds / 60} mins
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.hairlineSoft,
            }}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            <Text
              style={{
                color: tokens.color.ink45,
              }}
            >
              Ingredients
            </Text>
            {MOCK_INGREDIENTS.length !== checkedIngredients.length && (
              <Pressable
                onPress={() => setCheckedIngredients(MOCK_INGREDIENTS)}
              >
                <Text style={{ color: tokens.color.bluePen }}>add all</Text>
              </Pressable>
            )}
          </View>

          {MOCK_INGREDIENTS.map((ingredient) => (
            <View
              key={ingredient}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: tokens.color.hairline,
                display: "flex",
                flexDirection: "row",
                gap: 8,
                paddingBottom: 4,
                paddingTop: 4,
              }}
            >
              <Checkbox
                value={checkedIngredients.includes(ingredient)}
                onValueChange={() =>
                  setCheckedIngredients((prev) =>
                    prev.includes(ingredient)
                      ? prev.filter((ing) => ing !== ingredient)
                      : [...prev, ingredient],
                  )
                }
              />
              <Text>{ingredient}</Text>
            </View>
          ))}

          <View
            style={{
              paddingTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: tokens.color.hairlineSoft,
            }}
          />

          <Text style={{ color: tokens.color.ink45, paddingTop: 12 }}>
            Method
          </Text>
          {MOCK_STEPS.map((step, index) => (
            <View
              key={step}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{ padding: 8, color: tokens.color.redPen, fontSize: 20 }}
              >
                {index + 1}
              </Text>
              <Text>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
