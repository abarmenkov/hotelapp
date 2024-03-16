import React, { useState, useRef } from "react";
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

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

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
