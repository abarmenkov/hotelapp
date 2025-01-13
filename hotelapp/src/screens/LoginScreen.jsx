import React, { useContext, useEffect, useState } from "react";
import { View, Alert, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, TextInput } from "react-native-paper";
import { AppStyles } from "../utils/constants";
import { UserContext } from "../context/UserContext";
import { saveData } from "../API/asyncStorageMethods";
import { SettingsContext } from "../context/SettingsContext";

export const LoginScreen = ({ navigation }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  //const { user, setUser } = useContext(UserContext);
  const { userName, userPassword, token } = settings[0].user;
  const { hotelName } = settings[0];

  const { t } = useTranslation();
  const theme = useTheme();
  const [name, setName] = useState(userName);
  const [password, setPassword] = useState(userPassword);
  const [securedPassword, setSecuredPassword] = useState(true);

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
      //saveData("@user", { userName: name, userPassword: password });
      //setUser({ userName: name, userPassword: password });
      setSettings([
        {
          ...settings[0],
          user: { userName: name, userPassword: password, token },
        },
      ]);
      saveData("@settings", [
        {
          ...settings[0],
          user: { userName: name, userPassword: password, token },
        },
      ]);
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
      <View
        style={{
          width: "90%",
        }}
      >
        <TextInput
          //underlineColorAndroid="transparent"
          //placeholderTextColor="gray"
          mode="outlined"
          label={t("LoginScreen.hotel_name")}
          value={hotelName}
          disabled
          //onChangeText={setName}
          //placeholder={t("LoginScreen.login_placeholder")}
        />
      </View>

      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 30,
        }}
      >
        <TextInput
          mode="outlined"
          //underlineColorAndroid="transparent"
          //placeholderTextColor="gray"
          style={{ width: "45%" }}
          value={name}
          onChangeText={setName}
          label={t("LoginScreen.login")}
          placeholder={t("LoginScreen.login_placeholder")}
        />
        <TextInput
          mode="outlined"
          //underlineColorAndroid="transparent"
          //placeholderTextColor="gray"
          style={{ width: "45%" }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={securedPassword}
          label={t("LoginScreen.password")}
          placeholder={t("LoginScreen.password_placeholder")}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecuredPassword(false);
                setTimeout(() => setSecuredPassword(true), 3000);
              }}
            />
          }
        />
      </View>

      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
    </View>
  );
};
