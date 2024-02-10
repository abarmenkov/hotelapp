//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import { StartingScreen } from "./src/screens/StartingScreen";
import { StartingStack } from "./src/navigation/startingStack";

export default function App() {
  return <StartingStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
