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
    isDefault: false,
    PropertyId: null,
  },
]);

export const useSettingsContext = () => useContext(SettingsContext);
