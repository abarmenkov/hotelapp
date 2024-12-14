import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  LogBox,
  Modal,
  TextInput,
} from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AccountHeader } from "../components/headers/AccountHeader";

import { useTranslation } from "react-i18next";
import MyModal from "../components/MyModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { appRoutes } from "../API/route";
import { token } from "../API/route";
import { fetchData } from "../API/FetchData";
import { postData } from "../API/PostData";
//import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

// чтобы отключить ошибку, не получилось, возможно в другом месте нужно
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
// проброс setVisibleSnackBar вызывает предупреждение Non-serializable values were found in the navigation state.
//https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state for

const ServiceGroupScreen = ({ route, navigation }) => {
  const [serviceItems, setServiceItems] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [apiSearch, setApiSearch] = useState(false);
  // total sum считаю проходом по корзине
  //const [totalSum, setTotalSum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [notes, setNotes] = useState("");

  const { id, groupName, genericNo, setVisibleSnackBar } = route.params;
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const theme = useTheme();

  const appLanguage = i18n.language;

  const serviceGroupName =
    cartItems.length > 1
      ? groupName
      : cartItems.length === 0
      ? ""
      : cartItems[0].Name;

  const elemVisible = cartItems.length > 0 ? true : false;

  // получение всех услуг, не нашел как через АПИ получить только услуги одной группы по id группы
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

  /*useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <AccountHeader {...props} title={id} showModal={showModal} />
      ),
      //headerBackTitleVisible: false,
      //headerBackVisible: false,
      //headerBackImage: () => <MaterialCommunityIcons name="close" size={24} />,
    });
  }, []);*/
  //serviceItems.map((item) => (item.Quantity = 0));
  //Logus.HMS.Entities.Dictionaries.PointOfSale

  // начисление услуг на фолио гостя по его genericNo
  const postServiceItems = () => {
    const controller = new AbortController();
    const newAbortSignal = (timeoutMs) => {
      setTimeout(() => controller.abort(), timeoutMs || 0);

      return controller.signal;
    };
    const configurationObject = {
      method: "post",
      url: `${appRoutes.folioPath()}/${genericNo}`,
      signal: newAbortSignal(5000),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        PropertyId: 1,
        Name: `${serviceGroupName}`,
        Notes: notes,
        PocketCode: "ГОСТЬ",
        Details: cartItems,
        KeyCardId: "",
        //если необходима проверка PointOfSaleId
        //ReleaseImmediately: true,
        // игнорирует передачу и проверку точки продаж
        ReleaseImmediately: false,
        PointOfSaleId: null,
      }),
    };

    postData(configurationObject, controller);
  };

  // Фильтрация массива услуг по ID выбранной группы услуг
  const filteredServiceItems = serviceItems.filter(
    (item) => item.ServiceGroupId === id
  );

  //сумма стоимости услуг в корзине, дублирует totalSum, пока не использую
  /*const total = filteredServiceItems
    .filter((elem) => elem.Quantity > 0)

    .reduce(
      (acc, elem) => acc + elem.Quantity * elem.ServiceVariants[0]?.Price,
      0
    );*/

  const total = cartItems.reduce(
    (acc, elem) => acc + elem.Quantity * elem.Amount,
    0
  );

  //добавление услуг в корзину
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(
        (elem) => elem.ServiceItemId === item.Id
      );

      if (!isItemInCart) {
        return [
          ...prevItems,
          {
            ServiceItemId: item.Id,
            Name: item.Name,
            Quantity: 1,
            Amount: item.Price ? item.Price : item.ServiceVariants[0]?.Price,
          },
        ];
      } else {
        return prevItems.map((elem) => {
          if (elem.ServiceItemId == item.Id) {
            elem.Quantity++;
          }
          return elem;
        });
      }
    });
  };
  const updateItemInCartPrice = (item, itemPrice) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(
        (elem) => elem.ServiceItemId === item.Id
      );

      if (!isItemInCart) {
        return [...prevItems];
      } else {
        return prevItems.map((elem) => {
          if (elem.ServiceItemId == item.Id) {
            elem.Amount = itemPrice;
          }
          return elem;
        });
      }
    });
  };

  // удаление услуг из корзины
  const removeItemFromCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find(
        (elem) => elem.ServiceItemId === item.Id
      );

      if (!isItemInCart) {
        return [...prevItems];
      } else if (isItemInCart && item.Quantity === 1) {
        return prevItems.filter((elem) => elem.ServiceItemId !== item.Id);
      } else {
        return prevItems.map((elem) => {
          if (elem.ServiceItemId == item.Id) {
            elem.Quantity--;
          }
          return elem;
        });
      }
    });
  };

  const ServiceItem = ({ item }) => {
    const itemModalPrice =
      item.Price && item.Price !== 0
        ? item.Price.toString()
        : item.ServiceVariants[0]?.Price.toString();

    const [itemPrice, setItemPrice] = useState(itemModalPrice);
    const [priceModalVisible, setPriceModalVisible] = useState(false);

    const showPriceModal = () => setPriceModalVisible(true);
    const hidePriceModal = () => setPriceModalVisible(false);

    const setNewItemPrice = () => {
      const updatedItems = serviceItems.map((elem) => {
        if (elem.Id !== item.Id) {
          return elem;
        } else {
          return { ...elem, Price: Number(itemPrice) };
        }
      });

      setServiceItems(updatedItems);
      updateItemInCartPrice(item, itemPrice);
    };

    const incrementCount = () => {
      if (
        item.ServiceVariants[0]?.Price !== 0 ||
        (item.ServiceVariants[0]?.Price === 0 && item.Price && item.Price !== 0)
      ) {
        const updatedItems = serviceItems.map((elem) => {
          if (elem.Id !== item.Id) {
            return elem;
          } else {
            if (elem.hasOwnProperty("Quantity")) {
              return { ...elem, Quantity: elem.Quantity + 1 };
            }
            return { ...elem, Quantity: 1 };
          }
        });

        setServiceItems(updatedItems);

        addItemToCart(item);

        /*if (item.Price) {
          setTotalSum(totalSum + item.Price);
        } else {
          setTotalSum(totalSum + item.ServiceVariants[0]?.Price);
        }*/
      }
    };

    /*setNewServiceVariants((prevItems) => {
      return { ...prevItems, Price: Number(itemPrice) };
    });*/

    const decrementCount = () => {
      const updatedItems = serviceItems.map((elem) => {
        if (elem.Id === item.Id && item.Quantity > 0) {
          return { ...elem, Quantity: elem.Quantity - 1 };
        } else return elem;
      });

      setServiceItems(updatedItems);
      removeItemFromCart(item);

      /*if (item.Quantity > 0 && item.Price) setTotalSum(totalSum - item.Price);

      if (item.Quantity > 0 && !item.Price)
        setTotalSum(totalSum - item.ServiceVariants[0]?.Price);*/
    };

    return (
      <Pressable
        onPress={() =>
          console.log(
            item.Name,
            item.ServiceVariants[0]?.Price,
            item,
            cartItems,
            total
          )
        }
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={priceModalVisible}
          onDismiss={hidePriceModal}
          onRequestClose={hidePriceModal}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "red",
                borderRadius: 20,
                padding: 15,
                justifyContent: "space-evenly",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: "65%",
                //width: 400,
                height: "20%",
              }}
            >
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                {t("Folio.pricemodal_set_price")}
              </Text>

              <TextInput
                //label={t("Folio.comment")}
                //placeholder="Enter price"
                value={itemPrice}
                onChangeText={setItemPrice}
                style={{ height: 35, backgroundColor: "grey", width: "85%" }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  //backgroundColor: "green",
                  width: "85%",
                }}
              >
                <Pressable
                  style={{
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    backgroundColor: "yellow",
                    //marginHorizontal: 10,
                  }}
                  onPress={() => {
                    hidePriceModal();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {t("Folio.pricemodal_cancel")}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    backgroundColor: "green",
                    //marginHorizontal: 20,
                  }}
                  onPress={() => {
                    setNewItemPrice();
                    hidePriceModal();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {t("Folio.pricemodal_save")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#f9c2ff",
            padding: 8,
            marginVertical: 8,
            marginHorizontal: 26,
          }}
        >
          <View>
            <Text>
              {appLanguage === "en" && item.NameEn ? item.NameEn : item.Name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",

              backgroundColor: "#f9c2ff",
              padding: 8,
              marginVertical: 8,
              marginHorizontal: 26,
            }}
          >
            <TouchableOpacity onPress={decrementCount}>
              <Text style={{ fontSize: 24, color: "red" }}>-</Text>
            </TouchableOpacity>
            <View>
              <Text>{item.Quantity ? item.Quantity : 0}</Text>
            </View>
            <TouchableOpacity onPress={incrementCount}>
              <Text style={{ fontSize: 24, color: "red" }}>+</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            style={{ backgroundColor: "grey", width: "25%" }}
            onPress={() => {
              if (item.ServiceVariants[0]?.AllowCustomPrice) showPriceModal();
            }}
          >
            <View>
              <Text>
                {item.Price ? item.Price : item.ServiceVariants[0]?.Price}
              </Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }) => <ServiceItem item={item} />;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              //flex: 1,
              alignItems: "center",
              paddingVertical: 15,
              //marginVertical: 15,
            }}
          >
            <TextInput
              //label={t("Folio.comment")}
              placeholder={t("Folio.comment")}
              value={notes}
              onChangeText={(text) => setNotes(text)}
              style={{
                height: 50,
                backgroundColor: "grey",
                width: "95%",
              }}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <FlatList
              data={filteredServiceItems}
              renderItem={renderItem}
              removeClippedSubviews={true}
              //initialNumToRender={15}
              keyExtractor={(item) => item.Id}
              keyboardShouldPersistTaps={"handled"}
              justifyContent="space-evenly"
            />
          </View>

          {/* <Modal
            animationType="slide"
            transparent={false}
            visible={priceModalVisible}
            onDismiss={hidePriceModal}
            onRequestClose={hidePriceModal}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "red",
                  borderRadius: 20,
                  padding: 15,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  width: "65%",
                  //width: 400,
                  height: "20%",
                }}
              >
                <Text
                  style={{
                    marginBottom: 15,
                    textAlign: "center",
                  }}
                >
                  {t("Folio.pricemodal_set_price")}
                </Text>

                <TextInput
                  //label={t("Folio.comment")}
                  placeholder="Enter price"
                  value={notes}
                  onChangeText={(text) => setNotes(text)}
                  style={{ height: 35, backgroundColor: "grey", width: "85%" }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    //backgroundColor: "green",
                    width: "85%",
                  }}
                >
                  <Pressable
                    style={{
                      borderRadius: 20,
                      padding: 10,
                      elevation: 2,
                      backgroundColor: "yellow",
                      //marginHorizontal: 10,
                    }}
                    onPress={hidePriceModal}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {t("Folio.pricemodal_cancel")}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderRadius: 20,
                      padding: 10,
                      elevation: 2,
                      backgroundColor: "green",
                      //marginHorizontal: 20,
                    }}
                    onPress={hidePriceModal}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {t("Folio.pricemodal_save")}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>*/}

          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              //alignItems: "center",
              //justifyContent: "space-between",
              height: 75,
              backgroundColor: "lightblue",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: elemVisible ? "space-around" : "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={
                  {
                    //flex: 1,
                    //alignItems: "flex-end",
                    //justifyContent: "center",
                    //height: 75,
                    //width: 200,
                    //backgroundColor: "red",
                  }
                }
              >
                <Button
                  mode="text"
                  //style={{ marginRight: 30 }}
                  labelStyle={{ fontSize: 20 }}
                  textColor={theme.colors.primary}
                  onPress={() => {
                    navigation.goBack();
                    setVisibleSnackBar(true);
                  }}
                >
                  {t("Folio.cancel")}
                </Button>
              </View>
              {elemVisible && (
                <>
                  <View
                    style={{
                      //flex: 1,
                      //alignItems: "flex-start",
                      justifyContent: "center",
                      alignItems: "center",
                      //height: 35,
                      //backgroundColor: "green",
                      //width: 200,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>{total}</Text>
                  </View>
                  <View
                    style={
                      {
                        //flex: 1,
                        //alignItems: "flex-end",
                        //justifyContent: "center",
                        //height: 75,
                        //width: 200,
                        //backgroundColor: "red",
                      }
                    }
                  >
                    <Button
                      mode="text"
                      //style={{ marginRight: 30 }}
                      labelStyle={{ fontSize: 20 }}
                      textColor={theme.colors.primary}
                      onPress={postServiceItems}
                    >
                      {t("Folio.post")}
                    </Button>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ServiceGroupScreen;
