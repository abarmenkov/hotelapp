import React, { useRef } from "react";
import { Searchbar, Button, Text } from "react-native-paper";
import { View, Keyboard } from "react-native";
import { WIDTH } from "../utils/constants";
import { useTranslation } from "react-i18next";
import {
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

export const SearchbarComponent = ({
  searchLoading,
  searchQuery,
  setSearchQuery,
  clicked,
  setClicked,
}) => {
  const searchBarRef = useRef();
  const { t } = useTranslation();
  const route = useRoute();
  //const routeName = getFocusedRouteNameFromRoute(route) ?? "Test2";
  //console.log(routeName);
  return (
    <View
      style={{
        width: WIDTH * 0.9,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //marginLeft: 50,
      }}
    >
      <Searchbar
        ref={searchBarRef}
        loading={searchLoading}
        placeholder={t(`SearchBar.${route.name}`)}
        //inputStyle={{ paddingHorizontal: 1 }}
        onChangeText={setSearchQuery}
        value={searchQuery}
        //onClearIconPress={() => searchBarRef.blur(...args)}
        //traileringIcon={"skull-crossbones"} //
        //clearIcon={"sword-cross"} // по умолчанию cross, пишем только когда хотим свою иконку
        //style={{ width: clicked ? "80%" : WIDTH * 0.9 }}
        onFocus={() => setClicked(true)}
        keyboardType="email-address"
        keyboardAppearance="dark"
        returnKeyType="next"
        returnKeyLabel="next"
        //onSubmitEditing={() => Keyboard.dismiss()}
      />
      {clicked && (
        <Button
          mode="text"
          onPress={() => {
            setSearchQuery("");
            setClicked(false);
            Keyboard.dismiss();
          }}
        >
          Clear
        </Button>
      )}
    </View>
  );
};
