import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { SearchbarComponent } from "../../components/SearchBar";
import { Text } from "react-native-paper";
import { fetchData } from "../../API/FetchData";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/constants";
import { token, baseUrl } from "../../API/route";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { create } from "../../utils/normalize";
import { appRoutes } from "../../API/route";
import FolioList from "./FolioList";

export const FastPostScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [apiSearch, setApiSearch] = useState(false);
  //const layout = useWindowDimensions();
  //console.log(apiSearch);

  //чтобы при открытии Drawer, если на странице открыта Keyboard, она закрывалась автоматически
  const isDrawerOpen = useDrawerStatus() === "open";
  if (isDrawerOpen) Keyboard.dismiss();

  const endPoint = apiSearch ? "/Search" : "/QuickSearch";
  /*useEffect(() => {
      const ArrivalDateTo = new Date();

      const controller = new AbortController();
      ///прервать загрузку если сервер не отвечает
      const newAbortSignal = (timeoutMs) => {
        //const abortController = new AbortController();
        setTimeout(() => controller.abort(), timeoutMs || 0);

        return controller.signal;
      };
      const configurationObject = {
        method: "post",
        //url: `${baseUrl}${endPoint}`,
        url: `${appRoutes.reservationPath()}${endPoint}`,
        signal: newAbortSignal(5000),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Statuses: [{ Code: "IN" }, { Code: "RES" }],
          ArrivalDateTo: ArrivalDateTo.toDateString(),
          //DepartureDateTo: "2024-04-04T12:00:00+03:00",
        }),
      };

      fetchData(
        setIsLoading,
        setItems,
        configurationObject,
        setErrorFlag,
        setRefreshing,
        refreshing,
        controller
      );

      return () => {
        setSearchQuery("");
        setClicked(false);
        setErrorFlag(false);
        setItems([]);

        controller.abort("Data fetching cancelled");
      };
    }, [apiSearch]);*/

  useFocusEffect(
    useCallback(() => {
      const ArrivalDateTo = new Date();
      
      const search = !isNaN(searchQuery)
        ? searchQuery
        : encodeURIComponent(searchQuery);

      const controller = new AbortController();
      ///прервать загрузку если сервер не отвечает
      const newAbortSignal = (timeoutMs) => {
        //const abortController = new AbortController();
        setTimeout(() => controller.abort(), timeoutMs || 0);

        return controller.signal;
      };
      const configurationObject =
        apiSearch && searchQuery
          ? {
              method: "get",
              url: `${appRoutes.folioPath()}${endPoint}?filter.query=${search}`,
              signal: newAbortSignal(5000),
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
            }
          : {
              method: "post",
              url: `${appRoutes.reservationPath()}${endPoint}`,
              signal: newAbortSignal(5000),
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                Statuses: [{ Code: "IN" }, { Code: "RES" }],
                ArrivalDateTo: ArrivalDateTo.toDateString(),
                //DepartureDateTo: "2024-04-04T12:00:00+03:00",
              }),
            };

      fetchData(
        setIsLoading,
        setItems,
        configurationObject,
        setErrorFlag,
        setRefreshing,
        refreshing,
        controller
      );

      return () => {
        /*if (!apiSearch) {
          setSearchQuery("");
        }*/

        setClicked(false);
        setErrorFlag(false);
        setItems([]);
        //setApiSearch(false);

        controller.abort("Data fetching cancelled");
      };
    }, [updateData])
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <SafeAreaView style={styles.root}>
        <View style={styles.searchbar_container}>
          <SearchbarComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLoading={searchLoading}
            clicked={clicked}
            setClicked={setClicked}
            setApiSearch={setApiSearch}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        </View>

        {isLoading ? (
          <LoadingIndicator text={t("Loading.loading")} />
        ) : (
          <FolioList
            //searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
            isLoading={isLoading}
            hasError={hasError}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = create({
  root: {
    flex: 1,
    //alignItems: "center",
    //marginVertical: 20,
  },
  tabBarLabel: {
    fontSize: 16,
  },
  searchbar_container: {
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
});
