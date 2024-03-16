import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TasksScreen } from "../screens/TasksScreen";

const Stack = createStackNavigator();

export const TasksStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TasksScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
    </Stack.Navigator>
  );
};
