import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { LoginScreen } from "../screens/LoginScreen";
//import { SettingsScreen } from "../screens/SettingsScreen";
import { UserStack } from "./UserStack";
import { AdminStack } from "./AdminStack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
//import { AddReservationScreen } from "../screens/AddReservationScreen";
//import { DefaultTheme, DarkTheme } from "@react-navigation/native";
//import { PreferencesContext } from "../context/PreferencesContext";

const Stack = createStackNavigator();

export const StartingStack = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  //const { t } = useTranslation();
  const { i18n } = useTranslation();
  //const { language } = useContext(PreferencesContext);
  //console.log(language);

  /*useState(() => {
    const setLanguage = async () => {
      const value = await AsyncStorage.getItem("@language");
      if (value) {
        i18n.changeLanguage(value);
      } else {
        i18n.changeLanguage("en");
      }
    };
    setLanguage();
  }, []);*/
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminStack" component={AdminStack} />
        <Stack.Screen name="UserStack" component={UserStack} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
