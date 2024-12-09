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
  Dimensions,
  PixelRatio,
} from "react-native";
import { Text } from "react-native-paper";
import { reservationsFilter } from "../../utils/reservationsFilter";
import { compareDate } from "../../utils/compareDates";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";
import { FontAwesome } from "@expo/vector-icons";

import { create } from "../../utils/normalize";
import { useNavigation } from "@react-navigation/native";
import { AddReservationScreen } from "./AddReservationScreen";

const ItemPressable = ({ item }) => {
  const navigation = useNavigation();
  const arrivalDate = formatDate(item.ArrivalDate);
  const departureDate = formatDate(item.DepartureDate);
  const balanceColor = item.LocalCurrencyBalance < 0 ? "green" : "red";
  const balanceBgColor = item.LocalCurrencyBalance < 0 ? "lightgreen" : "pink";

  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        Keyboard.dismiss();
        {
          /*Alert.alert(
          "Pressed Reservation with arrival date = " + item.ArrivalDate
        );*/
        }
        navigation.navigate("Account", { item: item });
        //navigation.navigate("AddReservation", { item: item });

        console.log(item);
      }}
    >
      <View style={styles.roomNumberContainer}>
        <View style={styles.roomNumber}>
          <Text style={styles.title}>{item.RoomNo}</Text>
        </View>
      </View>

      <View style={styles.guestInfoContainer}>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.guestInfoDetails}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.MainGuest?.LastName} {item.MainGuest?.FirstName}{" "}
            {item.MainGuest?.MiddleName}
          </Text>
          <Text
            style={styles.guestInfoDetails}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${arrivalDate.dateHour} ${arrivalDate.dateDay} - ${departureDate.dateHour} ${departureDate.dateDay}`}
          </Text>

          {item.Tags?.length > 0 ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {item.Tags.map((item) => (
                <Text
                  style={{
                    marginRight: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: item.Color,
                  }}
                  key={item.Code}
                >
                  {item.Code}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
        {item.LocalCurrencyBalance !== 0 ? (
          <View style={styles.balanceContainer}>
            <View
              style={{
                ...styles.balance,
                backgroundColor: balanceBgColor,
              }}
            >
              <Text style={{ ...styles.balanceTitle, color: balanceColor }}>
                {item.LocalCurrencyBalance}
              </Text>
              <FontAwesome
                name="rouble"
                size={16}
                color={balanceColor}
                style={{ paddingHorizontal: 5 }}
              />
              <FontAwesome name="money" size={16} color={balanceColor} />
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.statusContainer}>
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
        data.length === 0
          ? []
          : data.filter(
              (item) => item.Status === "RES" && compareDate(item.ArrivalDate)
            );
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
            initialNumToRender={15}
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
const styles = create({
  list__container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    gap: 10,
  },

  roomNumberContainer: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "purple",
  },
  roomNumber: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  guestInfoContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingHorizontal: 10,
  },
  balanceContainer: {
    flex: 1,
    //backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  balance: {
    flexDirection: "row",
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    color: "blue",
  },
  balanceTitle: { fontSize: 16 },
  title: {
    fontSize: 16,
    fontWeight: 600,
    //marginBottom: 5,
    //fontStyle: "italic",
  },
  statusContainer: {
    flex: 1,
    //backgroundColor: "purple",
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
    width: "80%",
  },
  guestInfoDetails: {
    fontSize: 18,
    //color: "red",
  },
});

/*const styles = StyleSheet.create({
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
    width: 70,
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
// ₽*/
export default React.memo(ReservationsList);
