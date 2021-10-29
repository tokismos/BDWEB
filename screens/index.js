import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import IngredientComponent from "../components/IngredientComponent";
import RightSide from "../components/rightSide";

const DifficultyComponent = () => {
  const [difficulte, setDifficulte] = React.useState("");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <View style={{ width: "20%" }}>
        <Text
          style={{
            fontWeight: "bold",
            backgroundColor: "white",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Difficulté
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
            padding: 10,
          }}
          onPress={() => setDifficulte("Facile")}
        >
          <Text>Facile</Text>

          <RadioButton
            value="facile"
            status={difficulte === "Facile" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Facile")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
            padding: 10,
          }}
          onPress={() => setDifficulte("Moyenne")}
        >
          <Text>Moyenne</Text>

          <RadioButton
            value="moyenne"
            status={difficulte === "Moyenne" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Moyenne")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
            padding: 10,
          }}
          onPress={() => setDifficulte("Difficile")}
        >
          <Text>Difficile</Text>

          <RadioButton
            value="first"
            status={difficulte === "Difficile" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Difficile")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");

let arrayIngredients = [
  {
    name: "",
    quantity: "",
  },
];
const index = () => {
  const [imageURL, setImageURL] = React.useState("");
  const [name, setName] = React.useState("");

  const [etapes, setEtapes] = React.useState("");
  const [nbrArray, setNbrArray] = useState([""]);
  const addInput = () => {
    setNbrArray([...nbrArray, ""]);
    arrayIngredients.push({ name: "", quantity: "" });
  };
  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: "blue", width: "25%", height: "100%" }}
      ></View>
      <View style={{ width: "45%", alignItems: "center", borderWidth: 1 }}>
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
          onChangeText={setImageURL}
          style={styles.url}
        />
        <TextInput
          label="Nom de la recette"
          value={name}
          onChangeText={setName}
          style={styles.url}
        />
        {/* INGREDIENT VIEW */}
        <DifficultyComponent />
        {/* ETAPES VIEW */}
        <View style={styles.multiLine}>
          <TextInput
            multiline
            label="ETAPES DE PREPARATION"
            value={etapes}
            onChangeText={setEtapes}
            style={([styles.url], { height: 200, width: "100%" })}
          />
        </View>
      </View>
      {/* Right Side View */}
      <View style={styles.rightContainer}>
        <ScrollView style={{ height: "70%" }}>
          <RightSide
            nbrArray={nbrArray}
            arrayIngredients={arrayIngredients}
            addInput={addInput}
          />
        </ScrollView>
        <View
          style={{
            height: "10%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              height: "90%",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  imgContainer: {
    backgroundColor: "yellow",
    height: "200px",
    width: "200px",
    alignSelf: "center",
  },
  url: { alignSelf: "center", margin: 5 },
  multiLine: {
    height: height * 0.3,
    width: "90%",
  },

  rightContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "yellow",
  },
});

//ingredients.split(/\r?\n/)
