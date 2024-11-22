import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AccountHeader } from "../components/headers/AccountHeader";
import { Divider, Button, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import MyModal from "../components/MyModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { appRoutes } from "../API/route";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";

const ServiceGroupScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [serviceItems, setServiceItems] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [apiSearch, setApiSearch] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { id } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const endPoint = "/Logus.HMS.Entities.Dictionaries.ServiceItem";
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);

      return controller.signal;
    };
    const configurationObject = {
      method: "get",
      url: `${appRoutes.dictionariesPath()}${endPoint}`,
      //url: appRoutes.dictionariesPath(),
      signal: newAbortSignal(5000),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      /*data: JSON.stringify({
        ServiceGroupId: id,
        //DepartureDateTo: "2024-04-04T12:00:00+03:00",
      }),*/
      params: {
        propertyId: 1,
      },
    };
    fetchData(
      setIsLoading,
      setServiceItems,
      configurationObject,
      setErrorFlag,
      setRefreshing,
      refreshing,
      controller
    );
    return () => {
      setErrorFlag(false);
      controller.abort("Data fetching cancelled");
    };
  }, []);

  /*useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);*/

  useEffect(() => {
    navigation.setOptions({
      /*header: (props) => (
        <AccountHeader {...props} title={id} showModal={showModal} />
      ),*/
      //headerBackTitleVisible: false,
      //headerBackVisible: false,
      headerBackImage: () => <MaterialCommunityIcons name="close" size={24} />,
    });
  }, []);

  console.log(route.params);
  console.log(id);
  const filteredServiceItems = serviceItems.filter(
    (item) => item.ServiceGroupId === id
  );

  console.log(filteredServiceItems);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Divider />

        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text>Text</Text>
          </View>
          <View>
            <MyModal visible={visible} hideModal={hideModal} />
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            //alignItems: "flex-end",
            justifyContent: "center",
            height: 75,
            //backgroundColor: "red",
          }}
        >
          <View>
            <Divider bold />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
              height: 75,
              //backgroundColor: "red",
            }}
          >
            <Button
              mode="text"
              style={{ marginRight: 30 }}
              labelStyle={{ fontSize: 20 }}
              textColor={theme.colors.primary}
              onPress={() => navigation.goBack()}
            >
              {t("Folio.cancel")}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ServiceGroupScreen;
