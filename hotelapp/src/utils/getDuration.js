import { useTranslation } from "react-i18next";

export const getDuration = (datestring) => {
  const { t } = useTranslation();
  const now = new Date();
  const startTime = new Date(datestring);
  const durationInMinutes = (now.getTime() - startTime.getTime()) / 1000 / 60;
  const durationInHours = Math.floor(durationInMinutes / 60);
  const minutes = Math.round(durationInMinutes % 60);
  const duration =
    durationInHours > 0
      ? `${durationInHours}${t("Time.hour")}.${minutes}${t("Time.minute")}.`
      : `${minutes}${t("Time.minute")}.`;

  return duration;
};
