import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const ServicesControlScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Services</Text>

      <Pressable onPress={() => Alert.alert("pressed")}>
        <Text>Services</Text>
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
