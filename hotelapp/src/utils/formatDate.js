import React from "react";
import { useTranslation } from "react-i18next";

export const formatDate = (datestring) => {
  const { i18n } = useTranslation();
  const appLanguage = i18n.language;
  const date = new Date(datestring);

  const hours =
    date.getHours().toString().length < 2
      ? "0" + date.getHours()
      : date.getHours();
  const minutes =
    date.getMinutes().toString().length < 2
      ? "0" + date.getMinutes()
      : date.getMinutes();

  const day = date.getDate();

  const month = date.toLocaleString(appLanguage, { month: "short" });

  const dateHour = `${hours}:${minutes}`;
  const dateDay = `${day} ${month}`;

  return { dateHour, dateDay };
};
