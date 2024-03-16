import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HousekeepingScreen } from "../screens/HousekeepingScreen";

const Stack = createStackNavigator();

export const HousekeepingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HousekeepingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HousekeepingScreen" component={HousekeepingScreen} />
    </Stack.Navigator>
  );
};
