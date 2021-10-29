import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

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
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Facile</Text>

          <RadioButton
            value="facile"
            status={difficulte === "Facile" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Facile")}
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Moyenne</Text>

          <RadioButton
            value="moyenne"
            status={difficulte === "Moyenne" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Moyenne")}
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Difficile</Text>

          <RadioButton
            value="first"
            status={difficulte === "Difficile" ? "checked" : "unchecked"}
            onPress={() => setDifficulte("Difficile")}
          />
        </View>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const index = () => {
  let arrayIngredients = [{ name: "s", quantity: "qqqqq" }];
  const [nbrArray, setNbrArray] = useState([""]);
  const [imageURL, setImageURL] = React.useState("");
  const [name, setName] = React.useState("");
  //const [ingredients, setIngredients] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [etapes, setEtapes] = React.useState("");
  const [checked, setChecked] = React.useState("first");

  const IngredientsComponents = ({ index }) => {
    const [ingredientValue, setIngredientValue] = useState([""]);
    const [teext, setText] = useState("");
    //   const [ingredients, setIngredients] = useState([""]);
    const [quantityValue, setQuantityValue] = useState("");

    return (
      <View style={{ backgroundColor: "gray", flexDirection: "row" }}>
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <TextInput
              label="Ingredient"
              value={arrayIngredients[index].name}
              onChangeText={(text) => {
                console.log("text", text);
                arrayIngredients[index].name = [
                  ...arrayIngredients[index].name,
                  text,
                ];
              }}
              style={([styles.url], { width: "80%", marginHorizontal: 5 })}
            />
            <TextInput
              label="Qt."
              value={arrayIngredients[index].quantity}
              onChangeText={(text) => {
                console.log("text", text);
                arrayIngredients[index].quantity = text;
              }}
              style={([styles.url], { width: "20%" })}
            />
          </View>
        </View>
      </View>
    );
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "85%" }}>
            {nbrArray.map((item, index) => (
              <IngredientsComponents key={index} index={index} />
            ))}
          </View>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                // setNbrArray([...nbrArray, ""])
              }}
              style={styles.addButton}
            >
              <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="test"
          onPress={() => {
            arrayIngredients[0].name = "hiii";
            console.log("tjos s", arrayIngredients[0].name);
          }}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addButton: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonContainer: {
    width: "15%",
    padding: 10,
    marginLeft: 5,
    alignSelf: "flex-end",
    height: 70,
  },
  rightContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "yellow",
    justifyContent: "center",
  },
});

//ingredients.split(/\r?\n/)
