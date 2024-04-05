import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TestScreen } from "../screens/TestScreens/TestScreen";
import { View, Text } from "react-native";
import { SearchbarComponent } from "../components/SearchBar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
//import { ReservationsScreen } from "../screens/Reservations/ReservationsScreen";
import { HousekeepingScreen } from "../screens/Housekeeping/HousekeepingScreen";


const Tab = createMaterialTopTabNavigator();

export const ReservationsTopBarStack = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Reservations";
  //console.log(routeName);
  //console.log(route);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Test1">
        <Tab.Screen
          name="Test1"
          component={TestScreen}
          options={{ tabBarLabel: "Arrivals" }}
        />
        <Tab.Screen
          name="Test2"
          component={HousekeepingScreen}
          options={{ tabBarLabel: "INHOUSE" }}
        />
        <Tab.Screen
          name="Test3"
          component={HousekeepingScreen}
          options={{ tabBarLabel: "DEPARTURES" }}
        />
        <Tab.Screen
          name="Test4"
          component={HousekeepingScreen}
          options={{ tabBarLabel: "ALL RESERVATIONS" }}
        />
      </Tab.Navigator>
    </View>
  );
};
/*
<View style={{ flex: 1 }}>
      <SearchbarComponent />
      <Tab.Navigator initialRouteName="Test2">
        <Tab.Screen
          name="Test1"
          component={TestScreen}
          options={{ tabBarLabel: "Arrivals" }}
        />
        <Tab.Screen name="Test2" component={TestScreen} options={{ tabBarLabel: "INHOUSE" }}/>
        <Tab.Screen name="Test3" component={TestScreen} options={{ tabBarLabel: "DEPARTURES" }}/>
        <Tab.Screen name="Test4" component={TestScreen} options={{ tabBarLabel: "ALL RESERVATIONS" }}/>
      </Tab.Navigator>
    </View>
*/
