import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReservationsScreen } from "../screens/ReservationsScreen";

const Stack = createStackNavigator();

export const ReservationsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReservationsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} />
    </Stack.Navigator>
  );
};
