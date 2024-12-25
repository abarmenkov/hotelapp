import { createContext, useContext } from "react";

export const SettingsContext = createContext([
  {
    hotelName: "",
    serverAddress: "",
    defaultPointOfSales: "",
    defaultPocketCode: "",
    user: { userName: "", userPassword: "" },
    language: "",
    token: "",
  },
]);

export const useSettingsContext = () => useContext(SettingsContext);