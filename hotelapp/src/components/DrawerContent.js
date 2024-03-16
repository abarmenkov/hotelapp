import React, { useContext, useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";
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
//import { useTheme } from "react-native-paper";
//import { useAuth } from "../hooks/useAuth";
import { WIDTH } from "../utils/constants";
//import { width } from "../utils/constants";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";

export const DrawerContent = (props) => {
  const { fontScale, width } = useWindowDimensions();
  const { navigation, isFocused } = props;
  const initialRouteName = getFocusedRouteNameFromRoute(props);
  console.log(initialRouteName);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
  const { userName } = useContext(UserContext);
  const [dark, setDark] = useState(isThemeDark);

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
  };

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("@theme", JSON.stringify(dark));
      } catch (e) {
        alert("Failed to save data");
      }
    };
    saveTheme();
  }, [dark]);

  const pickerRef = useRef();

  const openPicker = () => pickerRef.current.focus();

  const closePicker = () => pickerRef.current.blur();

  {
    /*source={require("../../assets/images/Avatar.png")}*/
  }
  return (
    <View style={styles.container}>
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
          <Drawer.Section title={t("DrawerContent.settings")}>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
                setDark(!dark);
              }}
            >
              <View style={styles.preference}>
                <Text>{t("DrawerContent.darkTheme")}</Text>
                <View>
                  <Switch
                    color={theme.colors.primary}
                    value={isThemeDark}
                    onValueChange={() => {
                      toggleTheme();
                      setDark(!dark);
                    }}
                  />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                openPicker();
              }}
            >
              <View style={styles.preference}>
                <Text>{t("DrawerContent.select_language")}</Text>
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
                <MaterialCommunityIcons
                  name="logout"
                  color={color}
                  size={size}
                />
              )}
              label={t("DrawerContent.logout")}
              onPress={() => {
                console.log("Pressed Logout");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: WIDTH * 0.4,
  },
  container: {
    flex: 1,
    //width: WIDTH * 0.4,
  },
  drawerContent: {
    flex: 1,
  },
  pickerStyles: {
    width: "70%",
    backgroundColor: "green",
    color: "red",
    width: 150,
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "space-between",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 20,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItem: {
    fontSize: 18,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 35,
  },
});
