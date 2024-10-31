import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AccountHeader } from "../components/headers/AccountHeader";

const Account = ({ route, navigation }) => {
  const { GenericNo } = route.params.item;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      header: (props) => <AccountHeader {...props} title={GenericNo} />,
      /*headerBackTitleVisible: false,
      headerBackImage: () => <MaterialCommunityIcons name="close" size={24} />,
      headerTitle: "test",*/
    });
  }, []);

  //console.log(route.params.item);
  console.log(route.params.item.GenericNo);
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Account;
