import React, { useState, useRef, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {
  RadioButton,
  Text,
  TouchableRipple,
  Button,
  TextInput,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { postData } from "../API/PostData";
import { appRoutes } from "../API/route";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";
import { saveData } from "../API/asyncStorageMethods";
import { PointOfSalesContext } from "../context/PointOfSalesContext";
import { DefaultPocketCodeContext } from "../context/DefaultPocketCodeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { defaultPointOfSales, setDefaultPointOfSales } =
    useContext(PointOfSalesContext);
  const [pointsOfSales, setPointsOfSales] = useState();
  const [checkedPointOfSales, setPointOfSalesChecked] =
    useState(defaultPointOfSales);

  const [folioPockets, setFolioPockets] = useState([]);
  const { defaultPocketCode, setDefaultPocketCode } = useContext(
    DefaultPocketCodeContext
  );

  const [checkedFolioPocket, setFolioPocketChecked] =
    useState(defaultPocketCode);
  const [settingsIsLoading, setSettingsIsLoading] = useState(false);
  const [hotelName, setHotelName] = useState("Отель");
  const [serverAddress, setServerAddress] = useState(
    "http://109.236.70.42:9090"
  );
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

  const supportedLngs = i18n.services.resourceStore.data;
  const languageKeys = Object.keys(supportedLngs);
  const appLanguage = i18n.language;
  const sortedLanguages = [
    ...languageKeys.filter((item) => item === appLanguage),
    ...languageKeys.filter((item) => item !== appLanguage),
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(appLanguage);

  const handleLanguageChange = (value, index) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };
  const pickerRef = useRef();

  const openPicker = () => pickerRef.current.focus();

  const closePicker = () => pickerRef.current.blur();

  const checkNetworkColor = hasError ? "red" : "green";

  const PointOfSalesItem = ({ item }) => {
    return (
      <TouchableRipple
        onPress={() => {
          setPointOfSalesChecked(item.Id);
          setDefaultPointOfSales(item.Id);
        }}
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
              setPointOfSalesChecked(item.Id);
              setDefaultPointOfSales(item.Id);
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
          setFolioPocketChecked(item.Code);
          setDefaultPocketCode(item.Code);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 5,
          }}
        >
          <Text>{item.Code}</Text>
          <RadioButton
            value={item.Code}
            status={checkedFolioPocket === item.Code ? "checked" : "unchecked"}
            onPress={() => {
              setFolioPocketChecked(item.Code);
              setDefaultPocketCode(item.Code);
            }}
          />
        </View>
      </TouchableRipple>
    );
  };

  const renderPointOfSaleItem = ({ item }) => <PointOfSalesItem item={item} />;
  const renderFolioPocketItem = ({ item }) => <FolioPocketItem item={item} />;

  const saveSettings = () => {
    setSettingsIsLoading(true);
    saveData("@pointofsales", checkedPointOfSales);
    saveData("@defaultpocket", checkedFolioPocket);
    setTimeout(() => setSettingsIsLoading(false), 3000);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>{t("Settings.add_hotel")}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //backgroundColor: "yellow",
          width: "90%",
          //height: "15%",
          marginVertical: 15,
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
          onChangeText={(value) => setHotelName(value)}
          style={{ width: "70%" }}
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
          marginVertical: 15,
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
          onChangeText={(value) => setServerAddress(value)}
          style={{ width: "70%" }}
          //secureTextEntry
          right={
            <TextInput.Icon
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="check-network"
                  color={checkNetworkColor}
                  size={size}
                />
              )}
            />
          }
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          //backgroundColor: "red",
          alignItems: "center",
          width: "90%",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <Text>{t("Settings.select_language")}</Text>

        <View style={styles.container}>
          <Picker
            ref={pickerRef}
            mode="dropdown"
            //mode="dialog"
            selectedValue={selectedLanguage}
            onValueChange={handleLanguageChange}
            style={styles.pickerStyles}
            dropdownIconColor={"red"}
            dropdownIconRippleColor={"yellow"}
            prompt="Выберите язык" // header окна в режиме dialog
          >
            {sortedLanguages.map((item) => (
              <Picker.Item
                key={supportedLngs[item].code}
                label={supportedLngs[item].locale}
                value={item}
                style={{
                  color:
                    appLanguage === supportedLngs[item].code ? "red" : "blue",
                }}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={{ width: "90%", padding: 5, marginVertical: 10 }}>
        <Text>{t("Settings.point_of_sale")}</Text>
        <FlatList
          data={pointsOfSales}
          renderItem={renderPointOfSaleItem}
          removeClippedSubviews={true}
          //initialNumToRender={15}
          keyExtractor={(item) => item.Id}
          keyboardShouldPersistTaps={"handled"}
          //justifyContent="space-between"
          //contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      <View style={{ width: "90%", padding: 5 }}>
        <Text>{t("Settings.default_folio_pocket")}</Text>
        <FlatList
          data={folioPockets}
          renderItem={renderFolioPocketItem}
          removeClippedSubviews={true}
          //initialNumToRender={15}
          keyExtractor={(item) => item.Id}
          keyboardShouldPersistTaps={"handled"}
          //justifyContent="space-between"
        />
      </View>
      <View style={{ width: "25%" }}>
        <Button
          loading={settingsIsLoading}
          mode="contained"
          onPress={saveSettings}
          //style={{ width: "55%" }}
        >
          {settingsIsLoading
            ? `${t("Settings.saving_settings")}`
            : `${t("Settings.save_settings")}`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  pickerStyles: {
    //width: "90%",
    //backgroundColor: "green",
    color: "red",
    width: 200,
    //padding: 15,
  },
});
