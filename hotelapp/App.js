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
import { getData } from "./src/API/asyncStorageMethods";

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
    userName: "testman",
    userPassword: "tester",
  });
  const [defaultPocketCode, setDefaultPocketCode] = useState("ГОСТЬ");

  const [defaultPointOfSales, setDefaultPointOfSales] = useState(0);

  const [userIsLoading, setUserIsLoading] = useState(false);
  const [themeIsLoading, setThemeIsLoading] = useState(false);
  const [pointOfSaleIsLoading, setPointOfSaleIsLoading] = useState(false);
  const [pocketIsLoading, setPocketIsLoading] = useState(false);

  const { t } = useTranslation();
  //useEffect(() => clearStorage(),[]);
  useEffect(() => {
    //clearStorage();
    setUserIsLoading(true);

    getData("@user", setUser, { userName: "testman", userPassword: "tester" });

    setTimeout(() => setUserIsLoading(false), 3000);
  }, []);

  useEffect(() => {
    setThemeIsLoading(true);
    getData("@theme", setIsThemeDark, false);
    setThemeIsLoading(false);
  }, []);

  useEffect(() => {
    setPointOfSaleIsLoading(true);
    getData("@pointofsales", setDefaultPointOfSales, 0);
    setPointOfSaleIsLoading(false);
  }, []);

  useEffect(() => {
    setPocketIsLoading(true);
    getData("@defaultpocket", setDefaultPocketCode, "ГОСТЬ");
    setPocketIsLoading(false);
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

  const defaultPocket = useMemo(
    () => ({ defaultPocketCode, setDefaultPocketCode }),
    [defaultPocketCode]
  );

  const defaultPointOfSale = useMemo(
    () => ({ defaultPointOfSales, setDefaultPointOfSales }),
    [defaultPointOfSales]
  );

  const savedUser = useMemo(() => ({ user, setUser }), [user]);

  //console.log("user1:", user);
  /*if (dataIsLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color="green"/>
      </View>
    );
  }*/
  if (
    userIsLoading ||
    pocketIsLoading ||
    themeIsLoading ||
    pointOfSaleIsLoading
  ) {
    return <LoadingIndicator text={t("Loading.loading")} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" color="red" />}>
        <PreferencesContext.Provider value={preferences}>
          <UserContext.Provider value={savedUser}>
            <DefaultPocketCodeContext.Provider value={defaultPocket}>
              <PointOfSalesContext.Provider value={defaultPointOfSale}>
                <PaperProvider theme={theme}>
                  <I18nextProvider i18n={i18next}>
                    <SafeAreaProvider>
                      <StartingStack />
                    </SafeAreaProvider>
                  </I18nextProvider>
                </PaperProvider>
              </PointOfSalesContext.Provider>
            </DefaultPocketCodeContext.Provider>
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
