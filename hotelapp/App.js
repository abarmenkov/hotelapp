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
import { UserContext } from "./src/context/UserContext";

import { name as appName } from "./app.json";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "./i18n";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { clearStorage } from "./src/API/asyncStorageMethods";
import { LoadingIndicator } from "./src/components/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { DefaultPocketCodeContext } from "./src/context/DefaultPocketCodeContext";
import { PointOfSalesContext } from "./src/context/PointOfSalesContext";
import { getData, getUser } from "./src/API/asyncStorageMethods";
import { SettingsContext } from "./src/context/SettingsContext";

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
  //const [language, setLanguage] = useState(null);
  const [user, setUser] = useState({
    userName: "test",
    userPassword: "tester",
  });

  //заменил отдельные контексты одним settings
  /*const [defaultPocketCode, setDefaultPocketCode] = useState("");
  const [defaultPointOfSales, setDefaultPointOfSales] = useState(0);
  const [pointOfSaleIsLoading, setPointOfSaleIsLoading] = useState(false);
  const [pocketIsLoading, setPocketIsLoading] = useState(false);
  useEffect(() => {
    setPointOfSaleIsLoading(true);
    getData("@pointofsales", setDefaultPointOfSales, 0);
    setPointOfSaleIsLoading(false);
  }, []);

  useEffect(() => {
    setPocketIsLoading(true);
    getData("@defaultpocket", setDefaultPocketCode, "");
    setPocketIsLoading(false);
  }, []);
    const defaultPocket = useMemo(
    () => ({ defaultPocketCode, setDefaultPocketCode }),
    [defaultPocketCode]
  );

  const defaultPointOfSale = useMemo(
    () => ({ defaultPointOfSales, setDefaultPointOfSales }),
    [defaultPointOfSales]
  );
  */

  const [settings, setSettings] = useState([
    {
      hotelName: "",
      serverAddress: "",
      defaultPointOfSales: "",
      defaultPocketCode: "",
      user: { userName: "", userPassword: "" },
      language: "",
    },
  ]);

  const [userIsLoading, setUserIsLoading] = useState(false);
  const [themeIsLoading, setThemeIsLoading] = useState(false);
  const [settingsIsLoading, setSettingsIsLoading] = useState(false);

  const { t } = useTranslation();
  //useEffect(() => clearStorage(),[]);

  useEffect(() => {
    setSettingsIsLoading(true);
    getData("@settings", setSettings, [
      {
        hotelName: "",
        serverAddress: "",
        defaultPointOfSales: "",
        defaultPocketCode: "",
        user: { userName: "", userPassword: "" },
        language: "",
      },
    ]);
    setSettingsIsLoading(false);
  }, []);

  useEffect(() => {
    //clearStorage();
    setUserIsLoading(true);
    getUser("@user", setUser, setUserIsLoading, {
      userName: "testman",
      userPassword: "tester",
    });
    /*getData("@user", setUser, { userName: "testman", userPassword: "tester" });

    setTimeout(() => setUserIsLoading(false), 3000);*/
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

  const savedUser = useMemo(() => ({ user, setUser }), [user]);

  if (userIsLoading || themeIsLoading || settingsIsLoading) {
    return <LoadingIndicator text={t("Loading.loading")} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" color="red" />}>
        <PreferencesContext.Provider value={preferences}>
          <UserContext.Provider value={savedUser}>
            <SettingsContext.Provider value={savedSettings}>
              <PaperProvider theme={theme}>
                <I18nextProvider i18n={i18next}>
                  <SafeAreaProvider>
                    <StartingStack />
                  </SafeAreaProvider>
                </I18nextProvider>
              </PaperProvider>
            </SettingsContext.Provider>
          </UserContext.Provider>
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
