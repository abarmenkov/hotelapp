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
  params,
  type
) => {
  const controller = new AbortController();
  const newAbortSignal = (timeoutMs) => {
    setTimeout(() => controller.abort(), timeoutMs || 0);

    return controller.signal;
  };

  /*const configurationObject = {
    method,
    url,
    signal: newAbortSignal(5000),
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },

    params: {
      propertyId: 1,
    },
  };*/
  let configurationObject;

  if (type === "ping") {
    configurationObject = {
      method,
      url,
      signal: newAbortSignal(5000),
    };
  } else if (type === "token") {
    configurationObject = {
      method,
      url,
      signal: newAbortSignal(5000),
      params,
    };
  } else {
    configurationObject = {
      method,
      url,
      signal: newAbortSignal(5000),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },

      params,
    };
  }

  try {
    if (!refreshing) {
      setIsLoading(true);
    }
    const response = await axios(configurationObject);

    if (response.status === 200) {
      if (type === "hotelName") {
        setData(response.data[0].Name);
      } else if (type === "token") {
        setData(response.data.Token);
        console.log(response.data.Token);
      } else {
        setData(response.data);
      }
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
