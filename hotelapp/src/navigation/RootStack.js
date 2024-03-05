import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { TestScreen } from "../screens/TestScreen";
//import { DrawerStack } from "./Drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const RootStack = () => {
  const [token, setToken] = useState(false);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Home" component={TestScreen} />
    </Drawer.Navigator>
  );
};
/*export const RootStack = () => {
  const [token, setToken] = useState(false);
  return token ? (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={TestScreen} />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};*/
