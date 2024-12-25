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
  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  const appLanguage = i18n.language;
  //сортируем массив языков для отображения языка приложения первым в Picker(е)
  const sortedLanguages = [
    ...languageKeys.filter((item) => item === appLanguage),
    ...languageKeys.filter((item) => item !== appLanguage),
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(appLanguage);

  const handleLanguageChange = (value, index) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    setTimeout(() => navigation.closeDrawer(), 1000);
  };

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

  const openPicker = () => pickerRef.current.focus();

  const closePicker = () => pickerRef.current.blur();

  {
    /*source={require("../../assets/images/Avatar.png")}*/
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={styles.headerRow}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
            />
            <Title style={styles.title}>HotelApp</Title>
          </View>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                User name
              </Paragraph>
              <Caption style={styles.caption}>{userName}</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItemList {...props} />
        </Drawer.Section>
        <Drawer.Section
          title={
            <Text style={styles.settings}>{t("DrawerContent.settings")}</Text>
          }
          style={styles.drawerSection}
        >
          <TouchableRipple
            onPress={() => {
              toggleTheme();
              saveData("@theme", !isThemeDark);
              //setDark(!dark);
              setTimeout(() => navigation.closeDrawer(), 1000);
            }}
          >
            <View style={styles.preference}>
              <Text style={styles.preferenceTitle}>
                {t("DrawerContent.darkTheme")}
              </Text>

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
          <TouchableRipple
            onPress={() => {
              openPicker();
            }}
          >
            <View style={styles.preference}>
              <Text style={styles.preferenceTitle}>
                {t("DrawerContent.select_language")}
              </Text>
              <View>
                <Picker
                  ref={pickerRef}
                  mode="dropdown"
                  //mode="dialog"
                  selectedValue={selectedLanguage}
                  onValueChange={handleLanguageChange}
                  style={styles.pickerStyles}
                  dropdownIconColor={"red"}
                  dropdownIconRippleColor={"yellow"}
                  prompt="Выберите язык" // header окна в режиме dialog
                >
                  {sortedLanguages.map((item) => (
                    <Picker.Item
                      key={supportedLngs[item].code}
                      label={supportedLngs[item].locale}
                      value={item}
                      style={{
                        color:
                          appLanguage === supportedLngs[item].code
                            ? "red"
                            : "blue",
                        fontSize: 14,
                      }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label={t("DrawerContent.logout")}
            labelStyle={styles.logOut}
            onPress={() => {
              console.log("Pressed Logout");
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    //paddingVertical: 25,
    //marginTop: 15,
    //paddingVertical: 5,
  },
  pickerStyles: {
    width: 175,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    //marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    //marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 20,
    paddingVertical: 15,
  },

  settings: {
    fontSize: 14,
  },
  logOut: { fontSize: 14 },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingVertical: 120,
    paddingHorizontal: 22,
  },
  preferenceTitle: { fontSize: 14 },
  drawerItem: {
    fontSize: 16,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 35,
  },
});
