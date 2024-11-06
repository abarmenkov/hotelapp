import React, { useState } from "react";
import { Appbar, useTheme, Tooltip, Menu, Divider } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export const AccountHeader = ({ navigation, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const closeMenu = () => setVisible(false);
  const openMenu = (v) => setVisible(true);

  return (
    <Appbar.Header style={theme.colors.onSecondary}>
      <Appbar.BackAction size={24} onPress={navigation.goBack} />
      {/* Пользовательская иконка для BackAction */}
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
        disabled
      />
      <Appbar.Action
        icon="circle-edit-outline"
        onPress={() => {
          console.log("edit");
        }}
        disabled
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          console.log("search");
        }}
        disabled
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Tooltip title="Action menu">
            <Appbar.Action icon="dots-vertical" onPress={openMenu} />
          </Tooltip>
        }
        anchorPosition="bottom"
        mode="elevated"
        elevation={5}
        statusBarHeight={15}
      >
        <Menu.Item
          onPress={() => {
            Alert.alert("Action : ", "Post");
          }}
          title={t("AccountHeader.actions_menu.post")}
          leadingIcon="cash"
        />
        <Divider />

        <Menu.Item
          onPress={() => {
            Alert.alert("Action : ", "Forward");
          }}
          title={t("AccountHeader.actions_menu.pay")}
          leadingIcon="cash-plus"
          disabled
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            Alert.alert("Action : ", "Backward");
          }}
          title={t("AccountHeader.actions_menu.checkin")}
          leadingIcon="login"
          disabled
        />
        <Menu.Item
          onPress={() => {
            Alert.alert("Action :", "Save");
          }}
          title={t("AccountHeader.actions_menu.checkout")}
          leadingIcon="logout"
          disabled
        />
      </Menu>
    </Appbar.Header>
  );
};
