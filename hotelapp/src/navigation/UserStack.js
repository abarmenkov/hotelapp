import React, { useState, useEffect, useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/DrawerContent";
import { useWindowDimensions, View, StyleSheet } from "react-native";
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
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { LanguagePicker } from "../components/LanguagePicker";

import { AppStyles } from "../utils/constants";

const Drawer = createDrawerNavigator();

export const UserStack = ({ navigation, route }) => {
  //const [token, setToken] = useState(false);
  //const routeName = getFocusedRouteNameFromRoute(route) ?? "Reservations";
  const { t } = useTranslation();
  const { fontScale, width } = useWindowDimensions();
  //const iconSize = width > 768 ? 24 / fontScale : 18 / fontScale;
  //const labelFontSize = width > 768 ? 18 / fontScale : 16 / fontScale;
  const theme = useTheme();
  const pickerRef = useRef();

  return (
    <Drawer.Navigator
      initialRouteName="Reservations"
      //backBehavior="none"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        //backBehavior: "initialRoute",
        headerShown: true,
        drawerStyle: {
          width: width > 768 ? width * 0.55 : width * 0.8,
          alignItems: "center",
        },

        drawerActiveTintColor: theme.colors.onSecondaryContainer,
        drawerInactiveTintColor: theme.colors.onSurfaceVariant,
        headerTintColor: theme.colors.onSurface, //цвет иконки меню
        /*headerLeft: ({ color }) => (
          <MaterialCommunityIcons
            name="account-outline"
            color={color}
            size={iconSize}
            onPress={() => navigation.openDrawer()}
          />
        ),*/
        drawerActiveBackgroundColor: theme.colors.secondaryContainer,
      })}
    >
      <Drawer.Screen
        name="Reservations"
        component={ReservationsStackNavigator}
        options={{
          //headerShown: true,
          //drawerActiveTintColor: "red", // цвет активной вкладки иконки и текста для конкретного элемента
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.reservations")}
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              //size={iconSize}
              style={AppStyles.drawerLabelIcon}
            />
          ),

          title: "Reservations", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
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
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.housekeeping")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="cleaning-services"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "Housekeeping", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
              {t("DrawerContent.housekeeping")}
            </Text>
          ),
          //1й вариант скинуть фильтр при навигации и возврате на страницу, 2й - добавить листенер(focus) на страницу
          //unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="FastPost"
        component={FastPostStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.fast_post")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="credit-card-plus"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "FastPost", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
              {t("DrawerContent.fast_post")}
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="ServicesControl"
        component={ServicesControlStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.services_control")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cash-check"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "ServicesControl", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
              {t("DrawerContent.services_control")}
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="ServiceRequests"
        component={ServiceRequestsStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.service_requests")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="room-service"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "ServiceRequests", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
              {t("DrawerContent.service_requests")}
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.tasks")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="task"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "Tasks", //header
          headerTitle: () => (
            <Text style={{ ...AppStyles.drawerHeaderTitle }}>
              {t("DrawerContent.tasks")}
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ ...AppStyles.drawerLabel, color }}>
              {t("DrawerContent.settings")}
            </Text>
          ),

          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="settings"
              color={color}
              style={AppStyles.drawerLabelIcon}
              //size={iconSize}
            />
          ),
          title: "Settings", //header
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                //backgroundColor: "pink",
              }}
            >
              <Text style={{ ...AppStyles.drawerHeaderTitle }}>
                {t("DrawerContent.settings")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  //backgroundColor: "pink",
                  justifyContent: "flex-end",
                  width: "50%",
                }}
              >
                <LanguagePicker
                  ref={pickerRef}
                  lngPickerStyle={styles.lngPickerStyle}
                  lngPickerContainerStyle={styles.lngPickerContainerStyle}
                  lngPickerViewStyle={styles.lngPickerViewStyle}
                  lngPickerTitleViewStyle={styles.lngPickerTitleViewStyle}
                  lngPickerTitleStyle={styles.lngPickerTitleStyle}
                  lngPickerItemStyle={styles.lngPickerItemStyle}
                  pickerTitle={"DrawerContent.select_language"}
                  type={"settingsHeader"}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  lngPickerContainerStyle: {
    width: "100%",
    //alignItems: "center",
    //backgroundColor: "green",
    //alignItems: "center",
  },
  lngPickerStyle: {
    width: "100%",
    
    //backgroundColor: "red",
  },
  lngPickerViewStyle: {
    width: "60%",
    
    //backgroundColor: "orange",
    //marginHorizontal: -25,
  },
  lngPickerTitleViewStyle: {
    //width: "70%",
    //backgroundColor: "blue",
  },
  lngPickerTitleStyle: {
    //fontSize: 14,
  },
  lngPickerItemStyle: {
    
    //fontSize: 16,
  },
});
