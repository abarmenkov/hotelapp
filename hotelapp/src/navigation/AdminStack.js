import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { useWindowDimensions, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { SettingsStackNavigator } from "./SettingsScreenStack";

const Drawer = createDrawerNavigator();

export const AdminStack = () => {
  const [token, setToken] = useState(false);
  const { t } = useTranslation();
  const { fontScale, width } = useWindowDimensions();
  const iconSize = width > 768 ? 24 / fontScale : 18 / fontScale;
  const labelFontSize = width > 768 ? 18 / fontScale : 16 / fontScale;

  return (
    <Drawer.Navigator
      initialRouteName="Settings"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          width: width > 768 ? width * 0.5 : width * 0.7,
        },
        drawerActiveTintColor: "green",
        //drawerActiveBackgroundColor: "red",
      }}
    >
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
