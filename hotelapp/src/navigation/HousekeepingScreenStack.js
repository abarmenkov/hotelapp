import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HousekeepingScreen } from "../screens/Housekeeping/HousekeepingScreen";
import { AddServiceTaskScreen } from "../screens/Housekeeping/AddServiceTask";
import { CleaningScreen } from "../screens/Housekeeping/CleaningScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

export const HousekeepingStackNavigator = ({ route }) => {
  //const routeName = getFocusedRouteNameFromRoute(route) ?? "HousekeepingScreen";
  //console.log(routeName);
  return (
    <Stack.Navigator
      initialRouteName="HousekeepingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HousekeepingScreen" component={HousekeepingScreen} />
      <Stack.Screen
        name="CleaningScreen"
        component={CleaningScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddServiceTaskScreen"
        component={AddServiceTaskScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
/*       <Stack.Screen
        name="AddReservationscreen"
        component={AddReservationScreen}
        options={{ headerShown: true }}
      />*/
