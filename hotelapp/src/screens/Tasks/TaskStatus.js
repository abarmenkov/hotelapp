import { useTranslation } from "react-i18next";

export const TaskStatus = (status) => {
  const { t } = useTranslation();
  switch (status) {
    case "D":
      return {
        title: t("TasksScreen.taskStatus.D"),
        backgroundColor: "yellow",
        titleColor: "red",
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

export const TaskTypePriority = (priority) => {
  switch (priority) {
    case "Major":
      return {
        backgroundColor: "lightblue",
        titleColor: "red",
      };
    case "Minor":
      return {
        backgroundColor: "lightgrey",
        titleColor: "#08a2b4",
      };
    case "Critical":
      return {
        backgroundColor: "red",
        titleColor: "blue",
      };
    case "Normal":
      return {
        backgroundColor: "yellow",
        titleColor: "red",
      };

    default:
      return {
        backgroundColor: "yellow",
        titleColor: "red",
      };
  }
};
