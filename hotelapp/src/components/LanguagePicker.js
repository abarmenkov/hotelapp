import React, { useState, useEffect, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useTheme, TouchableRipple, Text } from "react-native-paper";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppStyles } from "../utils/constants";

export const LanguagePicker = forwardRef(
  (
    {
      lngPickerViewStyle,
      lngPickerContainerStyle,
      lngPickerStyle,
      lngPickerItemStyle,
      lngPickerTitleStyle,
      lngPickerTitleViewStyle,
      pickerTitle,
      ...otherProps
    },
    ref
  ) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const supportedLngs = i18n.services.resourceStore.data;
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
    //const pickerRef = useRef();

    const openPicker = () => ref.current.focus();

    const closePicker = () => ref.current.blur();

    return (
      <TouchableRipple onPress={() => openPicker()}>
        <View
          style={{
            ...AppStyles.lngPickerView,
            ...lngPickerViewStyle,
          }}
        >
          <View
            style={{
              ...AppStyles.lngPickerTitleView,
              ...lngPickerTitleViewStyle,
            }}
          >
            <Text
              style={{
                ...AppStyles.lngPickerTitle,
                ...lngPickerTitleStyle,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t(pickerTitle)}
            </Text>
          </View>

          <View
            style={{
              ...AppStyles.lngPickerContainer,
              ...lngPickerContainerStyle,
            }}
          >
            <Picker
              ref={ref}
              mode="dropdown"
              //mode="dialog"

              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              style={{ ...AppStyles.lngPicker, ...lngPickerStyle }}
              dropdownIconColor={theme.colors.primary}
              dropdownIconRippleColor={"yellow"}
              prompt="Выберите язык" // header окна в режиме dialog
            >
              {sortedLanguages.map((item) => (
                <Picker.Item
                  key={supportedLngs[item].code}
                  label={supportedLngs[item].locale}
                  value={item}
                  style={{
                    ...AppStyles.lngPickerItem,
                    ...lngPickerItemStyle,
                    color:
                      appLanguage === supportedLngs[item].code
                        ? theme.colors.primary
                        : "black",
                  }}
                />
              ))}
            </Picker>
          </View>
        </View>
      </TouchableRipple>
    );
  }
);
