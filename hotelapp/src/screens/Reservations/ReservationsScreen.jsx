import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const ReservationsScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Reservations</Text>

      <Pressable onPress={() => Alert.alert("pressed")}>
        <Text>Reservations</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("AddReservation")}>
        <Text>Add Reservation</Text>
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
