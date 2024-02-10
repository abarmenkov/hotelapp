import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StartingScreen } from "../screens/StartingScreen";
import { TestScreen } from "../screens/TestScreen";
//import { RootNavigator } from "./rootNavigator";
//import { DefaultTheme, DarkTheme } from "@react-navigation/native";
//import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

export const StartingStack = () => {
  //const theme = useTheme();
  //const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartingScreen"
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
        }}
      >
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};