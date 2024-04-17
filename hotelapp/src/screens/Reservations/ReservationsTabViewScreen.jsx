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
import ReservationsList from "./ReservationsList";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";

export const ReservationsTabViewScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [index, setIndex] = useState(0);
  //const layout = useWindowDimensions();

  //чтобы при открытии Drawer, если на странице открыта Keyboard, она закрывалась автоматически
  const isDrawerOpen = useDrawerStatus() === "open";
  if (isDrawerOpen) Keyboard.dismiss();

  const [routes] = useState([
    { key: "arrivals", title: "Arrivals" },
    { key: "inhouse", title: "Inhouse" },
    { key: "departures", title: "Departures" },
    { key: "all", title: "All" },
  ]);

  const endPoint = "Reservation/QuickSearch";

  useFocusEffect(
    useCallback(() => {
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
        url: `${baseUrl}${endPoint}`,
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
    }, [updateData, index])
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "arrivals":
      case "inhouse":
      case "departures":
      case "all":
        return (
          <ReservationsList
            searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
            routeKey={route.key}
            isLoading={isLoading}
            hasError={hasError}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"white"}
      inactiveColor={"black"}
      //style={{  }}
      contentContainerStyle={{
        backgroundColor: "orange",
        justifyContent: "space-evenly",
      }}
      tabStyle={{ width: "auto" }}
      getLabelText={({ route }) =>
        t(`ReservationsTabViewScreen.${route.title}`)
      }
    />
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <SafeAreaView style={styles.root}>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <SearchbarComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLoading={searchLoading}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>

        {isLoading ? (
          <LoadingIndicator text={t("Loading.loading")} />
        ) : (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: WIDTH }}
            //style={{ backgroundColor: "red" }}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            animationEnabled={true}
            //lazy
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
  },
});
