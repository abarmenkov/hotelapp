import { createContext, useContext } from "react";
import { token } from "../API/route";

export const SettingsContext = createContext([
  {
    hotelName: "",
    serverAddress: "",
    defaultPointOfSales: "",
    defaultPocketCode: "",
    user: { userName: "", userPassword: "", token: "" },
    language: "",
    isDefault: false,
    PropertyId: null,
  },
]);

export const useSettingsContext = () => useContext(SettingsContext);
