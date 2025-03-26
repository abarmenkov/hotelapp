import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Icon,
} from "react-native-paper";

import { PreferencesContext } from "../context/PreferencesContext";
//import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

//import { useAuth } from "../hooks/useAuth";

import { saveData } from "../API/asyncStorageMethods";
import { SettingsContext } from "../context/SettingsContext";
import { LanguagePicker } from "./LanguagePicker";
import { AppStyles } from "../utils/constants";

export const DrawerContent = (props) => {
  const { navigation, isFocused } = props;

  const { t } = useTranslation();

  const theme = useTheme();
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
  const { settings, setSettings } = useContext(SettingsContext);

  const { hotels, isLoggedInHotelId } = settings;
  //console.log(isLoggedInHotelId);
  const loggedInUser = isLoggedInHotelId
    ? hotels.find((hotel) => hotel.id === isLoggedInHotelId).user.userName
    : "USER";

  const pickerRef = useRef();
  const onPressLogOut = () => {
    setSettings({
      ...settings,
      isLoggedInHotelId: "",
    });
    saveData("@settings", {
      ...settings,
      isLoggedInHotelId: "",
    });
    navigation.navigate("LoginScreen");
  };

  return (
    <DrawerContentScrollView style={{ width: "90%" }} {...props}>
      <View style={{ ...AppStyles.drawerContent }}>
        <View style={AppStyles.drawerHeaderSection}>
          <View style={AppStyles.drawerHeaderSectionRow}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={AppStyles.drawerHeaderImg}
            />
            <Title style={AppStyles.drawerHeaderTitleText}>HotelApp</Title>
          </View>

          <View style={AppStyles.drawerHeaderSectionRow}>
            <Paragraph
              style={{
                ...AppStyles.drawerHeaderParagraph,
                ...AppStyles.drawerHeaderCaption,
              }}
            >
              User name
            </Paragraph>
            <Caption style={AppStyles.drawerHeaderCaption}>
              {loggedInUser}
            </Caption>
          </View>
        </View>
        <Drawer.Section style={{ ...AppStyles.drawerSection }}>
          <DrawerItemList {...props} />
        </Drawer.Section>
        <Drawer.Section
          style={{
            ...AppStyles.drawerSection,
          }}
        >
          <TouchableRipple
            onPress={() => {
              toggleTheme();
              saveData("@theme", !isThemeDark);
              //setDark(!dark);
              setTimeout(() => navigation.closeDrawer(), 1000);
            }}
          >
            <View style={AppStyles.drawerThemeSwitcherView}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={AppStyles.drawerThemeSwitcherTitle}
                >
                  {t("DrawerContent.darkTheme")}
                </Text>
              </View>

              <Switch
                color={theme.colors.primary}
                value={isThemeDark}
                onValueChange={() => {
                  toggleTheme();
                  saveData("@theme", !isThemeDark);
                  //setDark(!dark);
                  //setTimeout(() => navigation.closeDrawer(), 1000);
                }}
              />
            </View>
          </TouchableRipple>

          <LanguagePicker
            ref={pickerRef}
            lngPickerStyle={styles.lngPickerStyle}
            lngPickerContainerStyle={styles.lngPickerContainerStyle}
            lngPickerViewStyle={styles.lngPickerViewStyle}
            lngPickerTitleViewStyle={styles.lngPickerTitleViewStyle}
            lngPickerTitleStyle={styles.lngPickerTitleStyle}
            lngPickerItemStyle={styles.lngPickerItemStyle}
            pickerTitle={"DrawerContent.select_language"}
          />
        </Drawer.Section>

        <TouchableRipple
          onPress={() => {
            console.log("Pressed Logout");
            onPressLogOut();
          }}
        >
          <View style={AppStyles.drawerLogoutView}>
            <Icon source="logout" size={24} color={theme.colors.onSurface} />
            <Text style={{ ...AppStyles.drawerLogoutText }}>
              {t("DrawerContent.logout")}
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  lngPickerContainerStyle: {
    width: "60%",
  },
  lngPickerStyle: {
    width: "90%",
    //backgroundColor: "red",
  },
  lngPickerViewStyle: {
    width: "100%",
  },
  lngPickerTitleViewStyle: {
    width: "40%",
  },
  lngPickerTitleStyle: {
    //fontSize: 14,
  },
  lngPickerItemStyle: {
    //fontSize: 16,
  },
});
