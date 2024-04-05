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

const ItemPressable = ({ item, routeKey }) => {
  switch (routeKey) {
    case "arrivals":
      return (
        <Pressable
          style={styles.item}
          onPress={() => {
            Keyboard.dismiss();
            Alert.alert("Pressed " + item.GenericNo);
          }}
        >
          <View style={styles.roomNumber}>
            <Text style={styles.title}>{item.RoomNo}</Text>
          </View>
          <View style={styles.reserveInfo}>
            <View style={styles.guestInfo}>
              <Text style={styles.details}>
                {item.MainGuest.LastName} {item.MainGuest.FirstName}
              </Text>
              <Text style={styles.details}>{item.RoomTypeCode}</Text>
            </View>

            <Text style={styles.details}>{item.ArrivalDate}</Text>
          </View>

          <View style={styles.status}>
            <Text style={styles.title}>{item.Status}</Text>
          </View>
        </Pressable>
      );
    case "inhouse":
      return (
        <Pressable
          style={styles.item}
          onPress={() => {
            Keyboard.dismiss();
            Alert.alert("Pressed " + item.GenericNo);
          }}
        >
          <View style={styles.roomNumber}>
            <Text style={styles.title}>{item.RoomNo}</Text>
          </View>
          <Text style={styles.details}>
            {item.MainGuest.LastName} {item.MainGuest.FirstName}
          </Text>
          <Text style={styles.details}>{item.RoomTypeCode}</Text>
          <Text style={styles.title}>{item.Status}</Text>
        </Pressable>
      );
    case "departures":
      return (
        <Pressable
          style={styles.item}
          onPress={() => {
            Keyboard.dismiss();
            Alert.alert("Pressed " + item.GenericNo);
          }}
        >
          <Text style={styles.title}>{item.RoomNo}</Text>
          <Text style={styles.details}>
            {item.MainGuest.LastName} {item.MainGuest.FirstName}
          </Text>
          <Text style={styles.details}>{item.RoomTypeCode}</Text>
          <Text style={styles.title}>{item.Status}</Text>
        </Pressable>
      );
    case "all":
      return (
        <Pressable
          style={styles.item}
          onPress={() => {
            Keyboard.dismiss();
            Alert.alert("Pressed " + item.GenericNo);
          }}
        >
          <Text style={styles.title}>{item.Status}</Text>
          <Text style={styles.details}>
            {item.MainGuest.LastName} {item.MainGuest.FirstName}
          </Text>
          <Text style={styles.details}>{item.ArrivalDate}</Text>
          <Text style={styles.details}>{item.DepartureDate}</Text>
        </Pressable>
      );
    default:
      return null;
  }
};

const Item = ({ item, routeKey }) => {
  return (
    <View key={item.Id}>
      <ItemPressable item={item} routeKey={routeKey} />
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
}) => {
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
    return reservationsFilter(item, searchQuery) ? (
      <Item item={item} routeKey={routeKey} />
    ) : null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list__container: {
    //margin: 10,
    height: "95%",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
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
});

export default React.memo(ReservationsList);
