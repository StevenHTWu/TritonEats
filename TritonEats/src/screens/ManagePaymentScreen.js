import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfo } from "./SettingsScreen";

const ManagePaymentScreen = ({ navigation }) => {
  //const [response, setResponse] = useState();
  
  

  const changeSelect = () => {
    setAlternateSelect((alternateSelect) => !alternateSelect);
  };
  /*
  const array = [
      {cardNum: navigation.getParam('cardNum')},
      {cardNum: "xxxx-xxxx-xxxx-8976"},
      {cardNum: "xxxx-xxxx-xxxx-3421"},
  ]
*/
  var cardNum = null;

  getUserInfo();
  if (cards[0].card_number != null) {
    cardNum = "xxxx-xxxx-xxxx-" + global.cards[0].card_number.substring(12, 16);
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
            {cardNum != null ? (
              /*<TouchableOpacity style={styles.selectCard} onPress={changeSelect}>
                  {alternateSelect && <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 70, height: 40}} >
                    <Image
                                style={styles.CardImgVisa}
                                source={require("../../assets/visa.png")}
                            />
                    </View>
                    <View style={{width: 400, height: 40}} >
                        <Text style={{ fontSize: 20, fontFamily: "Unica One", marginLeft: 20, color: "#0a2657"}}>{cardNum}</Text>
                    </View>
                    
                  </View>}
                  {!alternateSelect && 
                  <View style={styles.selectCardPress}>
                    <View style={{width: 70, height: 40}} >
                    <Image
                                style={styles.CardImgVisa}
                                source={require("../../assets/visa.png")}
                            />
                    </View>
                    <View style={{width: 400, height: 40}} >
                        <Text style={{ fontSize: 20, fontFamily: "Unica One", marginLeft: 20, color: "#0a2657"}}>{cardNum}</Text>
                    </View>
                    
                  </View>}
             </TouchableOpacity>*/
              <Picker
                style={styles.selectCard}
                selectedValue={selectedValue}
                mode="dropdown"
                //style={{ height: 50, width: 400}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                {global.cards.map((arr) => (
                  <Picker.Item
                    label={arr.card_number}
                    value={arr.card_number}
                  />
                ))}
              </Picker>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  global.card = { cardNum: "", expiry: "", cvv: "", name: "" };
                  navigation.navigate("ViewCardFromSettingsScreen");
                }}
                style={styles.AddCardBtn}
              >
                <Text style={styles.ButtonText}>Add Card</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.layer2}>
            <TouchableOpacity
              onPress={() => {
                global.card = selectedValue;
                navigation.navigate("ViewCardFromSettingsScreen");
              }}
              style={styles.PaymentBtn}
            >
              <Text style={styles.ButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
ManagePaymentScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657", paddingTop: 100 },
  CardImg: {
    width: 120,
    height: 120,
    //marginLeft: 125,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
    zIndex: 1,
  },
  CardImgVisa: {
    width: 50,
    height: 40,
    marginLeft: 20,
    position: "absolute",
    bottom: 9,
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 230,
    width: "100%",
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 325,
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 160,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 125,
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 170,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    //marginLeft: 36,
    alignSelf: "center",
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
    //marginLeft: 30,
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 20,
    paddingLeft: 3,
    alignSelf: "center",
  },
  selectCardPress: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#0a2657",
    borderRadius: 6,
    height: 60,
    width: 330,
    position: "absolute",
    top: 0,
    paddingTop: 17,
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

export default ManagePaymentScreen;
