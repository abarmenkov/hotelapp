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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { PreferencesContext } from "../context/PreferencesContext";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
//import { useAuth } from "../hooks/useAuth";
import { WIDTH } from "../utils/constants";
import { create } from "../utils/normalize";
import { saveData } from "../API/asyncStorageMethods";
import { SettingsContext } from "../context/SettingsContext";
import { LanguagePicker } from "./LanguagePicker";
import { AppStyles } from "../utils/constants";

export const DrawerContent = (props) => {
  //const { fontScale, width } = useWindowDimensions();
  const { navigation, isFocused } = props;
  //const initialRouteName = getFocusedRouteNameFromRoute(props);
  //console.log(initialRouteName);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
  const { settings, setSettings } = useContext(SettingsContext);
  //const { user, setUser } = useContext(UserContext);
  const { userName, userPassword } = settings[0].user;
  //const { user } = useContext(UserContext);
  //const [dark, setDark] = useState(isThemeDark);
  //const { userName } = user;

  /*useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("@theme", JSON.stringify(dark));
      } catch (e) {
        alert("Failed to save data");
      }
    };
    saveTheme();
  }, [dark]);*/

  const pickerRef = useRef();

  {
    /*source={require("../../assets/images/Avatar.png")}*/
  }
  return (
    <DrawerContentScrollView
      style={{ width: "90%" }}
      //contentContainerStyle={{ alignItems: "center" }}
      {...props}
    >
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
            <Caption style={AppStyles.drawerHeaderCaption}>{userName}</Caption>
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
                  setTimeout(() => navigation.closeDrawer(), 1000);
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
