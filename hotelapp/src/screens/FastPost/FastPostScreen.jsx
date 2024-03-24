import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const FastPostScreen = ({ route, navigation }) => {
  //const routeName = getFocusedRouteNameFromRoute(route) ?? "Reservations";
  //const stateName = navigation.state.routeName;
  //
  //console.log(routeName);
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
