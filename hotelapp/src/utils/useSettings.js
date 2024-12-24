import { useSettingsContext } from "../context/SettingsContext";
export const useSettings = () => {
  const { settingsContextValue } = useSettingsContext();

  return settingsContextValue;
};
