import React, { useCallback, useState } from "react";
import GuestList from "./GuestList";
import { fetchData } from "../../API/FetchData";
import { token, baseUrl } from "../../API/route";
import { useFocusEffect } from "@react-navigation/native";

const InHouseList = (props) => {
  const { searchQuery, setSearchQuery, setClicked, index } = props;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const endPoint = "Reservation/QuickSearch";

  useFocusEffect(
    useCallback(() => {
      const ArrivalDateTo = new Date();

      const controller = new AbortController();
      ///прервать загрузку если сервер не отвечает
      const newAbortSignal = (timeoutMs) => {
        //const abortController = new AbortController();
        setTimeout(() => controller.abort(), timeoutMs || 0);

        return controller.signal;
      };
      const configurationObject = {
        method: "post",
        url: `${baseUrl}${endPoint}`,
        signal: newAbortSignal(5000),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Statuses: [{ Code: "IN" }],
          ArrivalDateTo: ArrivalDateTo.toDateString(),
          //DepartureDateTo: "2024-04-04T12:00:00+03:00",
        }),
      };

      fetchData(
        setIsLoading,
        setItems,
        configurationObject,
        setErrorFlag,
        setRefreshing,
        refreshing,
        controller
      );

      return () => {
        setSearchQuery("");
        setClicked(false);
        setErrorFlag(false);
        setItems([]);

        controller.abort("Data fetching cancelled");
      };
    }, [updateData, index])
  );
  return (
    <GuestList
      searchQuery={searchQuery}
      data={items}
      setClicked={setClicked}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
      updateData={updateData}
      setUpdateData={setUpdateData}
      isLoading={isLoading}
      hasError={hasError}
    />
  );
};

export default React.memo(InHouseList);
