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
import { useNavigation } from "@react-navigation/native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ room, roomType, id }) => {
  //const { room, roomType, id } = props;
  const navigation = useNavigation();
  return (
    <View key={id}>
      
      <Pressable
        style={styles.item}
        onPress={() => {
          Keyboard.dismiss();
          Alert.alert("Pressed " + id);
        }}
      >
        <Text style={styles.title}>{room.Name}</Text>
        <Text style={styles.details}>{roomType.Name}</Text>
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
    // when no input, show all
    if (searchQuery === "") {
      return <Item room={item.Room} roomType={item.RoomType} id={item.Id} />;
    }
    // filter of the name
    if (
      item.Room.Name.toUpperCase().includes(
        searchQuery.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return <Item room={item.Room} roomType={item.RoomType} id={item.Id} />;
    }
    // filter of the description
    if (
      item.RoomType.Name.toUpperCase().includes(
        searchQuery.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return <Item room={item.Room} roomType={item.RoomType} id={item.Id} />;
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
    alignItems:'center'
  },
  title: {
    //width: "100%",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    //marginLeft: "10%",
  },
});
