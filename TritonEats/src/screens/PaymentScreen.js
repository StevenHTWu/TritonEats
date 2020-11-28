import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Keyboard,  TouchableWithoutFeedback } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const [name1, onChangeText1] = React.useState(' CardHolder Name');
  const [cardnum, onChangeText2] = React.useState(' 1234-5678-1234-5678');
  const [date1, onChangeText3] = React.useState(' MM/YY');
  const [cvv1, onChangeText4] = React.useState(' CVV');
  const [billAddr1, onChangeText5] = React.useState(' Billing Address');
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billAddr, setBillAddr] = useState("");


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
              style={styles.CardImg}
              source={require("../../assets/CardImg.png")}
              
        />
          <View style={styles.layer1}>
          
            
            <Text style={{ fontSize: 20, fontFamily: "Unica One", paddingTop: 5, paddingLeft: 10}}>
                  Card Number
                </Text>
              <TextInput
                label="Card Number"
                value={cardNum}
                onChangeText={setCardNum}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textIn}
                placeholder={cardnum}
                keyboardType="number-pad"
              />
            
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: 275, height: 35}} >
                <Text style={{ fontSize: 20, fontFamily: "Unica One", paddingTop: 5, paddingLeft: 10}}>
                  Expiry Date
                </Text>
                <TextInput
                  label="Exp. Date"
                  value={date}
                  onChangeText={setDate}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInEXP}
                  placeholder={date1}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{width: 100, height: 35}} >
                <Text style={{ fontSize: 20, fontFamily: "Unica One", paddingTop: 5, paddingLeft: 10}}>
                  CVV
                </Text>
                <TextInput
                  label="CVV"
                  value={cvv}
                  keyboardType="number-pad"
                  onChangeText={setCvv}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textInCVV}
                  placeholder={cvv1}
                />
              </View>
            
            </View>
            <View style={{flex: 1, flexDirection: 'row', position: "absolute", top: 200}}>
              <View style={{width: 380, height: 35}} >
              <Text style={{ fontSize: 20, fontFamily: "Unica One", paddingLeft: 10}}>
                    Name
                  </Text>
              <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textIn}
                placeholder={name1}
              />
              </View>
            </View>

          
          <View style={styles.layer2}>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={styles.PaymentBtn}
            >
                <Text style={styles.ButtonText}>Pay</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 30, fontFamily: "Unica One", position: "absolute", left: 250, top: 36, color: "#FFD700"}}>
                    $ 12.00
              </Text>
          </View>
          
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657",},
  CardImg: {
    width: 120,
    height: 120,
    marginLeft: 125,
    marginTop: 50,
    marginBottom: 30,
    zIndex: 1
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 130
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 325
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 100,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 40
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
