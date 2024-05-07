import React from "react";
import { View, Modal } from "react-native";
import { useTheme, ActivityIndicator, Text } from "react-native-paper";
import { create } from "../utils/normalize";

export const LoadingIndicator = ({ text }) => {
  const theme = useTheme();
  return (
    <Modal transparent={true}>
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" />
        <Text style={styles.indicatorText}>{text}</Text>
      </View>
    </Modal>
  );
};

const styles = create({
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: "700",
  },
});
