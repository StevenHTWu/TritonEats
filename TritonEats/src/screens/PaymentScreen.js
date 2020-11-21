import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { PaymentView } from "../Components/PaymentView";
import AuthForm from "../Components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import axios from "axios";

const PaymentScreen = ({ navigation }) => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const [name1, onChangeText1] = React.useState(' Card Name');
  const [cardnum, onChangeText2] = React.useState(' Card Number');
  const [date1, onChangeText3] = React.useState(' Exp. Date');
  const [cvv1, onChangeText4] = React.useState(' CVV');
  const [billAddr1, onChangeText5] = React.useState(' Billing Address');
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billAddr, setBillAddr] = useState("");

  return (
    <View style={styles.container}>
      <Image
            style={styles.CardImg}
            source={require("../../assets/CardImg.png")}
      />
      <View style={styles.LogoRow}>
      
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textIn}
          placeholder={name1}
        />
        <TextInput
          label="Card Number"
          value={cardNum}
          onChangeText={setCardNum}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textIn}
          placeholder={cardnum}
        />
          <TextInput
            label="Exp. Date"
            value={date}
            onChangeText={setDate}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInEXP}
            placeholder={date1}
          />
          <TextInput
            label="CVV"
            value={cvv}
            onChangeText={setCvv}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInCVV}
            placeholder={cvv1}
          />
        <TextInput
          label="Billing Address"
          value={billAddr}
          onChangeText={setBillAddr}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textIn}
          placeholder={billAddr1}
        />
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.PaymentBtn}
        >
          <Text style={styles.ButtonText}>Submit Payment</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1},
  CardImg: {
    width: 120,
    height: 120,
    marginLeft: 125,
    marginTop: 50,
    marginBottom: 30
  },
  PaymentBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 100,
    paddingVertical: 11,
    width: 200,
    height: 50,
    marginTop: 80,
    marginLeft: "23.5%",
  },
  ButtonText: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  TitleFont: {
    fontSize: 45,
    fontFamily: "Unica One",
    paddingLeft: 120,
    marginTop: 45
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
});

export default PaymentScreen;
