import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
  Keyboard,
  RefreshControl,
  Animated,
} from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { reservationsFilter } from "../../utils/reservationsFilter";
import { create } from "../../utils/normalize";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useTranslation } from "react-i18next";
import { getDuration } from "../../utils/getDuration";
import { ServiceRequestPriority } from "./ServiceRequestStatus";

const Item = ({ item, prevOpenedRow, setPrevOpenedRow }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const timer = item.StartedDate ? getDuration(item.StartedDate) : null;
  const priority = ServiceRequestPriority(item.Model.Priority);

  /*const swipeRef = useRef();
  const closeSwipeable = () => {
    swipeRef?.current?.close();
  };*/

  const closeRow = (id) => {
    if (prevOpenedRow && prevOpenedRow !== id) {
      prevOpenedRow.close();
    }
    setPrevOpenedRow(id);
  };
  const renderActionButtons = (progress, dragX) => {
    //console.log(dragX);
    const scale = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [0.85, 0],
    });
    return (
      <View
        //key={item.Id}
        style={{
          flexDirection: "row",
          //backgroundColor: "#ff8303",
          //justifyContent: "space-between",
          //alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            onPress={() => Alert.alert(item?.RepairType?.Name)}
            style={{
              ...styles.actionBtn,
              transform: [{ scale }],
            }}
          >
            {t("HousekeepingScreen.startCleaning")}
          </Animated.Text>
        </Animated.View>

        <Animated.View
          style={{
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            onPress={() => Alert.alert(item?.RepairType?.Name)}
            style={{
              ...styles.actionBtn,
              transform: [{ scale }],
            }}
          >
            {t("HousekeepingScreen.finishCleaning")}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  };
  return (
    <View key={item.Id}>
      <Swipeable
        //key={item.Id}
        ref={(ref) => (item.Id = ref)}
        onSwipeableWillOpen={() => closeRow(item.Id)}
        renderRightActions={renderActionButtons}
        friction={1}
        overshootFriction={20}
        leftThreshold={-150}
        //rightThreshold={-50}
      >
        <Pressable
          style={{ ...styles.item, backgroundColor: theme.colors.surface }}
          onPress={() => {
            Keyboard.dismiss();
            //Alert.alert("Тип уборки: " + item.CleaningType?.Name + item.Tags);
            console.log(item);
          }}
        >
          <View style={styles.roomNumberContainer}>
            <View style={styles.roomNumber}>
              <Text style={styles.title}>{item.Room?.Name}</Text>
            </View>
          </View>

          <View style={styles.guestInfoContainer}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.cleaning}>{item.RepairType?.Name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  //flexWrap: "wrap",
                  overflow: "hidden",
                  //paddingHorizontal: 5,
                }}
              >
                <Text
                  style={styles.guestInfoDetails}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.RoomType?.Name}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <View
              style={{
                ...styles.status,
                backgroundColor: priority.backgroundColor,
              }}
            >
              <Text
                style={{
                  ...styles.title,
                  color: priority.titleColor,
                }}
              >
                {item.Model?.Priority}
              </Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
};

// the filter
export const ServiceRequestsList = (props) => {
  const {
    searchQuery,
    setClicked,
    data,
    refreshing,
    setRefreshing,
    updateData,
    setUpdateData,
    isLoading,
    hasError,
  } = props;
  const { t } = useTranslation();
  const [prevOpenedRow, setPrevOpenedRow] = useState();
  const renderItem = ({ item }) => {
    return reservationsFilter(item, searchQuery) ? (
      <Item
        item={item}
        prevOpenedRow={prevOpenedRow}
        setPrevOpenedRow={setPrevOpenedRow}
      />
    ) : null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        {!isLoading && hasError ? (
          <Text
            style={{ marginVertical: 30, alignSelf: "center" }}
            onPress={() => {
              setUpdateData(!updateData);
            }}
          >
            {t("Loading.error")}
          </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            removeClippedSubviews={true}
            initialNumToRender={15}
            //keyExtractor={(item) => item.Id}
            keyboardShouldPersistTaps={"handled"} // чтобы скрыть открытую клавиатуру и отработать onPress элемента
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setUpdateData(!updateData);
                  setRefreshing(true);
                }}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = create({
  list__container: {
    flex: 1,
    paddingHorizontal: 5,
    //marginHorizontal: 5,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    //gap: 4,
    //marginHorizontal: 5,
    //backgroundColor: "purple",
    //paddingHorizontal: 5,
  },

  roomNumberContainer: {
    flex: 1,
    alignItems: "center",

    //backgroundColor: "purple",
  },
  roomNumber: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  guestInfoContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
    alignItems: "center",
    //backgroundColor: "yellow",
    //paddingHorizontal: 5,
  },
  cleaning: {
    fontSize: 18,
    paddingHorizontal: 5,
  },
  guestLayout: {
    fontSize: 16,
    fontWeight: 700,
    paddingHorizontal: 5,
  },
  guestInfoDetails: {
    fontSize: 16,
    fontWeight: 500,
    paddingHorizontal: 5,
  },
  inspection: {
    backgroundColor: "#c4f3fd",
    flexDirection: "row",
    //width: 60,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 50,
    paddingHorizontal: 15,
  },
  inspectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#08a2b4",
  },
  actionBtn: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 5,
    //paddingHorizontal: 10,
    //paddingVertical: 14,
  },

  statusContainer: {
    //flex: 1,
    //backgroundColor: "purple",
    alignItems: "center",
    //backgroundColor: "yellow",
  },
  status: {
    //backgroundColor: "grey",
    //width: 90,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
