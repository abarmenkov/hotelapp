import React from "react";
import { View, Text } from "react-native";

const Account = ({ route }) => {
  //const { GenericNo } = props.params;
  console.log(route.params.item);
  console.log(route.params.item.GenericNo);
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Account;
