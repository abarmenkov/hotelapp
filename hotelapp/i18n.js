import i18n from "i18next";
import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import ru from "./src/locales/ru";
import en from "./src/locales/en";

/*import i18n as i18next from 'i18next';
const i18n = i18next.createInstance();*/

const LanguageDetector = {
  type: "languageDetector",
  async: true, // async detection
  detect: (callback) => {
    // We will get back a string like "en-UK".
    callback(Localization.getLocales());
  },

  init: () => {},

  cacheUserLanguage: () => {},
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  .init({
    compatibilityJSON: "v3",
    debug: false,
    fallbackLng: ["ru", "en"],
    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ru,
      en,
    },
  });

export default i18n;
