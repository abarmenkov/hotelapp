import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ room, roomType }) => (
  <View>
    <Pressable
      style={styles.item}
      onPress={() => {
        Keyboard.dismiss();
        Alert.alert(`Pressed: room ${room.Name}`);
      }}
    >
      <Text style={styles.title}>{room.Name}</Text>
      <Text style={styles.details}>{roomType.Name}</Text>
    </Pressable>
  </View>
);

// the filter
export const CleaningsList = ({ searchQuery, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchQuery === "") {
      return <Item room={item.Room} roomType={item.RoomType} />;
    }
    // filter of the name
    if (
      item.Room.Name.toUpperCase().includes(
        searchQuery.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return <Item room={item.Room} roomType={item.RoomType} />;
    }
    // filter of the description
    if (
      item.RoomType.Name.toUpperCase().includes(
        searchQuery.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return <Item room={item.Room} roomType={item.RoomType} />;
    }
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
          keyExtractor={(item) => item.Id}
          keyboardShouldPersistTaps={"handled"}// чтобы скрыть открытую клавиатуру и отработать onPress элемента
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
