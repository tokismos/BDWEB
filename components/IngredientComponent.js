import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const IngredientComponent = ({ index, arrayIngredients, item }) => {
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState("");
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ width: "100%" }}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <TextInput
            label={`Ingredient N:${index + 1}`}
            value={text}
            onBlur={() => {
              console.log("blured");
              arrayIngredients[index]["name"] = text;
              console.log(arrayIngredients[index]["name"]);
            }}
            onChangeText={(text) => {
              setText(text);
            }}
            style={styles.form}
          />

          <TextInput
            label="Qt."
            value={quantity}
            onBlur={() => {
              arrayIngredients[index]["quantity"] = quantity;
            }}
            onChangeText={setQuantity}
            style={([styles.form], { width: "20%" })}
          />
        </View>
      </View>
    </View>
  );
};

export default IngredientComponent;

const styles = StyleSheet.create({
  form: { width: "80%", marginHorizontal: 5, alignSelf: "center" },
});
