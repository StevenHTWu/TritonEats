import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
} from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const [selectedCards, setSelectedCards] = useState("");

  const [alternateSelect, setAlternateSelect] = useState(true);

  const changeSelect = () => {
    setAlternateSelect((alternateSelect) => !alternateSelect);
  };

  const makeOrder = async (restaurant_name, order_items, total_price) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await trackerApi.post(
      "/auth/makeOrder",
      { restaurant_name, order_items, total_price },
      {
        headers: headers,
      }
    );
  };

  const getCard = async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    trackerApi
      .get("/auth/customerPayment", {
        headers: headers,
      })
      .then((res) => {
        setSelectedCards(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refresh = navigation.addListener("didFocus", () => {
    getCard();
  });

  var array = selectedCards;
  var cardNum = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i].card_number != null) {
      cardNum[i] = "xxxx-xxxx-xxxx-" + array[i].card_number.substring(12, 16);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.CardImg}
          source={require("../../assets/pay.png")}
        />
        <View style={styles.layer1}>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Unica One",
                color: "#0a2657",
                alignSelf: "center"
              }}
            >
              Select or Add Card
            </Text>
            <Picker
              //selectedValue={selectedValue}
              mode="dropdown"
              style={{ height: 180, width: 300, alignSelf: "center" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCards(itemValue)
              }
            >
              {cardNum.map((item, idx) => (
                <Picker.Item label={item} value={item} key={idx} />
              ))}
            </Picker>

            <TouchableOpacity
              onPress={() => navigation.navigate("AddCardScreen")}
              style={styles.AddCardBtn}
            >
              <Text style={styles.ButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.layer2}>
            
            <View style={{ flex: 1, flexDirection: "row", paddingLeft: "8%", paddingTop: "8%"}}>
              <View style={{ width: 220, height: 35 }}>
              <TouchableOpacity
                onPress={() => {
                  makeOrder(
                    navigation.getParam("res_name"),
                    navigation.getParam("order_array"),
                    navigation.getParam("total_price")
                  );
                  navigation.navigate("OrderStatusScreen");
                }}
                style={styles.PaymentBtn}
              >
                <Text style={styles.ButtonText}>Pay</Text>
              </TouchableOpacity>
              </View>
              <View style={{ width: 50, height: 45, paddingTop: "2%" }}>
                  <Image
                style={styles.CardImgVisa}
                source={require("../../assets/visa.png")}
              />
              </View>
              <View style={{ width: 100, height: 45, paddingTop: "2%" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "Unica One",
                  color: "#FFD700",
                }}
              >
                {"$" + navigation.getParam("total_price")}
              </Text>
              </View>
            </View>
            
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
PaymentScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657", paddingTop: 100 },
  CardImg: {
    width: 120,
    height: 120,
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
  CardImgVisa: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
  layer1: {
    borderRadius: 50,
    height: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    paddingTop: "15%",
    top: "30%",
    width: "100%",
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    marginTop: "5%",
    zIndex: 1
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: "15%",
    alignSelf: "center",
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
  },
  ButtonText: {
    fontSize: 23,
    color: "#0a2657",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
});

export default PaymentScreen;
