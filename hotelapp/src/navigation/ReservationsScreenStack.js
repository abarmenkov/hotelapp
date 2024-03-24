import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReservationsScreen } from "../screens/Reservations/ReservationsScreen";
import { AddReservationScreen } from "../screens/Reservations/AddReservationScreen";

const Stack = createStackNavigator();

export const ReservationsStackNavigator = ({ route }) => {
  //console.log(route.name);
  return (
    <Stack.Navigator
      initialRouteName="ReservationsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} />
      <Stack.Screen
        name="AddReservation"
        component={AddReservationScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
// вызов вложенного скрина в Stack из другого Stacka, back возвращается на initialRoute, а не страницу вызова, backbehavior='none' в drawer - не помогает
/*<Stack.Screen
        name="AddReservationScreen"
        component={AddReservationScreen}
        options={{ headerShown: true }}
      />*/
