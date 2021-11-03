import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";

import { RadioButton, TextInput } from "react-native-paper";
import IngredientComponent from "../components/IngredientComponent";
import RightSide from "../components/rightSide";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import { db } from "../axios";
import LeftSide from "../components/LeftSide";
import { useToast } from "react-native-toast-notifications";
const DifficultyComponent = ({ difficulty, setDifficulty }) => {
  return (
    <View style={styles.difficultyContainer}>
      <View style={{ width: "20%" }}>
        <Text style={styles.difficultyText}>Difficulté</Text>
      </View>
      <View style={styles.difficultyItemsView}>
        <TouchableOpacity
          style={styles.difficultyItemsTouchable}
          onPress={() => setDifficulty("Facile")}
        >
          <Text>Facile</Text>

          <RadioButton
            value="facile"
            status={difficulty === "Facile" ? "checked" : "unchecked"}
            onPress={() => setDifficulty("Facile")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.difficultyItemsTouchable}
          onPress={() => setDifficulty("Moyenne")}
        >
          <Text>Moyenne</Text>

          <RadioButton
            value="moyenne"
            status={difficulty === "Moyenne" ? "checked" : "unchecked"}
            onPress={() => setDifficulty("Moyenne")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.difficultyItemsTouchable}
          onPress={() => setDifficulty("Difficile")}
        >
          <Text>Difficile</Text>

          <RadioButton
            value="first"
            status={difficulty === "Difficile" ? "checked" : "unchecked"}
            onPress={() => setDifficulty("Difficile")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

let arrayIngredients = [
  {
    name: "",
    quantity: "",
  },
];
const index = () => {
  const toast = useToast();

  const [imageURL, setImgURL] = React.useState("");
  const [name, setName] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [ingredients, setIngredients] = React.useState([
    {
      name: "",
      quantity: "",
    },
  ]);

  const [steps, setSteps] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [nbrArray, setNbrArray] = useState([""]);
  const scrollViewRef = useRef();
  const showRecipe = (imgURL, name, difficulty, steps, ingredients) => {
    setImgURL(imgURL);
    setName(name);
    setDifficulty(difficulty);
    setSteps(steps.toString());
    arrayIngredients = ingredients;
  };
  const addRecipe = async (imgURL, name, difficulty, steps, ingredients) => {
    const stepsToArray = steps.split(/\r?\n/);
    const stepsWithoutSpace = stepsToArray.filter(
      //detect the white spaces in a line
      (item) => item.trim().length != 0
    );

    const res = {
      imgURL,
      name,
      difficulty,
      steps: stepsWithoutSpace,
      ingredients,
    };
    // console.log("steps", steps);
    // console.log("in", ingredients);
    try {
      db.post("/add", res).then((resp) => {
        console.log("resp", resp.status);
      });
    } catch (e) {
      console.log("Message", e);
    }
  };

  const addInput = () => {
    setNbrArray([...nbrArray, ""]);
    arrayIngredients.push({ name: "", quantity: "" });
  };
  return (
    <View style={styles.container}>
      {/* LEFT SIDE */}
      <View
        style={{ backgroundColor: "#D3D3D3", width: "25%", height: "100%" }}
      >
        <LeftSide showRecipe={showRecipe} />
      </View>
      <View style={{ width: "45%", alignItems: "center" }}>
        {msg && <Text style={{ fontSize: 20 }}>{msg}</Text>}
        <View style={styles.imgContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: imageURL,
            }}
            resizeMode="cover"
          />
        </View>
        <TextInput
          label="Image URL"
          value={imageURL}
          onChangeText={setImgURL}
          style={styles.url}
        />
        <TextInput
          label="Nom de la recette"
          value={name}
          onChangeText={setName}
          style={styles.url}
        />
        {/* INGREDIENT VIEW */}
        <DifficultyComponent
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        {/* ETAPES VIEW */}
        <View style={styles.multiLine}>
          <TextInput
            multiline
            label="ETAPES DE PREPARATION"
            value={steps}
            onChangeText={setSteps}
            style={([styles.url], { height: 200, width: "100%" })}
          />
        </View>
      </View>
      {/* Right Side View */}
      <View style={styles.rightContainer}>
        <ScrollView
          style={{ height: height * 0.9, padding: 5 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <RightSide
            ingredients={ingredients}
            nbrArray={nbrArray}
            arrayIngredients={arrayIngredients}
            addInput={addInput}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              addRecipe(imageURL, name, difficulty, steps, arrayIngredients)
            }
          >
            <Text style={{}}>Add To DataBase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    height: height - 7,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  imgContainer: {
    borderWidth: 1,
    height: "200px",
    width: "200px",
    alignSelf: "center",
  },
  url: { alignSelf: "center", width: "70%", margin: 5 },
  multiLine: {
    height: height * 0.3,
    width: "90%",
  },

  rightContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "#d3d3d3",
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignItems: "center",
  },
  difficultyText: {
    fontWeight: "bold",
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
  },
  difficultyItemsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  difficultyItemsTouchable: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonContainer: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "orange",
    height: "90%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

//ingredients.split(/\r?\n/)
