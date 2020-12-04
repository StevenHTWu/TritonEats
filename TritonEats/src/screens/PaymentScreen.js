import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Keyboard,  TouchableWithoutFeedback, Picker } from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const PaymentScreen = ({ navigation }) => {

  console.log(navigation.getParam("res_name"));
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCards, setSelectedCards] = useState("");
  const [resName, setResName] = useState("");
  const [orderArray, setOrderArray] = useState("");
  const [price, setPrice] = useState("");

  const[alternateSelect, setAlternateSelect] = useState(true);

  const changeSelect = () => {
    setAlternateSelect(alternateSelect => !alternateSelect);
  }

  const makeOrder = async (restaurant_name, order_items, total_price) => {
    console.log(restaurant_name);
  
    const token = await AsyncStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  
    const response = await trackerApi.post("/auth/makeOrder", { restaurant_name, order_items, total_price }, {
      headers: headers
    });
  };


  const getCard = async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    trackerApi.get("/auth/customerPayment", {
      headers: headers
    })
    .then(res => {
      setSelectedCards(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  };

 

  const refresh = navigation.addListener('didFocus', () => {
    getCard();
    if(navigation.getParam("res_name") != null){
      setResName(navigation.getParam("res_name"));
      setOrderArray(navigation.getParam("order_array"));
      setPrice(navigation.getParam("total_price"));
    }
  });

  var array = selectedCards;
  var cardNum=[];

  for (var i=0; i<array.length; i++){
    if(array[i].card_number != null) {
      cardNum[i] = "xxxx-xxxx-xxxx-" + array[i].card_number.substring(12,16);
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

          <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            style={{ height: 180, width: 300, alignSelf: "center"}}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >{cardNum.map((item, idx) => <Picker.Item label={item} value={item} key={idx}/>)}
          </Picker>

           <TouchableOpacity
            onPress={() => navigation.navigate("AddCardScreen")}
            style={styles.AddCardBtn}
          >
            <Text style={styles.ButtonText}>Add Card</Text>
          </TouchableOpacity>

            </View>

            <View style={styles.layer2}>
                    <TouchableOpacity
                        onPress={() => {
                          console.log("hi");
                          makeOrder(navigation.getParam("res_name"), navigation.getParam("order_array"), navigation.getParam("total_price"));
                          navigation.navigate("HomeScreen");
                        }}
                        style={styles.PaymentBtn}
                    >
                        <Text style={styles.ButtonText}>Pay</Text>
                    </TouchableOpacity>
                      <Text style={{ fontSize: 30, fontFamily: "Unica One", marginLeft: 250, position: "absolute", top: 35, color: "#FFD700"}}>{"$" + navigation.getParam("total_price")}</Text>
                
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
  container: { flex: 1, backgroundColor: "#0a2657",paddingTop: 100},
  CardImg: {
    width: 120,
    height: 120,
    marginLeft: 125,
    marginTop: 50,
    marginBottom: 30,
    zIndex: 1
  },
  CardImgVisa: {
    width: 50,
    height: 40,
    marginLeft: 20,
    position: "absolute",
    bottom: 9
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 230,
    width: "100%"
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 325
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    alignSelf: "center"
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 36
  },
  ButtonText: {
    fontSize: 23,
    color: "#0a2657",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  selectCard: {
    backgroundColor: "#f1f2f6",
    height: 60,
    width: 330,
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 20,
    paddingLeft: 3
  },
  selectCardPress: {
    flex: 1, 
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: "#0a2657",
    borderRadius: 6,
    height: 60,
    width: 330,
    position: "absolute",
    top:0,
    paddingTop: 17,
    
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
});

export default PaymentScreen;
