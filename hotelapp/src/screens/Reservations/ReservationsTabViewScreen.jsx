import React, { useState, useEffect } from "react";
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
  const layout = useWindowDimensions();

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

  //при возврате на страницу сбрасываем данные фильтра
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchQuery("");
      setClicked(false);
      setErrorFlag(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  useEffect(() => {
    const ArrivalDateTo = new Date();
    setSearchQuery("");
    setClicked(false);
    setErrorFlag(false);
    setItems([]);
    const controller = new AbortController();
    const configurationObject = {
      method: "post",
      url: `${baseUrl}${endPoint}`,
      signal: controller.signal,
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

    return () => controller.abort("Data fetching cancelled");
  }, [updateData, index]);

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
      style={{ marginTop: 10, backgroundColor: "red" }}
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
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            lazy
          />
        )}

        {!isLoading && hasError && <Text>{t("Loading.error")}</Text>}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    //justifyContent: "center",
  },
});

/*const renderScene = ({ route }) => {
    switch (route.key) {
      case "arrivals":
        return (
          <ArrivalList
            searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        );
      case "inhouse":
        return (
          <InHouseList
            searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        );
      case "departures":
        return (
          <DeparturesList
            searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        );
      case "all":
        return (
          <AllReservationsList
            searchQuery={searchQuery}
            data={items}
            setClicked={setClicked}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        );
      default:
        return null;
    }
  };*/
