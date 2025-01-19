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
import { LanguagePicker } from "./LanguagePicker";

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
      <View style={{ ...styles.drawerContent }}>
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
        <Drawer.Section style={{ ...styles.drawerSection }}>
          <DrawerItemList {...props} />
        </Drawer.Section>
        <Drawer.Section
          //title={<Text style={styles.settings}>{t("DrawerContent.settings")}</Text>}
          style={{
            ...styles.drawerSection,
            //width: "100%",
            //paddingHorizontal: 40,
            //alignItems: "center"
            //justifyContent: "space-between",
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
            <View style={styles.preference}>
              <View>
                <Text style={styles.preferenceTitle}>
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
          {/*<TouchableRipple
            onPress={() => {
              openPicker();
            }}
          >
            <View
              style={{
                ...styles.preference,
                width: "90%",
                backgroundColor: "red",
              }}
            >
              <View>
                <Text style={styles.preferenceTitle}>
                  {t("DrawerContent.select_language")}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end", marginVertical: 5 }}>
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
          </TouchableRipple>*/}
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

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    //alignItems: "center",
    //width: '70%',
    //justifyContent: "center",
  },
  drawerSection: {
    //paddingHorizontal: -20,
    //marginTop: 15,
    //paddingVertical: 5,
  },

  userInfoSection: {
    //paddingLeft: 20,
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
    justifyContent: "space-between",
  },
  headerRow: {
    //marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    //backgroundColor: "green",
    //paddingVertical: 120,
    //paddingHorizontal: 22,
  },
  preferenceTitle: { fontSize: 14 },
  pickerStyles: {
    //width: 140,
    //backgroundColor: "green",
  },
  drawerItem: {
    fontSize: 14,
  },
  logo: {
    width: 30,
    height: 30,
    //marginRight: 35,
  },

  lngPickerContainerStyle: {
    width: "40%",
  },
  lngPickerStyle: {
    width: "90%",
    //backgroundColor: "red",
  },
  lngPickerViewStyle: {
    width: "100%",
    //backgroundColor: "green",
  },
  lngPickerTitleViewStyle: {
    width: "60%",
  },
  lngPickerTitleStyle: {
    fontSize: 14,
  },
  lngPickerItemStyle: {
    fontSize: 16,
  },
});
