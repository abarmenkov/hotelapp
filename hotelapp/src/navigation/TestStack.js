import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
//import { TestScreen } from "../screens/TestScreen";
import { StartingScreen } from "../screens/StartingScreen";
import { WIDTH } from "../utils/constants";
import { useWindowDimensions } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ReservationsStackNavigator } from "./ReservationsScreenStack";
import { HousekeepingStackNavigator } from "./HousekeepingScreenStack";
import { FastPostStackNavigator } from "./FastPostScreenStack";
import { ServicesControlStackNavigator } from "./ServicesControlScreenStack";
import { ServiceRequestsStackNavigator } from "./ServiceRequestsScreenStack";
import { TasksStackNavigator } from "./TasksScreenStack";
import { SettingsStackNavigator } from "./SettingsScreenStack";
import { Text, useTheme } from "react-native-paper";
//import { ReservationsScreen } from "../screens/Reservations/ReservationsScreen";
import { HousekeepingScreen } from "../screens/Housekeeping/HousekeepingScreen";
import { FastPostScreen } from "../screens/FastPost/FastPostScreen";
import { CleaningScreen } from "../screens/Housekeeping/CleaningScreen";
import { AddServiceTaskScreen } from "../screens/Housekeeping/AddServiceTask";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const TestStack = ({ navigation, route }) => {
  const [token, setToken] = useState(false);
  //const routeName = getFocusedRouteNameFromRoute(route);
  const { t } = useTranslation();
  const { fontScale, width } = useWindowDimensions();
  const iconSize = width > 768 ? 24 / fontScale : 18 / fontScale;
  const labelFontSize = width > 768 ? 18 / fontScale : 16 / fontScale;
  const theme = useTheme();
  //console.log(route);
  //console.log(routeName);

  return (
    <Drawer.Navigator
      initialRouteName="Reservations"
      //backBehavior="none"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        //backBehavior: "initialRoute",
        headerShown: true,
        drawerStyle: {
          width: width > 768 ? width * 0.5 : width * 0.7,
        },
        drawerActiveTintColor: "green",
        headerTintColor: theme.colors.onSurface, //цвет иконки меню
        /*headerLeft: ({ color }) => (
          <MaterialCommunityIcons
            name="account-outline"
            color={color}
            size={iconSize}
            onPress={() => navigation.openDrawer()}
          />
        ),*/
        //drawerActiveBackgroundColor: "red",
      })}
    >
      <Drawer.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          //headerShown: true,
          //drawerActiveTintColor: "red", // цвет активной вкладки иконки и текста для конкретного элемента
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.reservations")}
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={iconSize}
            />
          ),

          title: "Reservations", //header
          headerTitle: () => (
            <Text variant="titleMedium">{t("DrawerContent.reservations")}</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Housekeeping"
        component={HousekeepingScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.housekeeping")}
            </Text>
          ),
          /*drawerLabelStyle: {
            fontSize: width > 768 ? 18 / fontScale : 16 / fontScale,
          },*/
          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="cleaning-services"
              color={color}
              size={iconSize}
            />
          ),
          title: "Housekeeping", //header
          headerTitle: () => (
            <Text variant="titleMedium">{t("DrawerContent.housekeeping")}</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="FastPost"
        component={FastPostScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.fast_post")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="credit-card-plus"
              color={color}
              size={iconSize}
            />
          ),
          title: "FastPost", //header
          headerTitle: () => (
            <Text variant="titleMedium">{t("DrawerContent.fast_post")}</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
