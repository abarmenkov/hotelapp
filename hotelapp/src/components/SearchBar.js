import React, { useRef } from "react";
import { Searchbar, Button } from "react-native-paper";
import { View, Keyboard } from "react-native";
import { WIDTH } from "../utils/constants";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";

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
  return (
    <View
      style={{
        width: WIDTH * 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Searchbar
        ref={searchBarRef}
        loading={searchLoading}
        placeholder={t(`SearchBar.${route.name}`)}
        //placeholder={route.name}
        onChangeText={setSearchQuery}
        value={searchQuery}
        //onClearIconPress={() => searchBarRef.blur(...args)}
        traileringIcon={"skull-crossbones"} //
        clearIcon={"sword-cross"} // по умолчанию cross, пишем только когда хотим свою иконку
        style={{ width: clicked ? "90%" : "100%" }}
        onFocus={() => setClicked(true)}
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
