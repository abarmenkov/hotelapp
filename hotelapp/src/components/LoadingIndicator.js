import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";
import { useTheme } from "react-native-paper";

export const LoadingIndicator = ({ text }) => {
  const theme = useTheme();
  return (
    <Modal transparent={true}>
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" />
        <Text
          style={{ ...styles.indicatorText, color: theme.colors.onBackground }}
        >
          {text}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
