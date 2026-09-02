import { type NavigationProp, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/navigation";
import { tokens } from "../../constants/tokens";
import { useEffect, useState } from "react";

type Line = { id: number; value: string };

const DEFAULT_LINES: Line[] = [
  {
    id: 1,
    value: "",
  },
  {
    id: 2,
    value: "",
  },
  {
    id: 3,
    value: "",
  },
  {
    id: 4,
    value: "",
  },
];

function WritingBookTextArea() {
  const [lines, setLines] = useState<Line[]>(DEFAULT_LINES);

  useEffect(() => {
    if (lines.every((line) => line.value)) {
      setLines((prev) => [...prev, { id: Date.now(), value: "" }]);
    } else {
      const emptyFieldsCount = lines.filter((line) => line.value === "").length;
      if (lines.length > DEFAULT_LINES.length && emptyFieldsCount > 1) {
        setLines((prev) => prev.filter((line) => line.value !== ""));
      }
    }
  }, [lines]);

  return (
    <View
      style={{
        borderColor: tokens.color.ink45,
        borderWidth: 1,
        backgroundColor: tokens.color.paper,
        height: 180,
      }}
    >
      <ScrollView>
        {lines.map((line, index) => (
          <TextInput
            key={line.id}
            value={line.value}
            onChangeText={(text) => {
              setLines((prev) =>
                prev.map((l) => (l.id === line.id ? { ...l, value: text } : l)),
              );
            }}
            style={{
              borderBottomColor: tokens.color.hairline,
              borderBottomWidth: index === lines.length - 1 ? 0 : 1,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function useCreateRecipe() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const handleCreateRecipe = async (values: CreateRecipeDto) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: "",
          prep_time_seconds: values.time,
        }),
      });
      const data = await res.json();
      if (!data) {
        return;
      }
      navigation.navigate("RecipeDetails", { id: data.id });
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

  return {
    createRecipe: handleCreateRecipe,
    isLoading,
    error,
  };
}

type CreateRecipeDto = {
  title: string;
  time: number;
  description: string;
};

export default function CreateRecipeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { createRecipe, isLoading, error } = useCreateRecipe();
  const [formValues, setFormValues] = useState<CreateRecipeDto>({
    title: "",
    time: 0,
    description: "",
  });

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
            <Text style={{ color: tokens.color.ink45 }}>cancel</Text>
          </Pressable>
          <Text style={{ color: tokens.color.ink35 }}>new recipe</Text>
          <Pressable onPress={() => createRecipe(formValues)}>
            <Text style={{ color: tokens.color.redPen }}>save</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View style={{ gap: 16 }}>
            <Text>Name it</Text>
            <TextInput
              value={formValues.title}
              onChangeText={(value) =>
                setFormValues((prev) => ({ ...prev, title: value }))
              }
              placeholder="Sunday Ragu..."
              style={{
                borderBottomColor: tokens.color.hairline,
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 8,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>Time</Text>
                <TextInput
                  value={formValues.time ? String(formValues.time) : ""}
                  onChangeText={(value) =>
                    setFormValues((prev) => ({ ...prev, time: Number(value) }))
                  }
                  placeholder="35 mins"
                  style={{
                    borderBottomColor: tokens.color.ink40,
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text>Serves</Text>
                <TextInput
                  placeholder="serves 2"
                  style={{
                    borderBottomColor: tokens.color.ink40,
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            </View>

            <View>
              <Text>Ingredients</Text>
              <WritingBookTextArea />
            </View>

            <View>
              <Text>Methods</Text>
              <WritingBookTextArea />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
