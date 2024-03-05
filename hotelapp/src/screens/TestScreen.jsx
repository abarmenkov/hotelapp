import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const TestScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hotel App</Text>

      <Pressable onPress={() => Alert.alert('pressed')}>
        <Text>Login Successfull</Text>
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
