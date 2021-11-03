import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IngredientComponent from "./IngredientComponent";
import { AntDesign } from "@expo/vector-icons";

const RightSide = ({ nbrArray, arrayIngredients, addInput, ingredients }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "85%" }}>
        {nbrArray.map((item, index) => (
          <IngredientComponent
            key={index} // I added index props because key dont pass to children
            index={index}
            item={item}
            arrayIngredients={arrayIngredients}
          />
        ))}
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            addInput();
          }}
          style={styles.addButton}
        >
          <AntDesign name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RightSide;

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
