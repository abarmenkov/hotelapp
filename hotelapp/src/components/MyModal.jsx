import * as React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
//import Modal from "react-native-modal";
import ReactNativeModal from "react-native-modal";
//import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

const MyModal = ({ visible, hideModal }) => {
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
          margin: 0,
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
            alignItems: "center",
            justifyContent: "center",
            //height: 200,
            //backgroundColor: "yellow",
            //width: 150,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 450,
              backgroundColor: "pink",
              width: 450,
            }}
          >
            <Text>I am the modal content!</Text>
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
