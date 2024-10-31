import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export const AccountHeader = ({ navigation, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Appbar.Header style={theme.colors.onSecondary}>
      <Appbar.BackAction size={24} onPress={navigation.goBack} />
      {/*<Appbar.Action icon="close" onPress={navigation.goBack} />*/}
      <Appbar.Content
        title={`${t("AccountHeader.title")} #${title}`}
        style={theme.colors.onPrimary}
      />
      <Appbar.Action
        icon="delete"
        onPress={() => {
          console.log("delete");
        }}
      />
      <Appbar.Action
        icon="circle-edit-outline"
        onPress={() => {
          console.log("edit");
        }}
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          console.log("search");
        }}
      />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => {
          console.log("dots");
        }}
      />
    </Appbar.Header>
  );
};
