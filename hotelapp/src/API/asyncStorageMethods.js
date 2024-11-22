import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key, cb, initialState) => {
  try {
    const value = await AsyncStorage.getItem(key);
    //const newData = JSON.parse(value);
    //console.log(newData);
    if (value !== null) {
      cb(JSON.parse(value));
    } else {
      cb(initialState);
    }
  } catch (e) {
    alert("Failed to load data");
  }
};

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    alert("Failed to save data");
  }
};
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert("Storage successfully cleared!");
  } catch (e) {
    alert("Failed to clear the async storage.");
  }
};

export const STORAGE_KEY = "@profile";
