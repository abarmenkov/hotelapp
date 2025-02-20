import React from "react";
import axios from "axios";

export const fetchData = async (
  setIsLoading,
  setItems,
  configurationObject,
  setErrorFlag,
  setRefreshing,
  refreshing,
  controller
) => {
  try {
    if (!refreshing) {
      setIsLoading(true);
    }
    const response = await axios(configurationObject);
    //console.log(response.data);

    if (response.status === 200) {
      setItems(response.data);
      setIsLoading(false);
      setRefreshing(false);

      return;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    if (controller.signal.aborted) {
      console.log("Data fetching cancelled");
      setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);
    } else {
      console.log(error);
      //console.log("Data fetching cancelled");
      setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);
    }
  }
};

export const fetchDataTest = async (
  setIsLoading,
  setData,
  setErrorFlag,
  setRefreshing,
  refreshing,
  method,
  url,
  token,
  type
) => {
  //console.log(token);
  const controller = new AbortController();
  const newAbortSignal = (timeoutMs) => {
    setTimeout(() => controller.abort(), timeoutMs || 0);

    return controller.signal;
  };

  const configurationObject = {
    method,
    url,
    //url: appRoutes.dictionariesPath(),
    signal: newAbortSignal(5000),
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },

    params: {
      propertyId: 1,
    },
  };

  try {
    if (!refreshing) {
      setIsLoading(true);
    }
    const response = await axios(configurationObject);
    //console.log(response.data);

    if (response.status === 200) {
      if (type === "property") {
        setData(response.data[0].Name);
      } else {
        setData(response.data);
        setIsLoading(false);
        setRefreshing(false);
      }

      return;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    if (controller.signal.aborted) {
      console.log("Data fetching cancelled");
      setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);
    } else {
      console.log(error);
      //console.log("Data fetching cancelled");
      setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);
    }
  }
};
