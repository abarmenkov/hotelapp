import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ServiceRequestsScreen } from "../screens/ServiceRequestsScreen";

const Stack = createStackNavigator();

export const ServiceRequestsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ServiceRequestsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ServiceRequestsScreen" component={ServiceRequestsScreen} />
    </Stack.Navigator>
  );
};
