import React, { useState, useRef, useEffect, useContext } from "react";
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
  Portal,
  Snackbar,
  Switch,
  ActivityIndicator,
  useTheme,
  List,
  IconButton,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { postData } from "../API/PostData";
import { appRoutes } from "../API/route";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";
import { saveData } from "../API/asyncStorageMethods";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { SettingsContext } from "../context/SettingsContext";
import { LanguagePicker } from "../components/LanguagePicker";
import { AppStyles, WIDTH } from "../utils/constants";
import { SettingsScreenHotelInfo } from "../components/SettingsScreenHotelInfo";
import { uid } from "uid";

export const SettingsScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [settingsIsLoading, setSettingsIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const [networkCheck, setNetworkCheck] = useState(false);
  const [checkNetworkColor, setCheckNetworkColor] = useState("grey");
  const [networkIsLoading, setNetworkIsLoading] = useState(false);

  const { settings, setSettings } = useContext(SettingsContext);

  const [pointsOfSales, setPointsOfSales] = useState([]);
  const [checkedPointOfSales, setPointOfSalesChecked] = useState(
    settings[0].defaultPointOfSales
  );

  const [folioPockets, setFolioPockets] = useState([]);
  const [checkedFolioPocket, setFolioPocketChecked] = useState(
    settings[0].defaultPocketCode
  );

  const [hotelName, setHotelName] = useState(settings[0].hotelName);
  const [serverAddress, setServerAddress] = useState(settings[0].serverAddress);
  const [isHotelDefault, setIsHotelDefault] = useState(settings[0].isDefault);

  const [name, setName] = useState(settings[0].user.userName);
  const [password, setPassword] = useState(settings[0].user.userPassword);
  const [userToken, setUserToken] = useState(settings[0].user.token);

  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [expandedPointOfSaleSection, setExpandedPointOfSaleSection] =
    useState(false);
  const [expandedFolioPocketsSection, setExpandedFolioPocketsSection] =
    useState(false);

  const newHotel = {
    hotelName: "New Hotel",
    serverAddress: "",
    defaultPointOfSales: "",
    defaultPocketCode: "",
    user: { userName: "", userPassword: "", token: "" },
    language: "",
    isDefault: false,
    PropertyId: null,
    id: uid(),
  };
  const [hotelsArray, setHotelsArray] = useState(settings);
  const addHotel = () => {
    setHotelsArray([
      ...hotelsArray,
      {
        hotelName: "New Hotel",
        serverAddress: "",
        defaultPointOfSales: "",
        defaultPocketCode: "",
        user: { userName: "", userPassword: "", token: "" },
        language: "",
        isDefault: false,
        PropertyId: null,
        id: uid(),
      },
    ]);
  };
  //"http://109.236.70.42:9090"

  //получить данные отеля data[0].Name
  ///Logus.HMS.Entities.Dictionaries.Property

  //получить точки продаж
  useEffect(() => {
    const endPoint = "/Logus.HMS.Entities.Dictionaries.PointOfSale";
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
    };
    fetchData(
      setIsLoading,
      setPointsOfSales,
      configurationObject,
      setErrorFlag,
      setRefreshing,
      refreshing,
      controller
    );
  }, []);
  //загрузка словаря карманов(секций) счета(фолио)
  useEffect(() => {
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
    );

    return () => {
      setErrorFlag(false);
      controller.abort("Data fetching cancelled");
    };
  }, []);

  const activePointOfSales = pointsOfSales.filter(
    (item) => item.IsActive && !item.DeletedDate
  );
  const activeFolioPockets = folioPockets.filter(
    (item) => item.IsActive && !item.DeletedDate
  );

  const pickerRef = useRef();

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
    Keyboard.dismiss();
    setSettingsIsLoading(true);
    //saveData("@pointofsales", checkedPointOfSales);
    setSettings([
      {
        ...settings[0],
        hotelName,
        serverAddress,
        defaultPointOfSales: checkedPointOfSales,
        defaultPocketCode: checkedFolioPocket,
        user: { userName: name, userPassword: password, token: userToken },
        isDefault: isHotelDefault,
      },
    ]);
    saveData("@settings", [
      {
        ...settings[0],
        hotelName,
        serverAddress,
        defaultPointOfSales: checkedPointOfSales,
        defaultPocketCode: checkedFolioPocket,
        user: { userName: name, userPassword: password, token: userToken },
        isDefault: isHotelDefault,
      },
    ]);
    //saveData("@defaultpocket", checkedFolioPocket);
    setTimeout(() => {
      setSettingsIsLoading(false);
      setVisibleSnackBar(true);
    }, 3000);
  };

  const checkNetwork = async () => {
    setNetworkCheck(true);
    Keyboard.dismiss();
    const endPoint = "/api/Account/Ping";
    setNetworkIsLoading(true);
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);
      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      url: `${serverAddress}${endPoint}`,
      //url: appRoutes.dictionariesPath(),
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

  const getToken = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    const endPoint = "/api/Account";

    /*const params = new URLSearchParams();
    params.append("userName", name);
    params.append("password", password);
    console.log(params);*/

    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);
      return controller.signal;
    };

    const configurationObject = {
      method: "get",
      url: "https://api-hms.logus.pro/api/Account",
      //url: `${serverAddress}${endPoint}`,
      signal: newAbortSignal(15000),
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
        /*setTimeout(() => {
          setIsLoading(false);
          setVisibleSnackBar(true);
        }, 3000);*/

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
    }
  };
  /*try {
      const response = await fetch(
        `https://api-hms.logus.pro/api/Account?userName=${name}&password=${password}`
      );
      /*const response = await fetch(
        `${serverAddress}${endPoint}?userName=${name}&password=${password}`
      );
      //console.log(response.status);
      const data = await response.json();
      //console.log(response.data);
      if (response.status === 200) {
        console.log(data.Token);
        setUserToken(data.Token);
        //setCheckNetworkColor("green");
        setTimeout(() => {
          setIsLoading(false);
          setVisibleSnackBar(true);
        }, 3000);

        return;
      } else {
        throw new Error("Failed to get server");
      }
    } catch (error) {
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
  };*/

  const checkTokenColor = userToken ? "green" : "red";

  /*const renderPointOfSaleItem = ({ item }) => <PointOfSalesItem item={item} />;
  const renderFolioPocketItem = ({ item }) => <FolioPocketItem item={item} />;

  const HeaderComponent = () => {
    return (
      <View>
        <Text>{t("Settings.point_of_sale")}</Text>
      </View>
    );
  };*/

  /*const FooterComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", marginBottom: 5 }}>
        <View>
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
        </View>
        <View style={{ width: "45%" }}>
          <Button
            loading={settingsIsLoading}
            mode="contained"
            onPress={saveSettings}
            disabled={userToken ? false : true}
            //style={{ width: "55%" }}
          >
            {settingsIsLoading
              ? `${t("Settings.saving_settings")}`
              : `${t("Settings.save_settings")}`}
          </Button>
        </View>
        <Portal>
          <Snackbar
            visible={visibleSnackBar}
            duration={2000}
            onDismiss={() => {
              setVisibleSnackBar(false);
              setErrorFlag(false);
              setNetworkError(false);
              setNetworkCheck(false);
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </Portal>
      </View>
    );
  };*/

  return (
    <SafeAreaView
      style={{
        flex: 1,
        //width: "90%",
        //justifyContent: "space-between",
        //alignItems: "center",
      }}
    >
      <View
        style={{
          //flex: 1,
          //width: "90%",
          //backgroundColor: "yellow",
          //justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            //flex: 1,
            width: "90%",
            //backgroundColor: "green",
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{t("Settings.hotels")}</Text>
          <IconButton
            icon="plus"
            size={20}
            mode="outlined"
            onPress={() => addHotel()}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          //flex: 1,
          alignItems: "center",
          marginBottom: 15,
          paddingVertical: 15,
          //backgroundColor: "yellow",
        }}
      >
        {hotelsArray.map((item, index) => {
          return (
            <View style={{ width: "95%" }} key={uid()}>
              <SettingsScreenHotelInfo item={item} />
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          //width: "45%",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <View style={{ width: "45%", marginVertical: 25 }}>
          <Button
            loading={settingsIsLoading}
            mode="contained"
            onPress={saveSettings}
            disabled={userToken ? false : true}
            //style={{ width: "55%" }}
          >
            {settingsIsLoading
              ? `${t("Settings.saving_settings")}`
              : `${t("Settings.save_settings")}`}
          </Button>
        </View>
      </View>

      <Portal>
        <Snackbar
          visible={visibleSnackBar}
          duration={2000}
          onDismiss={() => {
            setVisibleSnackBar(false);
            setErrorFlag(false);
            setNetworkError(false);
            setNetworkCheck(false);
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </Portal>
    </SafeAreaView>
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
              //backgroundColor: "yellow",
              width: "90%",
              //height: "15%",
              //marginVertical: 515,
              padding: 5,
            }}
          >
            <Text>{t("Settings.server_address")}</Text>
            <TextInput
              mode="outlined"
              //focused={true}
              value={serverAddress}
              label={t("Settings.server_address")}
              placeholder={t("Settings.server_address")}
              onChangeText={(value) => {
                setServerAddress(value);
                setCheckNetworkColor("grey");
                setUserToken("");
              }}
              style={{ width: "65%" }}
              //onSubmitEditing={() => Keyboard.dismiss()}
              //onBlur={() => Keyboard.dismiss()}
              //secureTextEntry
              right={
                !networkIsLoading ? (
                  <TextInput.Icon
                    disabled={serverAddress ? false : true}
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="check-network"
                        color={checkNetworkColor}
                        size={size}
                        onPress={checkNetwork}
                      />
                    )}
                  />
                ) : (
                  <TextInput.Icon
                    icon={({ color, size }) => (
                      <MaterialCommunityIcons
                        name="loading"
                        color={"green"}
                        size={size}
                      />
                    )}
                  />
                )
              }
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
            <Text>{t("Settings.login_text")}</Text>
            <TextInput
              mode="outlined"
              //focused={true}
              value={name}
              label={t("Settings.login_input_value")}
              placeholder={t("Settings.login_placeholder")}
              onChangeText={(value) => {
                setName(value);
                setUserToken("");
              }}
              style={{ width: "65%" }}
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
            <TextInput
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
                      onPress={getToken}
                    />
                  )}
                />
              }
              //onSubmitEditing={() => Keyboard.dismiss()}
              //onBlur={() => Keyboard.dismiss()}
              //secureTextEntry
            />
          </View>
          <TouchableRipple onPress={() => setIsHotelDefault(!isHotelDefault)}>
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
                      size={24}
                      color={
                        !expandedPointOfSaleSection
                          ? theme.colors.onSurface
                          : theme.colors.primary
                      }
                    />
                  )}
                  //color={"green"}
                  //style={{ color: "green" }}
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
              //rippleColor={"green"}
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
                      size={24}
                      color={
                        !expandedFolioPocketsSection
                          ? theme.colors.onSurface
                          : theme.colors.primary
                      }
                      //color={color}
                    />
                  )}
                  //color={"green"}
                  //style={{ color: "red",textAlign:'center' }}
                />
              )}
              //style={{ width: "90%" }}
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

          
      // Вариант с Флатлистами не умещался на маленьком экране, перенос компонентов в ListHeaderComponent - ListFooterCompoment добавил Скролл,
      //но введение данных в интпуты стало приводить к полной перерисовке компонента, вынос в отдельные компоненты с передачей props не помог
      //нужно вернуться к поиску решения позже
      
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
      </View>
        
*/
