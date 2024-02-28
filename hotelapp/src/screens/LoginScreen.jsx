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
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  //const supportedLngs = Object.keys(i18n.services.resourceStore.data);
  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  //console.log(languageKeys);

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
        placeholder={t("LoginScreen.password_placeholder")}
      />
      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
      <FlatList
        data={languageKeys}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              i18n.changeLanguage(item);
              AsyncStorage.setItem("@language", item);
            }}
          >
            <Text>{supportedLngs[item].locale}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

/*      <FlatList
        data={supportedLngs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => i18n.changeLanguage(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
*/

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
