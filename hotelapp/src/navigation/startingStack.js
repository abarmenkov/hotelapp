import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StartingScreen } from "../screens/StartingScreen";
//import { TestScreen } from "../screens/TestScreen";
import { DrawerStack } from "./Drawer";
//import { RootNavigator } from "./rootNavigator";
//import { DefaultTheme, DarkTheme } from "@react-navigation/native";
//import { useTheme } from "react-native-paper";
import { RootStack } from "./RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

export const StartingStack = () => {
  //const theme = useTheme();
  //const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  useState(() => {
    const getLanguage = async () => {
      const value = await AsyncStorage.getItem("@language");
      //console.log(value);
      if (value) {
        i18n.changeLanguage(value);
      } else {
        i18n.changeLanguage("en");
      }
    };
    getLanguage();
  }, []);
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
        <Stack.Screen name="RootStack" component={RootStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
