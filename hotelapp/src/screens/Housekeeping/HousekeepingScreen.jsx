import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const HousekeepingScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Housekeeping</Text>

      <Pressable
        onPress={() =>
          navigation.navigate("CleaningScreen", {
            roomNumber: 106,
            roomDescription: "Одноместный",
          })
        }
      >
        <Text>Housekeeping go to Cleaning</Text>
      </Pressable>
    </View>
  );
};
/*      <Pressable
        onPress={() =>
          navigation.navigate("Reservations", {
            screen: "AddReservationScreen",
            initial: false,
          })
        }
      >*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
