import i18n from "i18next";
import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import ru from "./src/locales/ru";
import en from "./src/locales/en";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, saveData } from "./src/API/asyncStorageMethods";
//import i18n as i18next from 'i18next';

const i18next = i18n.createInstance();

const LanguageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: (callback) => getData("@language", callback, "ru"),
  /*detect: async function (callback) {
    try {
      await AsyncStorage.getItem("@language").then((language) => {
        if (language) {
          console.log(language);
          return callback(JSON.parse(language));
        } else {
          return callback(Localization.getLocales()[0]);
        }
      });
    } catch (error) {
      console.log("error reading language");
      //console.log(Localization.getLocales()[0]);
      callback("ru");
    }
  },*/
  
  cacheUserLanguage: (language) => saveData("@language", language),
  /*cacheUserLanguage: async function (language) {
    try {
      console.log(language, JSON.stringify(language));
      await AsyncStorage.setItem("@language", language);
    } catch (error) {
      console.log("error saving language");
    }
  },*/
  // async detection
  /*detect: (callback) => {
    // We will get back a string like "en-UK".
    callback(Localization.getLocales()[0]);
  },
  cacheUserLanguage: () => {},*/
};

i18next

  // learn more: https://github.com/i18next/i18next-browser-languageDetector

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  .use(LanguageDetector)

  .init({
    compatibilityJSON: "v3",
    debug: false,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ru,
      en,
    },
    supportedLngs: ["en", "ru"],
  });

export default i18next;
