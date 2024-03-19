import React, { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const CleaningScreen = ({ navigation, route }) => {
  //const navigation = useNavigation();
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
    navigation.setOptions({
      title: route.params?.roomNumber ? route.params.roomNumber : "Some title",
      headerRight: () => <Text>{route.params.roomDescription}</Text>,
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
