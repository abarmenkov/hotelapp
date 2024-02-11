//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import { StartingScreen } from "./src/screens/StartingScreen";
import { StartingStack } from "./src/navigation/startingStack";
import { DrawerStack } from "./src/navigation/Drawer";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
//import "react-native-gesture-handler";

export default function App() {
  return <DrawerStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent(appName, () => App);
