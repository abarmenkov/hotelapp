import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key, cb, initialState) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      //console.log(JSON.parse(value), value);
      cb(JSON.parse(value));
    } else {
      //console.log(initialState);
      cb(initialState);
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to load data");
    cb(initialState);
  }
};

export const getUser = async (key, cb, setIsLoading, initialState) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      //console.log(JSON.parse(value), value);
      cb(JSON.parse(value));
      setIsLoading(false);
    } else {
      //console.log(initialState);
      cb(initialState);
      setIsLoading(false);
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to load data");
    cb(initialState);
    setIsLoading(false);
  }
};

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log("Data is saved");
  } catch (e) {
    console.log("Failed to save data");
  }
};
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Storage successfully cleared!");
  } catch (e) {
    console.log("Failed to clear the async storage.");
  }
};

export const STORAGE_KEY = "@profile";
