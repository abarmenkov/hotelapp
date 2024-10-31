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

