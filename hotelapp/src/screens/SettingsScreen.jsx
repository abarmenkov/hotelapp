import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { postData } from "../API/PostData";
import { appRoutes } from "../API/route";
import { token } from "../API/route";

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  
//получить точки продаж
  useEffect(() => {
    const endPoint = "/Logus.HMS.Entities.Dictionaries.PointOfSale";
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);

      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      url: `${appRoutes.dictionariesPath()}${endPoint}`,
      //url: appRoutes.dictionariesPath(),
      signal: newAbortSignal(5000),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },

      params: {
        propertyId: 1,
      },
    };
    postData(configurationObject, controller);
  });

  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  const appLanguage = i18n.language;
  const sortedLanguages = [
    ...languageKeys.filter((item) => item === appLanguage),
    ...languageKeys.filter((item) => item !== appLanguage),
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(appLanguage);

  const handleLanguageChange = (value, index) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };
  const pickerRef = useRef();

  const openPicker = () => pickerRef.current.focus();

  const closePicker = () => pickerRef.current.blur();
  return (
    <View style={{ alignItems: "center" }}>
      <Text>{t("Settings.add_hotel")}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          alignItems: "center",
        }}
      >
        <Text>{t("Settings.select_language")}</Text>
        <View style={styles.container}>
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
                    appLanguage === supportedLngs[item].code ? "red" : "blue",
                }}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  pickerStyles: {
    width: "70%",
    backgroundColor: "green",
    color: "red",
    width: 150,
  },
});
