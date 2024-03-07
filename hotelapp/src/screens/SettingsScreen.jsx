import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export const Settings = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  const appLanguage = i18n.language;
  const [selectedLanguage, setSelectedLanguage] = useState("appLanguage");
  const handleLanguageChange = (value, index) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text>{t("Settings.add_hotel")}</Text>
      <Text>{t("Settings.select_language")}</Text>
      <FlatList
        data={languageKeys}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              i18n.changeLanguage(item);
              //AsyncStorage.setItem("@language", item);
            }}
          >
            <Text
              style={{
                color:
                  appLanguage === supportedLngs[item].code ? "red" : "blue",
              }}
            >
              {supportedLngs[item].locale}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.container}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={handleLanguageChange}
          style={styles.pickerStyles}
        >
          {languageKeys.map((item) => (
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
