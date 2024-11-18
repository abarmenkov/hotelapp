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

const ServiceGroupScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { id } = route.params.id;
  const { t } = useTranslation();
  const theme = useTheme();

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

  console.log(route.params.id);
  //console.log(route.params.item.GenericNo);
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
            <Text>text</Text>
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
