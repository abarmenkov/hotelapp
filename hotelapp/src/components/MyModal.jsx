import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  StatusBar,
} from "react-native";
//import Modal from "react-native-modal";
import ReactNativeModal from "react-native-modal";
//import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";
import { appRoutes } from "../API/route";
import { useNavigation } from "@react-navigation/native";

const MyModal = ({ visible, hideModal, genericNo, setVisibleSnackBar }) => {
  const navigation = useNavigation();
  const [serviceGroups, setServiceGroups] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [apiSearch, setApiSearch] = useState(false);

  const { t } = useTranslation();
  //const endPoint = "/Logus.HMS.Entities.Dictionaries.ServiceItem";

  useEffect(() => {
    const endPoint = "/Logus.HMS.Entities.Dictionaries.ServiceGroup";
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
      params: {
        propertyId: 1,
      },
    };
    fetchData(
      setIsLoading,
      setServiceGroups,
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
  }, [updateData]);

  /*useEffect(() => {
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
  }, [updateData]);

  const serviceItemsFilter = (serviceGropuId) =>
    serviceItems.filter((item) => item.ServiceGroupId === serviceGropuId);*/
  //console.log(serviceGroups);
  const ServiceGroupName = ({ item }) => {
    return (
      <Pressable
        /*onPress={() => {
          const filteredServiceItems = serviceItemsFilter(item.Id);
          console.log(filteredServiceItems.map((item) => item.Name));
        }}*/
        onPress={() => {
          navigation.navigate("ServiceGroup", {
            id: item.Id,
            groupName: item.Name,
            genericNo,
            setVisibleSnackBar,
            DefaultFolioPocketId: item.DefaultFolioPocketId,
          });
          //console.log(item, item.DefaultFolioPocketId);
          hideModal();
        }}
      >
        <View
          style={{
            backgroundColor: "#f9c2ff",
            padding: 8,
            marginVertical: 8,
            marginHorizontal: 16,
          }}
        >
          <Text>{item.Name}</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }) => <ServiceGroupName item={item} />;

  //console.log(items);

  return (
    <View>
      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        coverScreen={true}
        propagateSwipe
        style={{
          //backgroundColor: "green",
          //padding: 120,
          margin: 10,
          //position: "relative",
          //height: 300,
          //width: 450,
          //alignItems: "center",
          //justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,

            //alignItems: "center",
            //justifyContent: "space-between",
            //height: 200,
            //backgroundColor: "yellow",
            //width: 150,
          }}
        >
          <View
            style={{
              //alignItems: "center",
              justifyContent: "center",
              height: 50,
              backgroundColor: "pink",
              //width: 450,
            }}
          >
            <Text>{t("Folio.transactions_groups")}</Text>
          </View>
          <View
            style={
              {
                //flex: 1,
                //alignItems: "center",
                //justifyContent: "space-evenly",
                //height: 200,
                //backgroundColor: "green",
                //width: 150,
              }
            }
          >
            <FlatList
              data={serviceGroups}
              renderItem={renderItem}
              removeClippedSubviews={true}
              //initialNumToRender={15}
              keyExtractor={(item) => item.Id}
              keyboardShouldPersistTaps={"handled"}
              justifyContent="space-evenly"
            />
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

//react-native-paper Modal- не найден bottom-slide

/*const MyModal = ({ visible, hideModal }) => {
  //const [visible, setVisible] = React.useState(false);

  //const showModal = () => setVisible(true);
  //const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, height: 200 };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </>
  );
};

//react-native Modal - не найдено закрытие модалки по клику на overlay
const MyModal = ({ visible, hideModal }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        //statusBarTranslucent={false}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          hideModal();
        }}
      >
        <View
          style={{
            backgroundColor: "green",
            //padding: 120,
            //margin: 200,
            //position: "relative",
            height: 300,
            width: 300,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Hello World!</Text>
        </View>
      </Modal>
    </>
  );
};*/

export default MyModal;
