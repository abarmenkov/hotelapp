import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Alert, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, TextInput } from "react-native-paper";
import { AppStyles } from "../utils/constants";
import { UserContext } from "../context/UserContext";
import { saveData } from "../API/asyncStorageMethods";
import { SettingsContext } from "../context/SettingsContext";
import MyTextInput from "../components/MyInput";
import { WIDTH } from "../utils/constants";

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
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const passwordRef = useRef(null);

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

  const setSecure = () => {
    setSecuredPassword(false);
    setSecureTextEntry(false);
    setTimeout(() => {
      setSecuredPassword(true);
      setSecureTextEntry(true);
    }, 1000);
  };

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

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          //underlineColorAndroid="transparent"
          //placeholderTextColor="gray"
          style={{ width: "45%" }}
          value={name}
          onChangeText={setName}
          label={t("LoginScreen.login")}
          placeholder={t("LoginScreen.login_placeholder")}
          autoCapitalize="none"
          keyboardType="default"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => passwordRef.current?.focus()}
          //showSoftInputOnFocus={false}
        />
        <TextInput
          //ref={passwordRef}
          mode="outlined"
          //underlineColorAndroid="transparent"
          //placeholderTextColor="gray"
          style={{ width: "45%" }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={securedPassword}
          label={t("LoginScreen.password")}
          placeholder={t("LoginScreen.password_placeholder")}
          autoCapitalize="none"
          keyboardType="default"
          keyboardAppearance="dark"
          returnKeyType="done"
          returnKeyLabel="done"
          right={<TextInput.Icon icon="eye" onPress={() => setSecure()} />}
        />
      </View>
      {/*<View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <MyTextInput
          placeholder={t("LoginScreen.login_placeholder")}
          value={name}
          autoCapitalize="none"
          //autoFocus={true}
          //autoCompleteType="email"
          //keyboardType="email-address"
          keyboardType="default"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          //secureTextEntry={securedPassword}
          //secureIcon="eye"
          //onPressSecureIcon={() => setSecure()}
          style={{
            ...styles.textInput,
            //color: "grey",
          }}
          viewStyle={{
            ...styles.textInputView,
            //backgroundColor: "grey",
          }}
          onChangeText={setName}
          //onBlur={handleBlur("email")}
          //error={errors.email}
          //touched={touched.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <MyTextInput
          ref={passwordRef}
          placeholder={t("LoginScreen.password_placeholder")}
          value={password}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCompleteType="password"
          //multiline={false}
          //autoFocus={true}
          //autoCompleteType="email"
          //keyboardType="email-address"
          //keyboardType="default"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          style={{
            ...styles.textInput,
            //color: "grey",
          }}
          viewStyle={{
            ...styles.textInputView,
            //backgroundColor: "grey",
          }}
          secureIcon="eye"
          onPressSecureIcon={() => setSecure()}
          secureIconColor="green"
          onChangeText={() => setPassword()}
          //onBlur={handleBlur("email")}
          //error={errors.email}
          //touched={touched.email}
          //onSubmitEditing={() => passwordRef.current?.focus()}
        />
      </View>*/}

      <Button title="Enter" onPress={onButtonPress} disabled={buttonDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  textInputView: {
    width: WIDTH * 0.4,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 16,
    //width: "45%",
  },
});
