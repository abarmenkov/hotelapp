import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ServicesControlScreen } from "../screens/ServicesControl/ServicesControlScreen";

const Stack = createStackNavigator();

export const ServicesControlStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ServicesControlScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ServicesControlScreen" component={ServicesControlScreen} />
    </Stack.Navigator>
  );
};
