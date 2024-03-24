import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SearchbarComponent } from "../../components/SearchBar";
//import { NavigationState } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";

export const HousekeepingScreen = ({ navigation }) => {
  //const { navigation } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  //console.log(props);
  //console.log(useRoute());

  return (
    <View style={styles.container}>
      <SearchbarComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchLoading={searchLoading}
        clicked={clicked}
        setClicked={setClicked}
      />
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
