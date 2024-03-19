import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FastPostScreen } from "../screens/FastPost/FastPostScreen";

const Stack = createStackNavigator();

export const FastPostStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="FastPostScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FastPostScreen" component={FastPostScreen} />
    </Stack.Navigator>
  );
};
