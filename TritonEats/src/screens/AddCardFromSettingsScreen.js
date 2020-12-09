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

class AddCardFromSettingsScreen extends Component {
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
  this.state = {
    cardNum: "",
    wrongCardNum: false,
    wrongDate: false,
    wrongCVV: false,
    wrongName: false,
    shortCardNum: false,
    wrongLengthDate: false,
    wrongLengthCVV: false,
    date: "    "

  };
}

  normalizeInput = (value, previousValue) => {
    console.log("Normalizing...");
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 8) return `${currentValue.slice(0, 4)}-${currentValue.slice(4)}`;
      if (cvLength < 12) return `${currentValue.slice(0, 4)}-${currentValue.slice(4, 8)}}-${currentValue.slice(8)}`;
      if (cvLength < 16) return `${currentValue.slice(0, 4)}-${currentValue.slice(4, 8)}}-${currentValue.slice(8, 12)}}-${currentValue.slice(12)}`;
      return `${currentValue.slice(0, 4)}-${currentValue.slice(4, 8)}}-${currentValue.slice(8, 12)}}-${currentValue.slice(12)}`;
    }
  };
  

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
                maxLength={16}
                onChangeText={(cardNum) =>  { 
                  this.setState({ cardNum }) }
              }
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
                style={styles.textIn}
                require
                placeholder={"1234-5678-1234-5678"}
                keyboardType="number-pad"
              />
              {this.state.wrongCardNum == true ? (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Unica One",
                    color: "red",
                    marginLeft: "2%",
                    marginTop: "1%",
                  }}
                >
                  Card number is not entered.
                </Text>
              ) : (
                <></>
              )}

              {this.state.shortCardNum == true ? (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Unica One",
                    color: "red",
                    marginLeft: "2%",
                    marginTop: "1%",
                  }}
                >
                  Card number should be 16 digits.
                </Text>
              ) : (
                <></>
              )}
            </View>

            <View
              style={{ flexDirection: "row", height: "12%", marginTop: "4%" }}
            >
              <View style={{ width: "30%", height: "40%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingTop: 5,
                    paddingLeft: 10,
                  }}
                >
                  Expiry Month
                </Text>
                <TextInput
                  label="Exp. Month"
                  //value={date}
                  onChangeText={(month) => this.setState({ date: month+this.state.date.substring(3,5) })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInEXP}
                  placeholder={"MM"}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                {this.state.wrongDate == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "3.5%",
                      marginTop: "1%",
                    }}
                  >
                    Expiry Month is not entered.
                  </Text>
                ) : (
                  <></>
                )}

                {this.state.wrongLengthDate == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "2.1%",
                      marginTop: "1%",
                    }}
                  >
                   2 digits MM.
                  </Text>
                ) : (
                  <></>
                )}
              </View>


              <View style={{ width: "30%", height: "40%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingTop: 5,
                    paddingLeft: 10,
                  }}
                >
                  Expiry Year
                </Text>
                <TextInput
                  label="Exp. Year"
                  //value={date}
                  onChangeText={(year) => this.setState({ date: this.state.date.substring(0,2) + year })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInEXP}
                  placeholder={"YY"}
                  keyboardType="number-pad"
                  maxLength={2}
                />
                {this.state.wrongDate == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "3.5%",
                      marginTop: "1%",
                    }}
                  >
                    Expiry Year is not entered.
                  </Text>
                ) : (
                  <></>
                )}

                {this.state.wrongLengthDate == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "2.1%",
                      marginTop: "1%",
                    }}
                  >
                    2 digits YY.
                  </Text>
                ) : (
                  <></>
                )}
              </View>


              <View style={{ width: "40%", height: "40%" }}>
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
                  maxLength={3}
                  keyboardType="number-pad"
                  secureTextEntry={true}
                  onChangeText={(cvv) => this.setState({ cvv })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInCVV}
                  placeholder={"CVV"}
                />
                {this.state.wrongCVV == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "5%",
                      marginTop: "1%",
                    }}
                  >
                    CVV is not entered.
                  </Text>
                ) : (
                  <></>
                )}

                {this.state.wrongLengthCVV == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Unica One",
                      color: "red",
                      marginLeft: "5%",
                      marginTop: "1%",
                    }}
                  >
                    CVV should be 3 digits.
                  </Text>
                ) : (
                  <></>
                )}
              </View>
            </View>

            <View style={{ width: "100%", height: "15%", marginTop: "6%" }}>
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
              {this.state.wrongName == true ? (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Unica One",
                    color: "red",
                    marginLeft: "2.1%",
                    marginTop: "1%",
                  }}
                >
                  Cardholder Name is not entered.
                </Text>
              ) : (
                <></>
              )}
            </View>

            <View style={styles.layer2}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ wrongCardNum: false });
                  this.setState({ wrongDate: false });
                  this.setState({ wrongCVV: false });
                  this.setState({ wrongName: false });
                  this.setState({ shortCardNum: false });
                  this.setState({ wrongLengthDate: false });
                  this.setState({ wrongLengthCVV: false });
                  if (this.state.cardNum == "") {
                    this.setState({ wrongCardNum: true });
                  } else if (this.state.cardNum.length < 16) {
                    this.setState({ shortCardNum: true });
                  }
                  console.log("DATE");
                  console.log(this.state.date);
                  if (this.state.date.includes(" ")) {
                    
                    this.setState({ wrongDate: true });
                  } else if (
                    this.state.date.length < 4 ||
                    this.state.date.length > 4
                  ) {
                    this.setState({ wrongLengthDate: true });
                  }
                  if (this.state.cvv == null) {
                    this.setState({ wrongCVV: true });
                  } else if (
                    this.state.cvv.length < 3 ||
                    this.state.cvv.length > 3
                  ) {
                    this.setState({ wrongLengthCVV: true });
                  }
                  if (this.state.name == null) {
                    this.setState({ wrongName: true });
                  }

                  if (
                    this.state.cardNum != null &&
                    this.state.date != null &&
                    this.state.cvv != null &&
                    this.state.name != null &&
                    this.state.cardNum.length == 16 &&
                    this.state.cvv.length == 3 &&
                    this.state.date.length == 4
                  ) {
                    console.log(this.state.date);
                    addCard(
                      this.state.cardNum,
                      this.state.cvv,
                      this.state.date
                    );
                    navigate("SettingsScreen");
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

AddCardFromSettingsScreen.navigationOptions = () => {
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
    alignSelf: "center",
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
    zIndex: 1,
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

export default AddCardFromSettingsScreen;
