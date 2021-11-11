import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens";
import firebase from "./firebase";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <ToastProvider>
      <View style={styles.container}>
        <MainScreen />
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
