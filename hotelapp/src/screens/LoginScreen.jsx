import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
//import { TestScreen } from "./TestScreen";
import { useTranslation } from "react-i18next";

import * as Localization from "expo-localization";
import { useTheme } from "react-native-paper";

export const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = name.length > 0 && password.length > 0 ? false : true;

  const onButtonPress = () => {
    return password === "1"
      ? navigation.navigate("RootStack")
      : name === "admin" && password === "admin"
      ? navigation.navigate("Settings")
      : Alert.alert("Wrong password!");
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 200,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        placeholder={t("LoginScreen.login_placeholder")}
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        placeholder={t("LoginScreen.password_placeholder")}
      />
      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
    </View>
  );
};
