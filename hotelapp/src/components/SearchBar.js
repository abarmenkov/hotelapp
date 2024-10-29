import React, { useRef } from "react";
import { Searchbar, Button, Text } from "react-native-paper";
import { View, Keyboard } from "react-native";
import { WIDTH } from "../utils/constants";
import { useTranslation } from "react-i18next";
import {
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { create } from "../utils/normalize";

export const SearchbarComponent = ({
  searchLoading,
  searchQuery,
  setSearchQuery,
  clicked,
  setClicked,
  setApiSearch,
  updateData,
  setUpdateData,
}) => {
  const searchBarRef = useRef();
  const { t } = useTranslation();
  const route = useRoute();

  return (
    <View style={styles.searchBarContainer}>
      <Searchbar
        ref={searchBarRef}
        loading={searchLoading}
        placeholder={t(`SearchBar.${route.name}`)}
        //placeholderTextColor={"blue"}
        inputStyle={styles.inputStyle}
        //style={{ color: "green", backgroundColor: "yellow", }}
        onChangeText={setSearchQuery}
        //onChangeText={() => setSearchQuery(value)}
        value={searchQuery}
        onClearIconPress={() => {
          if (route.name == "FastPostScreen") {
            setSearchQuery("");
            //setClicked(false);
            //setApiSearch(false);
            //Keyboard.dismiss();
          }
        }}
        //traileringIcon={"skull-crossbones"} //
        //clearIcon={"sword-cross"} // по умолчанию cross, пишем только когда хотим свою иконку
        style={{
          width: clicked ? WIDTH * 0.85 : WIDTH * 0.95,
          //height: 45,
          //alignItems: "center",
        }}
        onFocus={() => setClicked(true)}
        keyboardType="email-address"
        keyboardAppearance="dark"
        returnKeyType={route.name == "FastPostScreen" ? "search" : "done"}
        returnKeyLabel="search"
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={() => {
          if (route.name == "FastPostScreen") {
            if (!searchQuery) {
              console.log("пустой запрос");
            } else {
              setApiSearch(true);
              setUpdateData(!updateData);
            }
          }
        }}
      />
      {clicked && (
        <Button
          mode="text"
          onPress={() => {
            if (route.name == "FastPostScreen") {
              setUpdateData(!updateData);
              setApiSearch(false);
            }
            setSearchQuery("");
            setClicked(false);

            Keyboard.dismiss();
          }}
        >
          {t("SearchBar.Clear")}
        </Button>
      )}
    </View>
  );
};

const styles = create({
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: { fontSize: 18 },
});
