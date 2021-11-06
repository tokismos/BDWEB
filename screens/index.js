import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  CheckBox,
} from "react-native";

import { RadioButton, TextInput } from "react-native-paper";
import IngredientComponent from "../components/IngredientComponent";
import RightSide from "../components/RightSide";
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
const CATEGORIES = ["Viande", "Poisson", "Végétarien", "Vegan", "Sans Gluten"];
// let catArray = [];

const index = () => {
  const [imageURL, setImgURL] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nbrPersonne, setNbrPersonne] = React.useState("");
  const [tempsCuisson, setTempsCuisson] = React.useState("");
  const [tempsPreparation, setTempsPreparation] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [isMeat, setIsMeat] = React.useState(false);
  const [isFish, setIsFish] = React.useState(false);
  const [isVegetarien, setIsVegetarien] = React.useState(false);
  const [isVegan, setIsVegan] = React.useState(false);
  const [isNoGluten, setIsNoGluten] = React.useState(false);
  const [four, setFour] = React.useState(false);
  const [microOnde, setMicroOnde] = React.useState(false);
  const [mixeur, setIsMixeur] = React.useState(false);
  const [robotCuiseur, setIsRobotCuiseur] = React.useState(false);
  const [friteuse, setIsFriteuse] = React.useState(false);
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
  const resetAll = () => {
    setImgURL("");
    setName("");
    setDifficulty("");
    setSteps("");
    arrayIngredients = {
      name: "",
      quantity: "",
    };
  };
  const showRecipe = (imgURL, name, difficulty, steps, ingredients) => {
    setImgURL(imgURL);
    setName(name);
    setDifficulty(difficulty);
    setSteps(steps.toString());
    arrayIngredients = ingredients;
  };
  const CategoryComponent = () => {
    const [isSelected, setSelection] = useState(false);
    const CategoryItem = ({ value, set, name }) => {
      return (
        <View style={{ margin: 4 }}>
          <TouchableOpacity
            style={styles.difficultyItemsTouchable}
            onPress={() => {
              set((prev) => !prev);
            }}
          >
            <Text style={{ marginVertical: 10 }}>{name}</Text>

            <CheckBox value={value} style={styles.checkbox} />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={styles.difficultyContainer}>
        <View style={{ width: "20%" }}>
          <Text style={styles.difficultyText}>Categorie</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CategoryItem value={isMeat} set={setIsMeat} name="Viande" />
          <CategoryItem value={isFish} set={setIsFish} name="Poisson" />
          <CategoryItem
            value={isVegetarien}
            set={setIsVegetarien}
            name="Vegetarien"
          />
          <CategoryItem value={isVegan} set={setIsVegan} name="Vegan" />
          <CategoryItem
            value={isNoGluten}
            set={setIsNoGluten}
            name="Sans Gluten"
          />
        </View>
      </View>
    );
  };
  const MaterielComponent = () => {
    const [isSelected, setSelection] = useState(false);
    const MaterielItem = ({ value, set, name }) => {
      return (
        <View style={{ margin: 4 }}>
          <TouchableOpacity
            style={styles.difficultyItemsTouchable}
            onPress={() => {
              set((prev) => !prev);
            }}
          >
            <Text style={{ marginVertical: 10 }}>{name}</Text>

            <CheckBox value={value} style={styles.checkbox} />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={styles.difficultyContainer}>
        <View style={{ width: "20%" }}>
          <Text style={styles.difficultyText}>Materiel</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterielItem value={four} set={setFour} name="Four" />
          <MaterielItem
            value={microOnde}
            set={setMicroOnde}
            name="Micro-Onde"
          />
          <MaterielItem value={mixeur} set={setIsMixeur} name="Mixeur" />
          <MaterielItem
            value={robotCuiseur}
            set={setIsRobotCuiseur}
            name="Robot Cuiseur"
          />
          <MaterielItem value={friteuse} set={setIsFriteuse} name="Friteuse" />
        </View>
      </View>
    );
  };
  const addRecipe = async (
    imgURL,
    name,
    difficulty,
    steps,
    nbrPersonne,
    tempsCuisson,
    tempsPreparation,
    ingredients,
    four,
    microOnde,
    mixeur,
    robotCuiseur,
    friteuse,
    isMeat,
    isFish,
    isVegetarien,
    isVegan,
    isNoGluten
  ) => {
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
      nbrPersonne: +nbrPersonne,
      tempsCuisson: +tempsCuisson,
      tempsPreparation: +tempsPreparation,
      ingredients,
      four,
      microOnde,
      mixeur,
      robotCuiseur,
      friteuse,
      isMeat,
      isFish,
      isVegetarien,
      isVegan,
      isNoGluten,
    };
    // console.log("steps", steps);
    // console.log("in", ingredients);
    try {
      db.post("/add", res);
      //      resetAll();
      setDisabled(true);
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
        <View
          style={{
            width: "70%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            label="Nb.Personne"
            value={nbrPersonne}
            onChangeText={setNbrPersonne}
            style={([styles.url], { flex: 1 / 4 })}
          />
          <TextInput
            label="T.Cuisson"
            value={tempsCuisson}
            onChangeText={setTempsCuisson}
            style={([styles.url], { flex: 1 / 4 })}
          />
          <TextInput
            label="T.Preparation  "
            value={tempsPreparation}
            onChangeText={setTempsPreparation}
            style={([styles.url], { flex: 1 / 4 })}
          />
        </View>
        {/* INGREDIENT VIEW */}
        <DifficultyComponent
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <CategoryComponent />
        <MaterielComponent />
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
            disabled={disabled}
            style={{
              backgroundColor: disabled ? "#e59400" : "orange",
              height: "90%",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              addRecipe(
                imageURL,
                name,
                difficulty,
                steps,
                nbrPersonne,
                tempsCuisson,
                tempsPreparation,
                arrayIngredients,
                four,
                microOnde,
                mixeur,
                robotCuiseur,
                friteuse,
                isMeat,
                isFish,
                isVegetarien,
                isVegan,
                isNoGluten
              )
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
    height: "90%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

//ingredients.split(/\r?\n/)
