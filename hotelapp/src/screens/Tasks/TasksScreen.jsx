import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SearchbarComponent } from "../../components/SearchBar";
import { useTranslation } from "react-i18next";
//import { CleaningsList } from "./CleaningsList";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { fetchData } from "../../API/FetchData";
import { token, baseUrl } from "../../API/route";
import { useFocusEffect } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { create } from "../../utils/normalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { appRoutes } from "../../API/route";
import { TasksList } from "./TasksList";

export const TasksScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  

  const isDrawerOpen = useDrawerStatus() === "open";
  if (isDrawerOpen) Keyboard.dismiss();

  //const endPoint = "Cleanings";
  const endPoint = "/my";

  //при возврате на страницу сбрасываем данные фильтра
  /*useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchQuery("");
      setClicked(false);
      setErrorFlag(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);*/

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      const newAbortSignal = (timeoutMs) => {
        //const abortController = new AbortController();
        setTimeout(() => controller.abort(), timeoutMs || 0);

        return controller.signal;
      };
      const configurationObject = {
        method: "get",
        //url: `${baseUrl}${endPoint}`,
        url: `${appRoutes.tasksPath()}${endPoint}`,
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
    }, [updateData])
  );
  /*useEffect(() => {
    const controller = new AbortController();
    const configurationObject = {
      method: "get",
      url: `${baseUrl}${endPoint}`,
      signal: controller.signal,
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
      setItems,
      configurationObject,
      setErrorFlag,
      setRefreshing,
      refreshing
    );
    return () => controller.abort("Data fetching cancelled");
  }, [updateData]);*/

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <SafeAreaView style={styles.root}>
        {/*<View style={styles.searchbar_container}>
          <SearchbarComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLoading={searchLoading}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>*/}

        {isLoading ? (
          <LoadingIndicator text={t("Loading.loading")} />
        ) : (
          <TasksList
            searchQuery={searchQuery}
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
    paddingVertical: 5,

    //alignItems: "center",
  },
  /*searchbar_container: {
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    width: "100%",
    //marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },*/
});
