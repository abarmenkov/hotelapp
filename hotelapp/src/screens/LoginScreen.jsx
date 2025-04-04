import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, TextInput, Button } from "react-native-paper";
import { WIDTH, AppStyles } from "../utils/constants";
//import { UserContext } from "../context/UserContext";
import { saveData } from "../API/asyncStorageMethods";
import { SettingsContext } from "../context/SettingsContext";
//import MyTextInput from "../components/MyInput";

import { Hotels } from "../utils/data";
import { HotelPicker } from "../components/HotelPicker";

export const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { settings, setSettings } = useContext(SettingsContext);
  const { hotels, isLoggedInHotelId, isDefaultHotelId } = settings;

  //const { hotels, isDefaultHotelId, isLoggedInHotelId } = Hotels;
  const [activeHotelId, setActiveHotelId] = useState(isDefaultHotelId);
  const [hotelsArray, setHotelsArray] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [securedPassword, setSecuredPassword] = useState(true);

  const loginRef = useRef();
  const passwordRef = useRef();
  const pickerRef = useRef();
  const serverRef = useRef();

  useEffect(() => {
    const filteredHotel = activeHotelId
      ? hotels.find((hotel) => hotel.id === activeHotelId)
      : hotels[0];
    setHotelsArray(filteredHotel);
    //setSelectedHotelId(isDefaultHotelId);
  }, [activeHotelId]);

  useEffect(() => {
    setServerAddress(hotelsArray?.serverAddress);
    setName(hotelsArray?.user?.userName);
    setPassword(hotelsArray?.user?.userPassword);
    setToken(hotelsArray?.user?.token);
  }, [hotelsArray]);

  //const filteredHotel = hotels.find((hotel) => hotel.id === activeHotelId);
  //console.log(hotelsArray);

  //const { userName, userPassword, token } = hotelsArray.user;
  //const { hotelName } = filteredHotel;
  //const [activeHotelId, setActiveHotelId] = useState(isDefaultHotelId);
  //console.log(activeHotelId);

  //const [hotel, setHotel] = useState(hotelName);

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

  const buttonDisabled =
    name?.length > 0 && password?.length > 0 ? false : true;
  //const buttonDisabled = true;

  const setSecure = () => {
    setSecuredPassword(false);
    //setSecureTextEntry(false);
    setTimeout(() => {
      setSecuredPassword(true);
      //setSecureTextEntry(true);
    }, 1000);
  };

  const onButtonPress = () => {
    if (password === "1") {
      navigation.navigate("UserStack");
      //saveUser({ userName: name, userPassword: password });
      //saveData("@user", { userName: name, userPassword: password });
      //setUser({ userName: name, userPassword: password });
      setSettings({
        ...settings,
        isLoggedInHotelId: activeHotelId,
      });
      saveData("@settings", {
        ...settings,
        isLoggedInHotelId: activeHotelId,
      });
    } else if (name === "admin" && password === "admin") {
      navigation.navigate("AdminStack");
    } else {
      Alert.alert("Wrong password!");
    }
  };

  const focusPassword = () => passwordRef.current.focus();
  const blurLogin = () => {
    loginRef.current.blur();
    Keyboard.dismiss();
  };
  const blurPassword = () => {
    passwordRef.current.blur();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
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
          <HotelPicker
            ref={pickerRef}
            activeHotelId={activeHotelId}
            setActiveHotelId={setActiveHotelId}
            hotels={hotels}
            lngPickerStyle={styles.lngPickerStyle}
            lngPickerContainerStyle={styles.lngPickerContainerStyle}
            lngPickerItemStyle={styles.lngPickerItemStyle}
            pickerLabel={t("LoginScreen.hotel_name")}
            focusPassword={focusPassword}
            blurLogin={blurLogin}
            blurPassword={blurPassword}
          />
        </View>
        <View
          style={{
            width: "90%",
          }}
        >
          <TextInput
            //underlineColorAndroid="transparent"
            //placeholderTextColor="gray"
            ref={serverRef}
            mode="outlined"
            label={t("LoginScreen.server")}
            value={serverAddress}
            style={{
              backgroundColor: theme.colors.onSecondary,
              marginVertical: 30,
            }}
            textColor={theme.colors.onSurface}
            onChangeText={setServerAddress}
            placeholder={t("LoginScreen.server_placeholder")}
            autoCapitalize="none"
            keyboardType="default"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => loginRef.current?.focus()}
            //right={hotel}
            //disabled
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            ref={loginRef}
            mode="outlined"
            //underlineColorAndroid="transparent"
            //placeholderTextColor="gray"
            style={{ width: "45%", backgroundColor: theme.colors.onSecondary }}
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
            textColor={theme.colors.onSurface}
            //contentStyle={{ backgroundColor: theme.colors.onSecondary }}
            //underlineColor="red"
            //outlineColor="red"
            activeOutlineColor={theme.colors.primary}
            //onBlur={() => Keyboard.dismiss()}
            //showSoftInputOnFocus={false}
          />
          <TextInput
            ref={passwordRef}
            mode="outlined"
            //underlineColorAndroid="transparent"
            //placeholderTextColor="gray"
            style={{ width: "45%", backgroundColor: theme.colors.onSecondary }}
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
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setSecure()}
                color={
                  securedPassword ? theme.colors.primary : theme.colors.outline
                }
              />
            }
            //onBlur={() => passwordRef.current?.blur()}

            //вызвать функцию по нажатию returnkey на клавиатуре
            onSubmitEditing={onButtonPress}
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

        <Button
          //title="Enter"
          onPress={onButtonPress}
          disabled={buttonDisabled}
          mode="contained"
          style={{ width: "30%" }}
        >
          {t("LoginScreen.enterBtn")}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
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
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingVertical: 120,
    paddingHorizontal: 5,
  },
  preferenceTitle: { fontSize: 14 },

  lngPickerContainerStyle: {
    width: "100%",
    borderColor: "grey",

    borderRadius: 5,
  },
  lngPickerStyle: {
    width: "100%",
    //backgroundColor: "red",
  },
  lngPickerViewStyle: {
    //width: "90%",
    //backgroundColor: "red",
    //borderColor: "grey",
    //borderWidth: 1,
    //borderRadius: 5,
  },
  lngPickerTitleViewStyle: {
    //width: "60%",
  },
  lngPickerTitleStyle: {
    //fontSize: 14,
  },
  lngPickerItemStyle: {
    fontSize: 16,
  },
});
