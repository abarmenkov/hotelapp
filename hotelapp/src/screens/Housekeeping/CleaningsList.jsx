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
import { Text, useTheme } from "react-native-paper";
import { reservationsFilter } from "../../utils/reservationsFilter";
import { create } from "../../utils/normalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({ item }) => {
  const theme = useTheme();
  return (
    <View key={item.Id}>
      <Pressable
        style={styles.item}
        onPress={() => {
          Keyboard.dismiss();
          //Alert.alert("Тип уборки: " + item.CleaningType?.Name + item.Tags);
          console.log(item);
        }}
      >
        <View style={styles.roomNumberContainer}>
          <View style={styles.roomNumber}>
            <Text style={styles.title}>{item.Room?.Name}</Text>
          </View>
        </View>

        <View style={styles.guestInfoContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                //style={{ paddingHorizontal: 5 }}
                name="account"
                size={24}
                color={theme.colors.onSurface}
              />
              <Text style={styles.cleaning}>{item.CleaningType?.Name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //flexWrap: "wrap",
                overflow: "hidden",
                //paddingHorizontal: 5,
              }}
            >
              <Text style={styles.guestLayout}>{item.GuestLayout}</Text>
              <Text
                style={styles.guestInfoDetails}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.RoomType?.Name}
              </Text>
            </View>

            {item.BookingTags?.length > 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {item.BookingTags.map((item) => (
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
        </View>
      </Pressable>
    </View>
  );
};

// the filter
export const CleaningsList = ({
  searchQuery,
  setClicked,
  data,
  refreshing,
  setRefreshing,
  updateData,
  setUpdateData,
}) => {
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
        <FlatList
          data={data}
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
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    gap: 5,
    //marginHorizontal: 5,
    //backgroundColor: "purple",
    //paddingHorizontal: 5,
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
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  guestInfoContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
    paddingHorizontal: 5,
  },
  cleaning: {
    fontSize: 18,
    paddingHorizontal: 5,
  },
  guestLayout: {
    fontSize: 16,
    fontWeight: 700,
    paddingHorizontal: 5,
  },
  guestInfoDetails: {
    fontSize: 16,
    fontWeight: 500,
    //color: "red",

    paddingHorizontal: 5,
  },
});
