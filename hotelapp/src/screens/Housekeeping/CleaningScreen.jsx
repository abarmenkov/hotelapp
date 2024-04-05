import React, { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Cleanings } from "../../utils/data";

export const CleaningScreen = ({ navigation, route }) => {
  const filteredData = Cleanings.filter((item) => item.Id === route.params.id);
  //console.log(filteredData);
  //убрать заголовок Drawer
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

  useEffect(() => {
    //const filteredData = Cleanings.filter((item) => item.Id === route.params.id);
    navigation.setOptions({
      title: filteredData[0].Room.Name,
      headerRight: () => <Text>{filteredData[0].RoomType.Name}</Text>,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>CleaniingSCreen</Text>

      <Pressable onPress={() => navigation.navigate("AddServiceTaskScreen")}>
        <Text>Add task</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
