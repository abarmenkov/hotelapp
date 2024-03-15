import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { TestScreen } from "../screens/TestScreen";
import { StartingScreen } from "../screens/StartingScreen";
import { WIDTH } from "../utils/constants";
import { useWindowDimensions, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

export const RootStack = () => {
  const [token, setToken] = useState(false);
  const { t } = useTranslation();
  const { fontScale, width } = useWindowDimensions();
  const iconSize = width > 768 ? 24 / fontScale : 14 / fontScale;
  return (
    <Drawer.Navigator
      initialRouteName='Reservations'
      //drawerContentOptions={{}}
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          width: width > 768 ? width * 0.5 : width * 0.7,
        },
        //drawerActiveBackgroundColor: "red",
      }}
    >
      <Drawer.Screen
        name='Reservations'
        component={TestScreen}
        options={{
          drawerActiveTintColor: "red", // цвет активной вкладки иконки и текста
          drawerLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: width > 768 ? 18 / fontScale : 14 / fontScale,
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
          drawerItemStyle: {
            //backgroundColor: "yellow",
            //color: "orange",
          },
          drawerLabelStyle: {
            color: "green",
            fontSize: width > 768 ? 18 / fontScale : 14 / fontScale,
          },
          //title: 'test' //header
        }}
      />
      <Drawer.Screen
        name="Starting"
        component={StartingScreen}
        options={{
          drawerLabelStyle: {
            //color: "green",
            fontSize: width > 768 ? 18 / fontScale : 14 / fontScale,
          },
          drawerActiveTintColor: "red",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={iconSize}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
