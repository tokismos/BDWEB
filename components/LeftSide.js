import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { db } from "../axios";

const RecipeItem = ({ title, imgURL }) => {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 5,
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View style={{ width: "30%" }}>
        <Image
          resizeMode="cover"
          style={{ height: "100%", width: "100%" }}
          source={{ uri: imgURL }}
        />
      </View>
      <View style={{ width: "70%" }}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const LeftSide = ({ showRecipe }) => {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getRecipes = async () => {
    const res = await db.get("/");
    setRecipes(res.data.reverse());
    setisLoading(false);
    console.log("tjhis is res,", res.data);
  };
  useEffect(() => {
    console.log("recip", recipes);
  }, [recipes]);
  return (
    <View style={{ height: "100%" }}>
      {recipes.length != 0 && (
        <View
          style={{
            position: "absolute",
            right: -50,
            top: 0,
            width: 50,
            backgroundColor: "#d3d3d3",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {recipes.length} recipes
          </Text>
        </View>
      )}
      <View style={{ height: "10%", padding: 5 }}>
        <TextInput
          label="Chercher une recette"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={{ height: "90%", flex: 1 }}>
        {recipes && (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  showRecipe(
                    item.imgURL,
                    item.name,
                    item.difficulty,
                    item.steps,
                    item.ingredients
                  )
                }
              >
                <RecipeItem title={item.name} imgURL={item.imgURL} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
          />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "pink",
            height: 70,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setisLoading(true);
            getRecipes();
          }}
        >
          {isLoading && <ActivityIndicator size="large" color="#00ff00" />}

          <Text>GET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LeftSide;

const styles = StyleSheet.create({
  addButtonContainer: {
    width: "15%",
    padding: 10,
    marginLeft: 5,
    alignSelf: "flex-end",
    height: 70,
  },
  addButton: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
