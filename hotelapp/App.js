import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ActivityIndicator,
} from "react-native";
import "react-native-gesture-handler";
import { StartingStack } from "./src/navigation/startingStack";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { appDarkColors, appDefaultColors } from "./src/utils/constants";
import { PreferencesContext } from "./src/context/PreferencesContext";
import { name as appName } from "./app.json";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import {
  getData,
  clearStorage,
  getSettings,
} from "./src/API/asyncStorageMethods";
import { LoadingIndicator } from "./src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "./src/context/SettingsContext";
import { uid } from "uid";

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...DefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...DefaultTheme.colors,
    ...appDefaultColors.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...appDarkColors.colors,
  },
};

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(null);
  const initialSettings = {
    isDefaultHotelId: "",
    isLoggedInHotelId: "",
    hotels: [
      {
        hotelName: "New Hotel",
        serverAddress: "",
        defaultPointOfSales: "",
        defaultPocketCode: "",
        user: { userName: "", userPassword: "", token: "" },
        language: "",
        isLoggedIn: false,
        PropertyId: null,
        id: uid(),
      },
    ],
  };
  const [settings, setSettings] = useState(initialSettings);

  const [themeIsLoading, setThemeIsLoading] = useState(false);
  const [settingsIsLoading, setSettingsIsLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    //clearStorage();
    // долго загружается user(причина???), передаю в функцию isLoading, либо здесь по setTimeout
    setSettingsIsLoading(true);
    getSettings(
      "@settings",
      setSettings,
      setSettingsIsLoading,
      initialSettings
    );
    //setTimeout(() => setSettingsIsLoading(false), 5000);
  }, []);

  useEffect(() => {
    setThemeIsLoading(true);
    getData("@theme", setIsThemeDark, false);
    setThemeIsLoading(false);
  }, []);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const savedSettings = useMemo(() => ({ settings, setSettings }), [settings]);

  if (themeIsLoading || settingsIsLoading) {
    return <LoadingIndicator text={t("Loading.loading")} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" color="red" />}>
        <PreferencesContext.Provider value={preferences}>
          <SettingsContext.Provider value={savedSettings}>
            <PaperProvider theme={theme}>
              <I18nextProvider i18n={i18next}>
                <SafeAreaProvider>
                  <StartingStack />
                </SafeAreaProvider>
              </I18nextProvider>
            </PaperProvider>
          </SettingsContext.Provider>
        </PreferencesContext.Provider>
      </Suspense>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent(appName, () => App);
