import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
  Keyboard,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-paper";
import { reservationsFilter } from "../../utils/reservationsFilter";
import { compareDate } from "../../utils/compareDates";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";

const ItemPressable = ({ item }) => {
  const arrivalDate = formatDate(item.ArrivalDate);
  const departureDate = formatDate(item.DepartureDate);
  
  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        Keyboard.dismiss();
        Alert.alert("Pressed Reservation with arrival date = " + item.ArrivalDate);
      }}
    >
      <View>
        <View style={styles.roomNumber}>
          <Text style={styles.title}>{item.RoomNo}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: WIDTH * 0.6,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
            {item.MainGuest?.LastName} {item.MainGuest?.FirstName}{" "}
            {item.MainGuest?.MiddleName}
          </Text>
          <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
            {arrivalDate.dateHour} {arrivalDate.dateDay}
          </Text>
          <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
            {departureDate.dateHour} {departureDate.dateDay}
          </Text>
        </View>
        {item.LocalCurrencyBalance !== 0 ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "green",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.balance}>{item.LocalCurrencyBalance}</Text>
          </View>
        ) : null}
      </View>

      <View>
        <View style={styles.status}>
          <Text style={styles.title}>{item.Status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const Item = ({ item }) => {
  return (
    <View key={item.Id}>
      <ItemPressable item={item} />
    </View>
  );
};

const ReservationsList = ({
  searchQuery,
  setClicked,
  data,
  refreshing,
  setRefreshing,
  updateData,
  setUpdateData,
  routeKey,
  isLoading,
  hasError,
}) => {
  const { t } = useTranslation();
  let filteredData;

  switch (routeKey) {
    case "arrivals": {
      filteredData =
        data.length === 0 ? [] : data.filter((item) => item.Status === "RES");
      break;
    }
    case "inhouse": {
      filteredData =
        data.length === 0 ? [] : data.filter((item) => item.Status === "IN");
      break;
    }
    case "departures": {
      filteredData =
        data.length === 0
          ? []
          : data.filter(
              (item) => item.Status === "IN" && compareDate(item.DepartureDate)
            );
      break;
    }
    case "all": {
      filteredData = data.length === 0 ? [] : data;

      break;
    }
    default: {
      filteredData = [];
    }
  }

  const renderItem = ({ item }) => {
    return reservationsFilter(item, searchQuery) ? <Item item={item} /> : null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        {!isLoading && hasError ? (
          <Text
            style={{ marginVertical: 30, alignSelf: "center" }}
            onPress={() => {
              setUpdateData(!updateData);
            }}
          >
            {t("Loading.error")}
          </Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            removeClippedSubviews={true}
            keyExtractor={(item) => item.Id}
            keyboardShouldPersistTaps={"handled"} // чтобы скрыть открытую клавиатуру и отработать onPress элемента
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setUpdateData(!updateData);
                  setRefreshing(true);
                }}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list__container: {
    //margin: 10,
    height: "95%",
    //width: WIDTH * 0.8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  roomNumber: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    backgroundColor: "grey",
    width: 60,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  guestInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reserveInfo: {
    width: "60%",
  },
  details: {
    //color: "red",
  },
});

export default React.memo(ReservationsList);
