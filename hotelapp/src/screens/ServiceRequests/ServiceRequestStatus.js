import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
//import { useTheme } from "react-native-paper";

export const ServiceRequestStatus = (status) => {
  const { t } = useTranslation();
  const theme = useTheme();
  switch (status) {
    case "D":
      return {
        title: t("TasksScreen.taskStatus.D"),
        backgroundColor: "transparent",
        titleColor: theme.colors.onSurface,
      };
    case "S":
      return {
        title: t("TasksScreen.taskStatus.S"),
        backgroundColor: "#c4f3fd",
        titleColor: "#08a2b4",
      };
    case "P":
      return {
        title: t("TasksScreen.taskStatus.P"),
        backgroundColor: "lightblue",
        titleColor: "blue",
      };
    case "COMPL":
      return {
        title: t("TasksScreen.taskStatus.COMPL"),
        backgroundColor: "yellow",
        titleColor: "red",
      };
    case "CLS":
      return {
        title: t("TasksScreen.taskStatus.CLS"),
        backgroundColor: "yellow",
        titleColor: "red",
      };
    case "CANC":
      return {
        title: t("TasksScreen.taskStatus.CANC"),
        backgroundColor: "yellow",
        titleColor: "red",
      };
    default:
      return {
        title: t("TasksScreen.taskStatus.Default"),
        backgroundColor: "yellow",
        titleColor: "red",
      };
  }
};

export const ServiceRequestPriority = (priority) => {
  const theme = useTheme();
  switch (priority) {
    case "Major":
      return {
        backgroundColor: "orange",
        titleColor: theme.colors.onSurface,
      };
    case "Minor":
      return {
        backgroundColor: "transparent",
        titleColor: theme.colors.onSurface,
      };
    case "Critical":
      return {
        backgroundColor: "pink",
        titleColor: "red",
      };
    case "Normal":
      return {
        backgroundColor: "lightgrey",
        titleColor: "grey",
      };

    default:
      return {
        backgroundColor: "yellow",
        titleColor: "red",
      };
  }
};
