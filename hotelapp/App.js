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
    userPassword: "testpassword",
  });
  const [defaultPocketCode, setDefaultPocketCode] = useState("ГОСТЬ");

  const [userIsLoading, setUserIsLoading] = useState(false);
  const [themeIsLoading, setThemeIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setUserIsLoading(true);
    const getTheme = async () => {
      const value = await AsyncStorage.getItem("@theme");
      setIsThemeDark(JSON.parse(value));
    };
    getTheme();
    setUserIsLoading(false);
  }, []);

  useEffect(() => {
    //clearStorage();
    setUserIsLoading(true);
    const getUser = async () => {
      const value = await AsyncStorage.getItem("@user");
      //console.log(JSON.parse(value));
      if (value) {
        //console.log(value);
        setUser(JSON.parse(value));
        setTimeout(() => setUserIsLoading(false), 3000);
        //console.log("value ok");
      } else {
        setUser({ userName: "test", userPassword: "test1" });
        setUserIsLoading(false);
        //console.log(user)
      }
    };
    getUser();
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
  //console.log("user1:", user);
  /*if (userIsLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color="green"/>
      </View>
    );
  }*/
  if (userIsLoading) {
    return <LoadingIndicator text={t("Loading.loading")} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" color="red" />}>
        <PreferencesContext.Provider value={preferences}>
          <UserContext.Provider value={user}>
            <DefaultPocketCodeContext.Provider value={defaultPocket}>
              <PaperProvider theme={theme}>
                <I18nextProvider i18n={i18next}>
                  <SafeAreaProvider>
                    <StartingStack />
                  </SafeAreaProvider>
                </I18nextProvider>
              </PaperProvider>
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
