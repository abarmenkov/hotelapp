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
import { reservationsFilter } from "../utils/reservationsFilter";

const Item = ({ item }) => {
  return (
    <View key={item.Id}>
      <Pressable
        style={styles.item}
        onPress={() => {
          Keyboard.dismiss();
          Alert.alert("Тип уборки: " + item.CleaningType?.Name);
        }}
      >
        <Text style={styles.title}>{item.Room.Name}</Text>
        <Text style={styles.details}>{item.RoomType.Name}</Text>
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

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    alignItems: "center",
  },
  title: {
    //width: "100%",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    //marginLeft: "10%",
  },
});
