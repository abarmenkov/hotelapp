import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const HousekeepingScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Housekeeping</Text>

      <Pressable onPress={() => Alert.alert("pressed")}>
        <Text>Housekeeping</Text>
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
