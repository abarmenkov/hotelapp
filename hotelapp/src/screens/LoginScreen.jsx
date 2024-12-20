import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Alert, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { AppStyles } from "../utils/constants";
import { UserContext } from "../context/UserContext";
import { saveData } from "../API/asyncStorageMethods";

export const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { userName, userPassword } = user;

  const { t } = useTranslation();
  const theme = useTheme();
  const [name, setName] = useState(userName);
  const [password, setPassword] = useState(userPassword);

  //useEffect(() => setName(userName), [name]);
  /*useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://api-hms.logus.pro/api/Account?userName=installer&password=pass"
      );
      const data = await apiResponse.json();
      console.log(data.Token);
      //setToken(data.Token);
    };
    getData();
  }, []);*/

  const buttonDisabled = name.length > 0 && password.length > 0 ? false : true;

  const onButtonPress = () => {
    if (password === "1") {
      navigation.navigate("UserStack");
      //saveUser({ userName: name, userPassword: password });
      saveData("@user", { userName: name, userPassword: password });
      setUser({ userName: name, userPassword: password });
    } else if (name === "admin" && password === "admin") {
      navigation.navigate("AdminStack");
    } else {
      Alert.alert("Wrong password!");
    }
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
