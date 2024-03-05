import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  const appLanguage = i18n.language;
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
    </View>
  );
};
