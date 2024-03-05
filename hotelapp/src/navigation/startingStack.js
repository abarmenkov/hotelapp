import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StartingScreen } from "../screens/StartingScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { Settings } from "../screens/SettingsScreen";
//import { TestScreen } from "../screens/TestScreen";
import { DrawerStack } from "./Drawer";
//import { RootNavigator } from "./rootNavigator";
//import { DefaultTheme, DarkTheme } from "@react-navigation/native";
//import { useTheme } from "react-native-paper";
import { RootStack } from "./RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { PreferencesContext } from "../context/PreferencesContext";

const Stack = createStackNavigator();

export const StartingStack = () => {
  //const theme = useTheme();
  //const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="RootStack" component={RootStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
