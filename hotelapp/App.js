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
//import "react-native-gesture-handler";
import { I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "./i18n";

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
  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [themeIsLoading, setThemeIsLoading] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      const value = await AsyncStorage.getItem("@theme");
      setIsThemeDark(JSON.parse(value));
    };
    getTheme();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setUserIsLoading(true);
      const value = await AsyncStorage.getItem("@user");
      console.log(JSON.parse(value));
      if (value) {
        setUser(JSON.parse(value));
        setUserIsLoading(false);
      } else {
        setUser({ userName: "test", userPassword: "test1" });
        setUserIsLoading(false);
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

  if (userIsLoading) {
    return <ActivityIndicator size="large" color="green" />;
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="red" />}>
      <PreferencesContext.Provider value={preferences}>
        <UserContext.Provider value={user}>
          <PaperProvider theme={theme}>
            <I18nextProvider i18n={i18next}>
              <SafeAreaProvider>
                <StartingStack />
              </SafeAreaProvider>
            </I18nextProvider>
          </PaperProvider>
        </UserContext.Provider>
      </PreferencesContext.Provider>
    </Suspense>
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
