import React, { useState } from "react";
import { View, TextInput, Alert, Button } from "react-native";
//import { TestScreen } from "./TestScreen";
import { useTranslation } from "react-i18next";

export const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const buttonDisabled = name.length > 0 && password.length > 0 ? false : true;
  const onButtonPress = () => {
    return password === "1"
      ? navigation.navigate("TestScreen")
      : Alert.alert("Wrong password!");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
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
        placeholder="Enter your password"
      />
      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
    </View>
  );
};

/*export const LoginScreen = ({ navigation }) => {
  //const { t } = useTranslation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const buttonDisabled = name.length > 0 && password.length > 0 ? false : true;
  const onButtonPress = () => {
    return password === "1"
      ? navigation.navigate("StartingScreen")
      : Alert.alert("Wrong password!");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        placeholder="Enter your password"
      />
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
    </View>
  );
};*/
