import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export const AddServiceTaskScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Fast Post</Text>

      <Pressable onPress={() => Alert.alert("pressed")}>
        <Text>Fast Post</Text>
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
