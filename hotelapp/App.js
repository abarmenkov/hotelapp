//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import { StartingScreen } from "./src/screens/StartingScreen";
import { StartingStack } from "./src/navigation/startingStack";
import { DrawerStack } from "./src/navigation/Drawer";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n";


/*export default function App() {
  return (
    <SafeAreaProvider>
      <StartingStack />
    </SafeAreaProvider>
  );
}*/
export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaProvider>
        <StartingStack />
      </SafeAreaProvider>
    </I18nextProvider>
  );
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
