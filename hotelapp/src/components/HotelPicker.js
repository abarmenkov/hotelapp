import React, { useState, useEffect, forwardRef } from "react";
//import { useTranslation } from "react-i18next";
import { useTheme, TouchableRipple, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppStyles } from "../utils/constants";

export const HotelPicker = forwardRef(
  (
    {
      lngPickerContainerStyle,
      lngPickerStyle,
      lngPickerItemStyle,
      pickerLabel,
      activeHotelId,
      setActiveHotelId,
      hotels,
      ...otherProps
    },
    ref
  ) => {
    const theme = useTheme();
    //const { t, i18n } = useTranslation();

    /*const supportedLngs = i18n.services.resourceStore.data;
    const languageKeys = Object.keys(supportedLngs);
    const appLanguage = i18n.language;
    const sortedLanguages = [
      ...languageKeys.filter((item) => item === appLanguage),
      ...languageKeys.filter((item) => item !== appLanguage),
    ];
    const [selectedLanguage, setSelectedLanguage] = useState(appLanguage);
    const handleLanguageChange = (value, index) => {
      setSelectedLanguage(value);
      i18n.changeLanguage(value);
    };
    useEffect(() => setSelectedLanguage(appLanguage), [i18n.language]);
*/

    const defaultHotelName = hotels.find(
      (item) => item.id === activeHotelId
    ).hotelName;
    const [selectedHotel, setSelectedHotel] = useState(defaultHotelName);
    const [selectedHotelId, setSelectedHotelId] = useState(activeHotelId);
    const [isFocused, setIsFocused] = useState(false);

    const sortedHotels = [
      ...hotels.filter((item) => item.id === selectedHotelId),
      ...hotels.filter((item) => item.id !== selectedHotelId),
    ];

    const handleHotelChange = (value, index) => {
      setSelectedHotel(value.hotelName);
      setSelectedHotelId(value.id);
      setActiveHotelId(value.id);
      //i18n.changeLanguage(value);
    };

    //const pickerRef = useRef();

    const openPicker = () => ref.current.focus();

    const closePicker = () => ref.current.blur();
    const renderLabel = () => (
      <Text
        style={[
          styles.label,
          isFocused
            ? { color: theme.colors.primary }
            : {
                color: theme.colors.outline,
              },
          ,
          { backgroundColor: theme.colors.onSecondary },
        ]}
      >
        {pickerLabel}
      </Text>
    );

    return (
      <TouchableRipple onPress={() => openPicker()}>
        <View
          style={[
            //AppStyles.lngPickerContainer,
            lngPickerContainerStyle,
            isFocused
              ? { borderWidth: 2, borderColor: theme.colors.primary }
              : {
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                },
            { backgroundColor: theme.colors.onSecondary },
          ]}
        >
          {renderLabel()}
          <Picker
            ref={ref}
            mode="dropdown"
            //mode="dialog"

            selectedValue={selectedHotel}
            onValueChange={handleHotelChange}
            style={{
              ...AppStyles.lngPicker,
              ...lngPickerStyle,
              color: theme.colors.onSurface,
              //backgroundColor: "yellow",
              //borderBottom: 5,
            }}
            dropdownIconColor={theme.colors.primary}
            dropdownIconRippleColor={"yellow"}
            prompt="Выберите отель" // header окна в режиме dialog
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {sortedHotels.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.hotelName}
                value={item}
                style={{
                  ...AppStyles.lngPickerItem,
                  ...lngPickerItemStyle,
                  color:
                    item.id === selectedHotelId
                      ? theme.colors.primary
                      : theme.colors.onSurface,
                  backgroundColor: theme.colors.onSecondary,
                }}
              />
            ))}
          </Picker>
        </View>
      </TouchableRipple>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    //backgroundColor: "white",
    left: 8,
    top: -9,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 12,
  },
});
