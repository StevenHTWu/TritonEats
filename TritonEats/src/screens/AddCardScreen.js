import React, { useState, useContext, Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
import { AsyncStorage } from "react-native";

const addCard = async (card_number, cvv, expiration_date) => {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await trackerApi.post(
    "/auth/customerPayment",
    {
      card_number,
      cvv,
      expiration_date,
    },
    {
      headers: headers,
    }
  );
};

class AddCardScreen extends Component {
  //= ({ navigation }, props) => {
  /*
  const [name1, onChangeText1] = React.useState(' CardHolder Name');
  const [cardnum, onChangeText2] = React.useState(' 1234-5678-1234-5678');
  const [date1, onChangeText3] = React.useState(' MM/YY');
  const [cvv1, onChangeText4] = React.useState(' CVV');
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const data = {name:"hello", age:"15"}
  */
  constructor(props) {
    super(props);
    this.state = { cardNum: "1234-5678-1234-5678" };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Image
            style={styles.CardImg}
            source={require("../../assets/CardImg.png")}
          />
          <View style={styles.layer1}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Unica One",
                  paddingLeft: 10,
                }}
              >
                Card Number
              </Text>
              <TextInput
                label="Card Number"
                //value={cardNum}
                onChangeText={(cardNum) => this.setState({ cardNum })}
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
                style={styles.textIn}
                require
                placeholder={"1234-5678-1234-5678"}
                keyboardType="number-pad"
              />
            </View>

            <View style={{ flexDirection: "row", height: "15%", marginTop: "3%"}}>
              <View style={{ width: "70%", height: 35 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingTop: 5,
                    paddingLeft: 10,
                  }}
                >
                  Expiry Date
                </Text>
                <TextInput
                  label="Exp. Date"
                  //value={date}
                  onChangeText={(date) => this.setState({ date })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInEXP}
                  placeholder={"MM/YY"}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ width: "30%", height: 35 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingTop: 5,
                    paddingLeft: 10,
                  }}
                >
                  CVV
                </Text>
                <TextInput
                  label="CVV"
                  //value={cvv}
                  keyboardType="number-pad"
                  secureTextEntry={true}
                  onChangeText={(cvv) => this.setState({ cvv })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInCVV}
                  placeholder={"CVV"}
                />
              </View>
            </View>
            
              <View style={{ width: "100%", height: 35, marginTop: "2%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingLeft: 10,
                  }}
                >
                  Name
                </Text>
                <TextInput
                  label="Name"
                  //value={name}
                  onChangeText={(name) => this.setState({ name })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textIn}
                  placeholder={"CardHolder Name"}
                />
              </View>
              

            <View style={styles.layer2}>
              <TouchableOpacity
                onPress={() => {
                  if (
                    this.state.cardNum != null &&
                    this.state.date != null &&
                    this.state.cvv != null &&
                    this.state.name != null &&
                    this.state.cardNum.length == 16 &&
                    this.state.cvv.length == 3 &&
                    this.state.date.length == 4
                  ) {
                    addCard(
                      this.state.cardNum,
                      this.state.cvv,
                      this.state.date
                    );
                    navigate("PaymentScreen");
                  }
                }}
                style={styles.AddCardBtn}
              >
                <Text style={styles.ButtonText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddCardScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657" },
  CardImg: {
    width: 120,
    height: 120,
    marginTop: "25%",
    zIndex: 1,
    alignSelf: "center"
  },
  layer1: {
    borderRadius: 50,
    height: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    paddingTop: "20%",
    top: "26%",
    width: "100%",
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: "74%",
    zIndex: 1
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: "8%",
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

export default AddCardScreen;
