import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
////import { StartingStack } from "./startingStack";
import { createStackNavigator } from "@react-navigation/stack";
//import { NavigationContainer } from "@react-navigation/native";
import { DrawerContent } from "../components/DrawerContent";
import { TestScreen } from "../screens/TestScreen";
//import { LoginScreen } from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export const DrawerStack = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="TestScreen" component={TestScreen} />
    </Drawer.Navigator>
  );
};

//<Drawer.Screen name="TestScreen" component={TestScreen} />
