import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Headline, Caption, useTheme } from "react-native-paper";
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
//import MyButton from "../components/MyButton";
//import { WIDTH, AppStyles } from "../utils/Constants";
//import LoadingAnimation from "../components/LoadingAnimation";

export const StartingScreen = ({ route, navigation }) => {
  //const theme = useTheme();
  //const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Headline style={{ ...styles.headline, color: "red" }}>
        Hotel App
      </Headline>
      <Caption style={styles.caption}>Run and manage your hotel</Caption>
      <Pressable onPress={() => navigation.navigate("RootStack")}>
        <Text>Move to Appscreen</Text>
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
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
  },
  caption: {
    color: "#AEA8B3",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 72,
    paddingVertical: 12,
    textAlign: "center",
  },
});
