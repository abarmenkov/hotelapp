import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStyles } from "../utils/constants";

export const LoginScreen = ({ navigation }) => {
  const { userName, userPassword } = useContext(UserContext);
  //console.log( userName);
  //console.log( userPassword );
  const { t } = useTranslation();
  const theme = useTheme();

  const [name, setName] = useState(userName);
  const [password, setPassword] = useState(userPassword);
  //useEffect(() => setName(userName), [name]);

  const buttonDisabled = name.length > 0 && password.length > 0 ? false : true;
  const saveUser = async (value) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(value));
    } catch (e) {
      console.log("error saving user to AsyncStorage");
    }
  };

  const onButtonPress = () => {
    if (password === "1") {
      navigation.navigate("UserStack");
      saveUser({ userName: name, userPassword: password });
    } else if (name === "admin" && password === "admin") {
      navigation.navigate("AdminStack");
    } else {
      Alert.alert("Wrong password!");
    }
    /*return password === "1"
      ? navigation.navigate("RootStack")
      : name === "admin" && password === "admin"
      ? navigation.navigate("Settings")
      : Alert.alert("Wrong password!");*/
  };

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
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
