import { Dimensions, StyleSheet } from "react-native";
import { create } from "./normalize";
//import { longPressGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";

export const appDarkColors = {
  colors: {
    primary: "rgb(153, 203, 255)",
    onPrimary: "rgb(0, 51, 85)",
    primaryContainer: "rgb(0, 74, 120)",
    onPrimaryContainer: "rgb(207, 229, 255)",
    secondary: "rgb(185, 200, 218)",
    onSecondary: "rgb(36, 50, 64)",
    secondaryContainer: "rgb(58, 72, 87)",
    onSecondaryContainer: "rgb(213, 228, 247)",
    tertiary: "rgb(212, 190, 230)",
    onTertiary: "rgb(57, 42, 73)",
    tertiaryContainer: "rgb(80, 64, 96)",
    onTertiaryContainer: "rgb(240, 219, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(26, 28, 30)",
    onBackground: "rgb(226, 226, 229)",
    surface: "rgb(26, 28, 30)",
    onSurface: "rgb(226, 226, 229)",
    surfaceVariant: "rgb(66, 71, 78)",
    onSurfaceVariant: "rgb(194, 199, 207)",
    outline: "rgb(140, 145, 153)",
    outlineVariant: "rgb(66, 71, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(226, 226, 229)",
    inverseOnSurface: "rgb(47, 48, 51)",
    inversePrimary: "rgb(0, 98, 157)",
    elevation: {
      level0: "transparent",
      level1: "rgb(32, 37, 41)",
      level2: "rgb(36, 42, 48)",
      level3: "rgb(40, 47, 55)",
      level4: "rgb(41, 49, 57)",
      level5: "rgb(44, 53, 62)",
    },
    surfaceDisabled: "rgba(226, 226, 229, 0.12)",
    onSurfaceDisabled: "rgba(226, 226, 229, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

export const appDefaultColors = {
  colors: {
    primary: "rgb(0, 98, 157)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(207, 229, 255)",
    onPrimaryContainer: "rgb(0, 29, 52)",
    secondary: "rgb(82, 96, 112)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(213, 228, 247)",
    onSecondaryContainer: "rgb(14, 29, 42)",
    tertiary: "rgb(105, 87, 121)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(240, 219, 255)",
    onTertiaryContainer: "rgb(35, 21, 51)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 252, 255)",
    onBackground: "rgb(26, 28, 30)",
    surface: "rgb(252, 252, 255)",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(222, 227, 235)",
    onSurfaceVariant: "rgb(66, 71, 78)",
    outline: "rgb(114, 119, 127)",
    outlineVariant: "rgb(194, 199, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(241, 240, 244)",
    inversePrimary: "rgb(153, 203, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 247)",
      level3: "rgb(224, 235, 244)",
      level4: "rgb(222, 234, 243)",
      level5: "rgb(217, 230, 241)",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

export const WIDTH = Dimensions.get("window").width;

export const AppStyles = create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "700",
  },
  button: {
    width: WIDTH * 0.8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  profilePressable: {
    width: WIDTH * 0.9,
    height: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  itemInfo: {
    fontSize: 16,
    fontWeight: "400",
  },
  infoModal: {
    width: WIDTH * 0.7,
    padding: 20,
    alignSelf: "center",
    borderRadius: 12,
  },
  codeInput: {
    height: 64,
    width: 64,
    borderRadius: 12,
    marginHorizontal: 12,
    textAlign: "center",
  },
  //DrawerContent styles

  drawerHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerLabelIcon: {
    fontSize: 24,
  },
  drawerLabel: {
    fontSize: 18,
  },

  //LanguagePicker styles
  lngPickerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //paddingHorizontal: 5,
  },
  lngPickerTitle: { fontSize: 16 },
  lngPickerTitleView: {},
  lngPickerContainer: {
    alignItems: "flex-end",
    //marginVertical: 5,
  },
  lngPicker: {
    fontSize: 14,
  },
  lngPickerItem: {
    fontSize: 16,
  },
});
