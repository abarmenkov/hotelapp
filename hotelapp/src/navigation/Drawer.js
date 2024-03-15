import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
////import { StartingStack } from "./startingStack";
import { createStackNavigator } from "@react-navigation/stack";
//import { NavigationContainer } from "@react-navigation/native";
import { DrawerContent } from "../components/DrawerContent";
import { TestScreen } from "../screens/TestScreen";
//import { LoginScreen } from "../screens/LoginScreen";
import { WIDTH } from "../utils/constants";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();

export const DrawerStack = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get("window").width * 0.2,
          backgroundColor: "green",
        },
      }}
    >
      <Drawer.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          drawerLabel: "Settings",
          drawerStyle: {
            backgroundColor: "orange",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

//<Drawer.Screen name="TestScreen" component={TestScreen} />
