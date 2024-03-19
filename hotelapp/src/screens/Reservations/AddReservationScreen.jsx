import React, { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AddReservationScreen = () => {
  const navigation = useNavigation();
  //чтобы убрать хедер в drawer при открытии вложенной в stack страницы(оставить хедер страницы с back)
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Add Reservation</Text>

      <Pressable onPress={() => Alert.alert("Reservation added")}>
        <Text>Add new Reservation</Text>
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
