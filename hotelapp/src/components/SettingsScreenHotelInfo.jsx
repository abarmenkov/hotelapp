import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  RadioButton,
  Text,
  TouchableRipple,
  Button,
  TextInput,
  Switch,
  ActivityIndicator,
  useTheme,
  List,
  IconButton,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "./LanguagePicker";
import { appRoutes, endPoints, apiRequestTypes } from "../API/route";
import { token } from "../API/route";
import { fetchData, fetchDataTest } from "../API/FetchData";

import { saveData } from "../API/asyncStorageMethods";
import axios from "axios";
import { SettingsContext } from "../context/SettingsContext";

export const SettingsScreenHotelInfo = ({ item }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { settings, setSettings } = useContext(SettingsContext);
  const { isDefaultHotelId, hotels } = settings;

  //const item = settings.find((item) => item.id == itemId);
  //console.log(item.id);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [settingsIsLoading, setSettingsIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const [networkCheck, setNetworkCheck] = useState(false);
  const [checkNetworkColor, setCheckNetworkColor] = useState("grey");
  const [checkTokenColor, setTokenColor] = useState("grey");
  const [networkIsLoading, setNetworkIsLoading] = useState(false);
  const [tokenIsLoading, setTokenIsLoading] = useState(false);

  const [pointsOfSales, setPointsOfSales] = useState([]);
  const [checkedPointOfSales, setPointOfSalesChecked] = useState(
    item.defaultPointOfSales
  );

  const [folioPockets, setFolioPockets] = useState([]);
  const [checkedFolioPocket, setFolioPocketChecked] = useState(
    item.defaultPocketCode
  );

  const [hotelName, setHotelName] = useState(item.hotelName);
  const [serverAddress, setServerAddress] = useState(item.serverAddress);
  const [isHotelDefault, setIsHotelDefault] = useState(
    isDefaultHotelId === item.id
  );

  const [name, setName] = useState(item.user.userName);
  const [password, setPassword] = useState(item.user.userPassword);
  const [userToken, setUserToken] = useState(item.user.token);

  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  const [expandedAccordion, setExpandedAccordion] = useState(true);
  const [expandedPointOfSaleSection, setExpandedPointOfSaleSection] =
    useState(false);
  const [expandedFolioPocketsSection, setExpandedFolioPocketsSection] =
    useState(false);

  const loginRef = useRef();
  const passwordRef = useRef();
  const pickerRef = useRef();
  const serverRef = useRef();

  const hotelData = {
    hotelName: hotelName,
    serverAddress: serverAddress,
    defaultPointOfSales: checkedPointOfSales,
    defaultPocketCode: checkedFolioPocket,
    user: { userName: name, userPassword: password, token: userToken },
    language: "",
    isLoggedIn: false,
    PropertyId: null,
    id: item.id,
  };

  const defaultHotelId = isHotelDefault ? item.id : isDefaultHotelId;
  //установить цвет иконок проверки адреса сервера и токена
  useEffect(() => {
    const serverCheckBtnColor = userToken ? "green" : "grey";
    const tokenCheckColor = userToken ? "green" : "red";
    setCheckNetworkColor(serverCheckBtnColor);
    setTokenColor(tokenCheckColor);
  }, [userToken]);

  //"http://109.236.70.42:9090"

  //получить данные отеля data[0].Name
  ///Logus.HMS.Entities.Dictionaries.Property

  //получить точки продаж
  useEffect(() => {
    if (!userToken) {
      const url = `${appRoutes.dictionariesPath()}${endPoints.pointOfSale()}`;
      const method = "get";
      const params = {
        propertyId: 1,
      };

      fetchDataTest(
        setIsLoading,
        setPointsOfSales,
        setErrorFlag,
        setRefreshing,
        refreshing,
        method,
        url,
        token,
        params
      );
    }
    /*const endPoint = "/Logus.HMS.Entities.Dictionaries.PointOfSale";
      const controller = new AbortController();
      const newAbortSignal = (timeoutMs) => {
        setTimeout(() => controller.abort(), timeoutMs || 0);
  
        return controller.signal;
      };
  
      const configurationObject = {
        method: "get",
        url: `${appRoutes.dictionariesPath()}${endPoint}`,
        //url: appRoutes.dictionariesPath(),
        signal: newAbortSignal(5000),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
  
        params: {
          propertyId: 1,
        },
      };*/
  }, [userToken]);

  //загрузка словаря карманов(секций) счета(фолио)
  useEffect(() => {
    if (!userToken) {
      const url = `${appRoutes.dictionariesPath()}${endPoints.folioPocket()}`;
      const method = "get";
      const params = {
        propertyId: 1,
      };

      fetchDataTest(
        setIsLoading,
        setFolioPockets,
        setErrorFlag,
        setRefreshing,
        refreshing,
        method,
        url,
        token,
        params
      );
    }
    /*
      const endPoint = "/Logus.HMS.Entities.Dictionaries.StandardFolioPocket";
      const controller = new AbortController();
      const newAbortSignal = (timeoutMs) => {
        setTimeout(() => controller.abort(), timeoutMs || 0);
  
        return controller.signal;
      };
      const configurationObject = {
        method: "get",
        url: `${appRoutes.dictionariesPath()}${endPoint}`,
        signal: newAbortSignal(5000),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
  
        params: {
          propertyId: 1,
        },
      };
      fetchData(
        setIsLoading,
        setFolioPockets,
        configurationObject,
        setErrorFlag,
        setRefreshing,
        refreshing,
        controller
      )
    return () => {
      setErrorFlag(false);
      controller.abort("Data fetching cancelled");
    };*/
  }, [userToken]);

  // получить название отеля

  useEffect(() => {
    if (!userToken) {
      const url = `${appRoutes.dictionariesPath()}${endPoints.property()}`;
      const method = "get";
      const type = apiRequestTypes.getHotelName();
      const params = {};

      fetchDataTest(
        setIsLoading,
        setHotelName,
        setErrorFlag,
        setRefreshing,
        refreshing,
        method,
        url,
        token,
        params,
        type
      );
    }
    /*
      const endPoint = "/Logus.HMS.Entities.Dictionaries.StandardFolioPocket";
      const controller = new AbortController();
      const newAbortSignal = (timeoutMs) => {
        setTimeout(() => controller.abort(), timeoutMs || 0);
  
        return controller.signal;
      };
      const configurationObject = {
        method: "get",
        url: `${appRoutes.dictionariesPath()}${endPoint}`,
        signal: newAbortSignal(5000),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
  
        params: {
          propertyId: 1,
        },
      };
      fetchData(
        setIsLoading,
        setFolioPockets,
        configurationObject,
        setErrorFlag,
        setRefreshing,
        refreshing,
        controller
      )
    return () => {
      setErrorFlag(false);
      controller.abort("Data fetching cancelled");
    };*/
  }, [userToken]);

  const activePointOfSales = pointsOfSales.filter(
    (item) => item.IsActive && !item.DeletedDate
  );
  const activeFolioPockets = folioPockets.filter(
    (item) => item.IsActive && !item.DeletedDate
  );

  //const checkNetworkColor = hasError ? "red" : "green";
  const snackbarMessage =
    hasError && !networkCheck
      ? t("Settings.snackbar_failed")
      : !hasError && !networkCheck
      ? t("Settings.snackbar")
      : !hasError && networkCheck && !networkError
      ? t("Settings.snackbar_network_checked")
      : t("Settings.snackbar_network_failed");

  const PointOfSalesItem = ({ item }) => {
    return (
      <TouchableRipple
        onPress={() => {
          Keyboard.dismiss();
          setPointOfSalesChecked(item.Id);
          //setDefaultPointOfSales(item.Id);
        }}
        //rippleColor={"yellow"}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 5,
            //backgroundColor: "yellow",
          }}
        >
          <Text>{item.Name}</Text>
          <RadioButton
            value={item.Id}
            status={checkedPointOfSales === item.Id ? "checked" : "unchecked"}
            onPress={() => {
              Keyboard.dismiss();
              setPointOfSalesChecked(item.Id);
              //setDefaultPointOfSales(item.Id);
            }}
          />
        </View>
      </TouchableRipple>
    );
  };
  const FolioPocketItem = ({ item }) => {
    return (
      <TouchableRipple
        onPress={() => {
          Keyboard.dismiss();
          setFolioPocketChecked(item.Code);
          //setDefaultPocketCode(item.Code);
        }}
        //rippleColor={"yellow"}
        //style={{ backgroundColor: "green" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 5,
            //height: 18,
            //backgroundColor: "yellow",
            //fontSize: 12,
            //marginVertical: 0,
            //padding: 0,
          }}
        >
          <Text style={{ fontSize: 12 }}>{item.Code}</Text>
          <RadioButton
            value={item.Code}
            status={checkedFolioPocket === item.Code ? "checked" : "unchecked"}
            onPress={() => {
              Keyboard.dismiss();
              setFolioPocketChecked(item.Code);
              //setDefaultPocketCode(item.Code);
            }}
            //style={{ fontSize: 12 }}
          />
        </View>
      </TouchableRipple>
    );
  };

  const saveSettings = () => {
    setSettingsIsLoading(true);

    const hotel = hotels.find((elem) => elem.id == item.id);
    //Keyboard.dismiss();

    //console.log(hotel);
    //console.log(`это: ${hotelData.serverAddress}`);

    if (hotel) {
      const filteredSettings = hotels.filter((elem) => elem.id !== item.id);
      setSettings({
        ...settings,
        isDefaultHotelId: defaultHotelId,
        hotels: [...filteredSettings, hotelData],
      });
      saveData("@settings", {
        ...settings,
        isDefaultHotelId: defaultHotelId,
        hotels: [...filteredSettings, hotelData],
      });
    } else {
      setSettings({
        ...settings,
        isDefaultHotelId: defaultHotelId,
        hotels: [...hotels, hotelData],
      });
      saveData("@settings", {
        ...settings,
        isDefaultHotelId: defaultHotelId,
        hotels: [...hotels, hotelData],
      });
    }

    setTimeout(() => {
      setSettingsIsLoading(false);
      //setVisibleSnackBar(true);
    }, 10000);
  };

  const checkNetwork = async () => {
    //setNetworkCheck(true);
    Keyboard.dismiss();
    //const endPoint = "/api/Account/Ping";
    const url = `${serverAddress}${endPoints.pingServer()}`;
    setNetworkIsLoading(true);
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);
      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      //url: `${serverAddress}${endPoint}`,
      url,
      signal: newAbortSignal(15000),
      /*headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },

      params: {
        propertyId: 1,
      },*/
    };
    try {
      const response = await axios(configurationObject);
      //console.log(response.data);

      if (response.status === 200) {
        setCheckNetworkColor("green");
        setTimeout(() => {
          setNetworkIsLoading(false);
          setVisibleSnackBar(true);
        }, 3000);

        return;
      } else {
        throw new Error("Failed to get server");
      }
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Data fetching cancelled");
        setTimeout(() => {
          setNetworkIsLoading(false);
          setNetworkError(true);
          setCheckNetworkColor("red");
          setVisibleSnackBar(true);
        }, 3000);
      } else {
        console.log(error);
        //console.log("Data fetching cancelled");
        setTimeout(() => {
          setNetworkIsLoading(false);
          setNetworkError(true);
          setCheckNetworkColor("red");
          setVisibleSnackBar(true);
        }, 3000);
      }
    }
  };

  const getHotelName = async () => {
    setNetworkCheck(true);
    Keyboard.dismiss();
    const endPoint =
      "/api/Dictionaries/Logus.HMS.Entities.Dictionaries.Property";
    setIsLoading(true);
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);
      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      //url: `${serverAddress}${endPoint}`,
      //url: appRoutes.dictionariesPath(),
      url: "https://api-hms.logus.pro/api/Dictionaries/Logus.HMS.Entities.Dictionaries.Property",
      signal: newAbortSignal(35000),
      headers: {
        //Authorization: `Token ${token}`,
        Authorization: `Token ${userToken}`,
        "Content-Type": "application/json",
      },

      /*params: {
        propertyId: 1,
      },*/
    };
    try {
      const response = await axios(configurationObject);
      //console.log(response.data);

      if (response.status === 200) {
        console.log(response.data[0].Name);
        setHotelName(response.data[0].Name);
        setTimeout(() => {
          setIsLoading(false);
          setVisibleSnackBar(true);
        }, 3000);

        return;
      } else {
        throw new Error("Failed to get server");
      }
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Data fetching cancelled");
        setTimeout(() => {
          setIsLoading(false);
          setNetworkError(true);
          setVisibleSnackBar(true);
        }, 3000);
      } else {
        console.log(error);
        console.log(error.message);
        console.log(error.request);
        //console.log("Data fetching cancelled");
        setTimeout(() => {
          setIsLoading(false);
          setNetworkError(true);
          setVisibleSnackBar(true);
        }, 3000);
      }
    }
  };

  const getToken = () => {
    //const url = appRoutes.accountPath();
    const url = "https://api-hms.logus.pro/api/Account";
    const method = "get";
    const type = apiRequestTypes.getToken();

    const params = {
      userName: name,
      password: password,
      //propertyId: 1,
    };

    fetchDataTest(
      setIsLoading,
      setUserToken,
      setErrorFlag,
      setRefreshing,
      refreshing,
      method,
      url,
      token,
      params,
      type
    );

    /*const params = new URLSearchParams();
    params.append("userName", name);
    params.append("password", password);
    console.log(params);
    setIsLoading(true);
    Keyboard.dismiss();
    const endPoint = "/api/Account";

    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);
      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      url: "https://api-hms.logus.pro/api/Account",
      //url: `${serverAddress}${endPoint}`,
      signal: newAbortSignal(20000),
      params: {
        userName: name,
        password: password,
        //propertyId: 1,
      },
    };
    try {
      const response = await axios(configurationObject);
      if (response.status === 200) {
        console.log(response.data.Token);
        setUserToken(response.data.Token);
        getHotelName();
        setCheckNetworkColor("green");


        return;
      } else {
        throw new Error("Failed to get server");
      }
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Data fetching cancelled");
        console.log(error);
        setTimeout(() => {
          setIsLoading(false);
          setNetworkError(true);
          setVisibleSnackBar(true);
        }, 3000);
      } else {
        console.log(error);
        console.log(error.message);
        console.log(error.request);

        //console.log("Data fetching cancelled");
        setTimeout(() => {
          setIsLoading(false);
          setNetworkError(true);
          setVisibleSnackBar(true);
        }, 3000);
      }
    }*/
  };

  return (
    <List.Accordion
      key={item.id}
      title={hotelName ? hotelName : t("Settings.hotel_name")}
      //theme={{ colors: theme.colors.onSurface }}
      style={{
        //flex: 1,
        //display: "flex",
        //flexDirection: "row",
        //backgroundColor: "yellow",
        //justifyContent: "space-around",
        //alignItems: "center",
        width: "100%",
      }}
      titleStyle={{
        fontSize: 16,
        color: !expandedAccordion
          ? theme.colors.onSurface
          : theme.colors.primary,
        //backgroundColor: "green",
        //alignItems: "center",
        //width: "80%",
      }}
      expanded={expandedAccordion}
      onPress={() => {
        setExpandedAccordion(!expandedAccordion);
      }}
      onLongPress={() => console.log("Delete Alert")}
      //left={(props) => <Text {...props}>{t("Settings.hotel_name")}</Text>}
      right={(props) => (
        <View
          style={
            {
              //backgroundColor: "red",
              //flexDirection: "row",
              //justifyContent: expandedAccordion ? "space-between" : "flex-end",
              //alignItems: "center",
              //width: 150,
            }
          }
        >
          <List.Icon
            {...props}
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name={!expandedAccordion ? "chevron-down" : "chevron-up"}
                size={size}
                color={
                  !expandedAccordion
                    ? theme.colors.onSurface
                    : theme.colors.primary
                }
              />
            )}
          />
        </View>
      )}
    >
      <List.Item
        title={() => {
          return (
            <ScrollView
              contentContainerStyle={{
                //flex: 1,
                alignItems: "center",
                marginBottom: 15,
                paddingVertical: 15,
                //backgroundColor: "yellow",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  padding: 5,
                  //backgroundColor: "pink",
                }}
              >
                <Text>{t("Settings.server_address")}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "65%",
                    //backgroundColor: "green",
                    //padding: 5,
                  }}
                >
                  <TextInput
                    ref={serverRef}
                    mode="outlined"
                    focused={true}
                    value={serverAddress}
                    label={t("Settings.server_address")}
                    placeholder={t("Settings.server_address")}
                    onChangeText={(value) => {
                      setServerAddress(value);
                      setCheckNetworkColor("grey");
                      setUserToken("");
                    }}
                    style={{ width: "90%" }}
                    autoCapitalize="none"
                    keyboardType="default"
                    keyboardAppearance="dark"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    enablesReturnKeyAutomatically={true}
                    onSubmitEditing={() => loginRef.current?.focus()}
                  />
                  {!networkIsLoading ? (
                    <IconButton
                      disabled={serverAddress ? false : true}
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name="check-network"
                          color={checkNetworkColor}
                          size={30}
                          onPress={checkNetwork}
                        />
                      )}
                    />
                  ) : (
                    /*<IconButton
                      //disabled={serverAddress ? false : true}
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name="loading"
                          color={"green"}
                          size={30}
                        />
                      )}
                    />*/
                    <ActivityIndicator animating={true} />
                  )}
                </View>
              </View>
              {/*<View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //backgroundColor: "yellow",
                  width: "90%",
                  //height: "15%",
                  //marginVertical: 15,
                  padding: 5,
                }}
              >
                <Text>{t("Settings.hotel_name")}</Text>
                <TextInput
                  mode="outlined"
                  //focused={true}
                  value={hotelName}
                  label={t("Settings.hotel_name")}
                  placeholder={t("Settings.hotel_name")}
                  //onChangeText={(value) => setHotelName(value)}
                  style={{ width: "65%" }}
                  editable={false}

                  //onBlur={() => Keyboard.dismiss()}
                  //onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>*/}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  padding: 5,
                }}
              >
                <Text>{t("Settings.login_text")}</Text>
                <TextInput
                  ref={loginRef}
                  mode="outlined"
                  //focused={true}
                  value={name}
                  label={t("Settings.login_input_value")}
                  placeholder={t("Settings.login_placeholder")}
                  onChangeText={(value) => {
                    setName(value);
                    setUserToken("");
                  }}
                  autoCapitalize="none"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  enablesReturnKeyAutomatically={true}
                  style={{ width: "65%" }}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  //onSubmitEditing={() => Keyboard.dismiss()}
                  //onBlur={() => Keyboard.dismiss()}
                  //secureTextEntry
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //backgroundColor: "yellow",
                  width: "90%",
                  //height: "15%",
                  //marginVertical: 5,
                  padding: 5,
                }}
              >
                <Text>{t("Settings.password_text")}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "65%",
                    //backgroundColor: "green",
                    //padding: 5,
                  }}
                >
                  <TextInput
                    ref={passwordRef}
                    mode="outlined"
                    focused={true}
                    value={password}
                    label={t("Settings.password_input_value")}
                    placeholder={t("Settings.password_placeholder")}
                    onChangeText={(value) => {
                      setPassword(value);
                      setUserToken("");
                    }}
                    style={{ width: "90%" }}
                    autoCapitalize="none"
                    keyboardType="default"
                    keyboardAppearance="dark"
                    returnKeyType="done"
                    returnKeyLabel="done"
                    enablesReturnKeyAutomatically={true}
                    //onSubmitEditing={() => loginRef.current?.focus()}
                  />
                  {!tokenIsLoading ? (
                    <IconButton
                      disabled={
                        serverAddress && password && name ? false : true
                      }
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name="account-check"
                          color={checkTokenColor}
                          size={30}
                          onPress={getToken}
                        />
                      )}
                    />
                  ) : (
                    /*<IconButton
                      //disabled={serverAddress ? false : true}
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name="loading"
                          color={"green"}
                          size={30}
                        />
                      )}
                    />*/
                    <ActivityIndicator animating={true} />
                  )}
                </View>

                {/*<TextInput
                  ref={passwordRef}
                  mode="outlined"
                  //focused={true}
                  value={password}
                  label={t("Settings.password_input_value")}
                  placeholder={t("Settings.password_placeholder")}
                  onChangeText={(value) => {
                    setPassword(value);
                    setUserToken("");
                  }}
                  style={{ width: "65%" }}
                  autoCapitalize="none"
                  keyboardType="default"
                  keyboardAppearance="dark"
                  returnKeyType="done"
                  returnKeyLabel="done"
                  enablesReturnKeyAutomatically={true}
                  right={
                    <TextInput.Icon
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          disabled={
                            serverAddress && password && name ? false : true
                          }
                          name="account-check"
                          color={checkTokenColor}
                          size={size}
                        />
                      )}
                      onPress={checkTokenColor}
                    />
                  }
                  //onSubmitEditing={() => Keyboard.dismiss()}
                  //onBlur={() => Keyboard.dismiss()}
                  //secureTextEntry
                />*/}
              </View>

              <TouchableRipple
                onPress={() => setIsHotelDefault(!isHotelDefault)}
              >
                <View style={{ ...styles.preference, width: "90%" }}>
                  <View style={{ width: "60%" }}>
                    <Text
                      style={styles.preferenceTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {t("Settings.defaulthotel")}
                    </Text>
                  </View>

                  <Switch
                    color={theme.colors.primary}
                    value={isHotelDefault}
                    onValueChange={() => setIsHotelDefault(!isHotelDefault)}
                  />
                </View>
              </TouchableRipple>

              <LanguagePicker
                ref={pickerRef}
                lngPickerStyle={styles.lngPickerStyle}
                lngPickerContainerStyle={styles.lngPickerContainerStyle}
                lngPickerViewStyle={styles.lngPickerViewStyle}
                lngPickerTitleViewStyle={styles.lngPickerTitleViewStyle}
                lngPickerTitleStyle={styles.lngPickerTitleStyle}
                lngPickerItemStyle={styles.lngPickerItemStyle}
                pickerTitle={"Settings.select_language"}
              />

              <ScrollView style={{ width: "95%", paddingHorizontal: 5 }}>
                <List.Accordion
                  title={t("Settings.point_of_sale")}
                  //theme={{ colors: theme.colors.onSurface }}
                  titleStyle={{
                    fontSize: 14,
                    //color: !expandedPointOfSaleSection ? theme.colors.onSurface : theme.colors.primary,
                  }}
                  expanded={expandedPointOfSaleSection}
                  onPress={() =>
                    setExpandedPointOfSaleSection(!expandedPointOfSaleSection)
                  }
                  right={(props) => (
                    <List.Icon
                      {...props}
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name={
                            !expandedPointOfSaleSection
                              ? "chevron-down"
                              : "chevron-up"
                          }
                          size={size}
                          color={
                            !expandedPointOfSaleSection
                              ? theme.colors.onSurface
                              : theme.colors.primary
                          }
                        />
                      )}
                    />
                  )}
                >
                  {activePointOfSales.map((item) => (
                    <List.Item
                      title={() => <PointOfSalesItem item={item} />}
                      key={item.Id}
                      contentStyle={{
                        marginVertical: -15,
                      }}
                    />
                  ))}
                </List.Accordion>
                <List.Accordion
                  title={t("Settings.default_folio_pocket")}
                  titleStyle={{ fontSize: 14 }}
                  expanded={expandedFolioPocketsSection}
                  onPress={() =>
                    setExpandedFolioPocketsSection(!expandedFolioPocketsSection)
                  }
                  right={(props) => (
                    <List.Icon
                      {...props}
                      icon={({ color, size }) => (
                        <MaterialCommunityIcons
                          name={
                            !expandedFolioPocketsSection
                              ? "chevron-down"
                              : "chevron-up"
                          }
                          size={size}
                          color={
                            !expandedFolioPocketsSection
                              ? theme.colors.onSurface
                              : theme.colors.primary
                          }
                        />
                      )}
                    />
                  )}
                >
                  {activeFolioPockets.map((item) => (
                    <List.Item
                      title={() => <FolioPocketItem item={item} />}
                      contentStyle={{
                        marginVertical: -15,
                      }}
                      key={item.Id}
                    />
                  ))}
                </List.Accordion>
              </ScrollView>

              {/*
// Вариант с Флатлистами не умещался на маленьком экране, перенос компонентов в ListHeaderComponent - ListFooterCompoment добавил Скролл,
но введение данных в интпуты стало приводить к полной перерисовке компонента, вынос в отдельные компоненты с передачей props не помог
нужно вернуться к поиску решения позже

<View style={{ width: "90%" }}>
  <Text>{t("Settings.point_of_sale")}</Text>
  <FlatList
    data={activePointOfSales}
    renderItem={renderPointOfSaleItem}
    removeClippedSubviews={true}
    //initialNumToRender={15}
    keyExtractor={(item) => item.Id}
    keyboardShouldPersistTaps={"handled"}
    //ListHeaderComponent={() => <HeaderComponent />}
    //ListFooterComponent={() => <FooterComponent />}
    //justifyContent="space-between"
    //contentContainerStyle={{ alignItems: "center" }}
  />
</View>
<View style={{ width: "90%" }}>
  <Text>{t("Settings.default_folio_pocket")}</Text>
  <FlatList
    data={activeFolioPockets}
    renderItem={renderFolioPocketItem}
    removeClippedSubviews={true}
    //initialNumToRender={15}
    keyExtractor={(item) => item.Id}
    keyboardShouldPersistTaps={"handled"}
    //justifyContent="space-between"
  />
</View>*/}

              <View style={{ width: "50%", marginTop: 35 }}>
                <Button
                  loading={settingsIsLoading}
                  mode="contained"
                  onPress={saveSettings}
                  disabled={!userToken ? false : true}
                  //style={{ width: "55%" }}
                >
                  {settingsIsLoading
                    ? `${t("Settings.saving_settings")}`
                    : `${t("Settings.save_settings")}`}
                </Button>
              </View>
            </ScrollView>
          );
        }}
      />
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingVertical: 120,
    paddingHorizontal: 5,
  },
  preferenceTitle: { fontSize: 14 },

  lngPickerContainerStyle: {
    width: "40%",
  },
  lngPickerStyle: {
    width: "90%",
    //backgroundColor: "red",
  },
  lngPickerViewStyle: {
    width: "90%",
  },
  lngPickerTitleViewStyle: {
    width: "60%",
  },
  lngPickerTitleStyle: {
    fontSize: 14,
  },
  lngPickerItemStyle: {
    fontSize: 16,
  },
});

/* 
          {expandedAccordion ? (
            <View
              style={{
                //backgroundColor: "yellow",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "50%",
              }}
            >
              <List.Icon
                {...props}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name={"content-save-outline"}
                    size={size}
                    color={
                      !expandedAccordion
                        ? theme.colors.onSurface
                        : theme.colors.primary
                    }
                  />
                )}
                onPress={saveHotelSettings}
              />
              <List.Icon
                {...props}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name={"delete-circle-outline"}
                    size={size}
                    color={
                      !expandedAccordion
                        ? theme.colors.onSurface
                        : theme.colors.primary
                    }
                  />
                )}
                onPress={() => {
                  console.log(item, hotelData);
                }}
              />
              <IconButton
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name={"delete-circle-outline"}
                    size={size}
                    color={
                      !expandedAccordion
                        ? theme.colors.onSurface
                        : theme.colors.primary
                    }
                  />
                )}
                onPress={() => console.log("test")}
              />
            </View>
          ) : null}
*/
