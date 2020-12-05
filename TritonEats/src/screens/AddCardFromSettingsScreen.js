import React, { useState, useContext, Component } from "react";
import { Alert } from "react-native";
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
import { navigate } from "../navigationRef";

const three = 3;
const four = 4;
const sixteen = 16;

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
    this.state = { cardNum: card.card_number, cvv: card.cvv, name: card.name, expiration_date: card.expiration_date };
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
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Unica One",
                paddingTop: 5,
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
              autoCorrect={false}
              maxLength={sixteen}
              style={styles.textIn}
              placeholder={"1234567812345678"}
              keyboardType="number-pad"
              defaultValue={card.card_number}
              />

            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 275, height: 35 }}>
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
                  onChangeText={(expiration_date) => this.setState({ expiration_date })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={four}
                  style={styles.textInEXP}
                  placeholder={"MMYY"}
                  keyboardType="number-pad"
                  defaultValue={card.expiration_date}
                />
              </View>
              <View style={{ width: 100, height: 35 }}>
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
                  maxLength={three}
                  secureTextEntry={true}
                  onChangeText={(cvv) => this.setState({ cvv })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInCVV}
                  placeholder={"123"}
                  keyboardType="number-pad"
                  defaultValue={card.cvv}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                position: "absolute",
                top: 200,
              }}
            >
              <View style={{ width: 380, height: 35 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Unica One",
                    paddingLeft: 10,
                  }}
                >
                  CardHolder Name
                </Text>
                <TextInput
                  label="CardHolder Name"
                  //value={name}
                  onChangeText={(name) => this.setState({ name })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textIn}
                  placeholder={"CardHolder Name"}
                  defaultValue={card.name}
                />
              </View>
            </View>

            <View style={styles.layer2}>
              <TouchableOpacity
                onPress={() => {
                    let newCard = {card_number: this.state.cardNum, cvv: this.state.cvv, expiration_date: this.state.expiration_date, name: this.state.name};
                    if (newCard.card_number.length !== 16 || newCard.cvv.length !== 3 || newCard.expiration_date.length !== 4 || newCard.name.length === 0
                      || !digitsOnly(newCard.card_number) || !digitsOnly(newCard.cvv) || !digitsOnly(newCard.expiration_date)) {
                      Alert.alert("Error! Please fill in the details correctly.")
                    } else {
                      //make api call to save data
                      navigate("SettingsScreen");
                    }
                }
                }
                style={styles.AddCardBtn}
              >
                <Text style={styles.ButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const digitsOnly = string => [...string].every(c => '0123456789'.includes(c));

AddCardFromSettingsScreen.navigationOptions = () => {
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
    top: 360,
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
