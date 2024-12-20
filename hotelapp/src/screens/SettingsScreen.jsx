import React, { useState, useRef, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton, Text, TouchableRipple, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { postData } from "../API/PostData";
import { appRoutes } from "../API/route";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";
import { saveData } from "../API/asyncStorageMethods";
import { PointOfSalesContext } from "../context/PointOfSalesContext";

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
    
  //console.log(defaultPointOfSales, checkedPointOfSales);

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
            width: "90%",
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
  const renderItem = ({ item }) => <PointOfSalesItem item={item} />;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("Settings.add_hotel")}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          alignItems: "center",
          width: "90%",
          justifyContent: "space-between",
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

      <View style={{ flex: 1 }}>
        <FlatList
          data={pointsOfSales}
          renderItem={renderItem}
          removeClippedSubviews={true}
          //initialNumToRender={15}
          keyExtractor={(item) => item.Id}
          keyboardShouldPersistTaps={"handled"}
          justifyContent="space-evenly"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          mode="contained"
          onPress={() => saveData("@pointofsales", checkedPointOfSales)}
        >
          Save settings
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  pickerStyles: {
    width: "90%",
    backgroundColor: "green",
    color: "red",
    width: 150,
  },
});
