import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { SearchbarComponent } from "../../components/SearchBar";
//import { NavigationState } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Cleanings } from "../../utils/data";
import { CleaningsList } from "../../components/CleaningsList";

export const HousekeepingScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchQuery("");
      setClicked(false);
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  // get data from the pi
  /*useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);*/
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <SafeAreaView style={styles.root}>
        {!clicked && <Text style={styles.title}>Housekeeping List</Text>}

        <SearchbarComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchLoading={searchLoading}
          clicked={clicked}
          setClicked={setClicked}
        />
        {!fakeData ? (
          <ActivityIndicator size="large" />
        ) : (
          <CleaningsList
            searchQuery={searchQuery}
            data={Cleanings}
            setClicked={setClicked}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>

    /*<View style={styles.container}>
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
    </View>*/
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
