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
import { TaskStatus } from "./TaskStatus";
import { TaskTypePriority } from "./TaskStatus";
import { getDuration } from "../../utils/getDuration";
//import { TasksScreen } from "./TasksScreen";

const Item = ({ item, prevOpenedRow, setPrevOpenedRow }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  //const timer = item.StartedDate ? getDuration(item.StartedDate) : null;

  /*const swipeRef = useRef();
  const closeSwipeable = () => {
    swipeRef?.current?.close();
  };*/
  const taskStatus = TaskStatus(item.Status);
  const taskTypePriority = TaskTypePriority(item.Priority);

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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!item.StartedDate && item.CleaningStatus?.Code !== "I" ? (
          <Animated.View style={{ backgroundColor: "blue", marginRight: 5 }}>
            <Animated.Text
              onPress={() => Alert.alert(item?.CleaningType?.Name)}
              style={{
                ...styles.actionBtn,
                transform: [{ scale }],
              }}
            >
              {t("HousekeepingScreen.startCleaning")}
            </Animated.Text>
          </Animated.View>
        ) : null}

        <Animated.View style={{ backgroundColor: "green" }}>
          <Animated.Text
            onPress={() => Alert.alert(item?.CleaningType?.Name)}
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
            console.log(item);
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //flexWrap: "wrap",
                overflow: "hidden",
                //paddingHorizontal: 5,
              }}
            >
              <Text style={styles.guestLayout}>#</Text>
              {item.LinkedRoom && (
                <Text style={styles.guestLayout}>{item.LinkedRoom?.Name}</Text>
              )}
              <Text
                style={{
                  ...styles.guestLayout,
                  backgroundColor: taskTypePriority.backgroundColor,
                  borderRadius: 25,
                  textAlign: "center",
                }}
              >
                {item.TaskType?.Name}
              </Text>
            </View>
            {item.Summary && (
              <View>
                <Text
                  style={styles.guestInfoDetails}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.Summary}
                </Text>
              </View>
            )}
            {item.Description && (
              <View>
                <Text
                  style={styles.guestInfoDetails}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.Description}
                </Text>
              </View>
            )}
            {item.AssignedUser && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={theme.colors.onSurface}
                />
                <Text style={styles.cleaning}>{item.AssignedUser?.Name}</Text>
              </View>
            )}
          </View>
          <View style={styles.statusContainer}>
            <View
              style={{
                ...styles.status,
                backgroundColor: taskStatus.backgroundColor,
              }}
            >
              <Text style={{ ...styles.title, color: taskStatus.titleColor }}>
                {taskStatus.title}
              </Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
};

// the filter
export const TasksList = (props) => {
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    //gap: 4,
    //marginHorizontal: 5,
    //backgroundColor: "white",
    paddingHorizontal: 25,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //marginRight: 5,
    alignItems: "center",
    backgroundColor: "yellow",
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

  inspectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#08a2b4",
  },
  actionBtn: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    //marginBottom: 5,
    //fontStyle: "italic",
  },
  statusContainer: {
    //flex: 1,
    //backgroundColor: "purple",
    alignItems: "center",
    //backgroundColor: "yellow",
  },
  status: {
    //backgroundColor: "grey",
    //width: 60,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
