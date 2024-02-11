import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StartingStack } from "./startingStack";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerContent } from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export const DrawerStack = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="HOME" component={StartingStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
