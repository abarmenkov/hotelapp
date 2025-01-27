import { createContext, useContext } from "react";

export const SettingsContext = createContext([
  {
    hotelName: "Add Hotel",
    serverAddress: "",
    defaultPointOfSales: "",
    defaultPocketCode: "",
    user: { userName: "", userPassword: "", token: "" },
    language: "",
    isDefault: false,
    PropertyId: null,
    id: 1,
  },
]);

export const useSettingsContext = () => useContext(SettingsContext);
