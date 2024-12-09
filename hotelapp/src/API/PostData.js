import axios from "axios";

export const postData = async (
  configurationObject,

  controller
) => {
  try {
    /*if (!refreshing) {
      setIsLoading(true);
    }*/
    const response = await axios(configurationObject);
    console.log(response.data);
    console.log(response.status);
    if (response.status === 200) {
      console.log(response);
      /*setItems(response.data);
      setIsLoading(false);
      setRefreshing(false);*/

      return;
    } else {
      throw new Error("Failed to post data");
    }
  } catch (error) {
    if (controller.signal.aborted) {
      console.log("Data fetching cancelled");
      /*setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);*/
    } else {
      console.log(error);
      console.log(error.message);
      console.log(error.request);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);

      //console.log("Data fetching cancelled");
      /*setErrorFlag(true);
      setIsLoading(false);
      setRefreshing(false);*/
    }
  }
};
