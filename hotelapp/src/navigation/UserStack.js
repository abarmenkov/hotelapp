import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { TestScreen } from "../screens/TestScreen";
import { StartingScreen } from "../screens/StartingScreen";
import { WIDTH } from "../utils/constants";
import { useWindowDimensions, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ReservationsStackNavigator } from "./ReservationsScreenStack";
import { HousekeepingStackNavigator } from "./HousekeepingScreenStack";
import { FastPostStackNavigator } from "./FastPostScreenStack";
import { ServicesControlStackNavigator } from "./ServicesControlScreenStack";
import { ServiceRequestsStackNavigator } from "./ServiceRequestsScreenStack";
import { TasksStackNavigator } from "./TasksScreenStack";
import { SettingsStackNavigator } from "./SettingsScreenStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export const UserStack = ({ navigation, route }) => {
  const [token, setToken] = useState(false);
  //const routeName = getFocusedRouteNameFromRoute(route);
  const { t } = useTranslation();
  const { fontScale, width } = useWindowDimensions();
  const iconSize = width > 768 ? 24 / fontScale : 18 / fontScale;
  const labelFontSize = width > 768 ? 18 / fontScale : 16 / fontScale;
  //console.log(route);
  //console.log(routeName);

  return (
    <Drawer.Navigator
      initialRouteName="Reservations"
      //backBehavior="none"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        //backBehavior: "initialRoute",
        headerShown: true,
        drawerStyle: {
          width: width > 768 ? width * 0.5 : width * 0.7,
        },
        drawerActiveTintColor: "green",
        //drawerActiveBackgroundColor: "red",
      }}
    >
      <Drawer.Screen
        name="Reservations"
        component={ReservationsStackNavigator}
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
            <Text style={{ fontSize: 20 }}>
              {t("DrawerContent.reservations")}
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Housekeeping"
        component={HousekeepingStackNavigator}
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
          headerTitle: () => <Text>{t("DrawerContent.housekeeping")}</Text>,
        }}
      />
      <Drawer.Screen
        name="FastPost"
        component={FastPostStackNavigator}
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
          headerTitle: () => <Text>{t("DrawerContent.fast_post")}</Text>,
        }}
      />
      <Drawer.Screen
        name="ServicesControl"
        component={ServicesControlStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.services_control")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cash-check"
              color={color}
              size={iconSize}
            />
          ),
          title: "ServicesControl", //header
          headerTitle: () => <Text>{t("DrawerContent.services_control")}</Text>,
        }}
      />
      <Drawer.Screen
        name="ServiceRequests"
        component={ServiceRequestsStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.service_requests")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="room-service"
              color={color}
              size={iconSize}
            />
          ),
          title: "ServiceRequests", //header
          headerTitle: () => <Text>{t("DrawerContent.service_requests")}</Text>,
        }}
      />
      <Drawer.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.tasks")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialIcons name="task" color={color} size={iconSize} />
          ),
          title: "Tasks", //header
          headerTitle: () => <Text>{t("DrawerContent.tasks")}</Text>,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: labelFontSize,
              }}
            >
              {t("DrawerContent.settings")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={iconSize} />
          ),
          title: "Settings", //header
          headerTitle: () => <Text>{t("DrawerContent.settings")}</Text>,
        }}
      />
    </Drawer.Navigator>
  );
};
