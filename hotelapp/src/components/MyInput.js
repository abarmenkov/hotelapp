import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useTheme, TextInput } from "react-native-paper";
//import { useTranslation } from "react-i18next";
//import { TextInput } from "react-native-paper";

const MyTextInput = forwardRef(
  (
    {
      viewStyle,
      secureIcon,
      secureIconColor,
      onPressSecureIcon,
      ...otherProps
    },
    ref
  ) => {
    //const { t } = useTranslation();
    const theme = useTheme();

    //const { secureTextEntry } = otherProps;
    //console.log(secureTextEntry);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          //borderColor: !touched ? null : error ? theme.colors.error : "green",
          borderWidth: StyleSheet.hairlineWidth,
          ...viewStyle,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="gray"
            ref={ref}
            {...otherProps}
          />
        </View>
        {secureIcon && (
          <View style={{ padding: 8 }}>
            <Icon
              name={secureIcon}
              color={secureIconColor}
              size={22}
              onPress={onPressSecureIcon}
            />
          </View>
        )}
      </View>
    );
  }
);
export default MyTextInput;
