import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FAB, Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchbarComponent } from "../../components/SearchBar";
import { useDrawerStatus } from "@react-navigation/drawer";

export const ReservationsScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isDrawerOpen = useDrawerStatus() === "open";
  if (isDrawerOpen) Keyboard.dismiss();
  //console.log(navigation.dangerouslyGetState());
  //console.log(navigation.state);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setClicked(false);
      }}
    >
      <View style={styles.container}>
        <SearchbarComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchLoading={searchLoading}
          clicked={clicked}
          setClicked={setClicked}
        />

        <Text variant="displayLarge">Reservations</Text>
        <Text variant="headlineLarge">Reservations</Text>
        <Text variant="titleLarge">Reservations</Text>
        <Text variant="labelLarge">Reservations</Text>
        <Text variant="bodyLarge">Reservations</Text>

        <Button
          mode="contained"
          onPress={() => setSearchLoading(!searchLoading)}
        >
          Add Reservation +
        </Button>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("AddReservation")}
        >
          Add Reservation +
        </Button>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 50,
    right: 0,
    bottom: 50,
  },
});
