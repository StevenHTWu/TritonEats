import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { PaymentView } from "../Components/PaymentView";
import axios from "axios";

const PaymentScreen = () => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const cartInfo = {
    id: "5eruyt35eggr76476236523t3",
    description: "Breakfast platter",
    amount: 1,
  };

  return (
    <View style={styles.container}>
      <PaymentView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100 },
  navigation: { flex: 2, backgroundColor: "red" },
  body: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  footer: { flex: 1, backgroundColor: "cyan" },
});

export default PaymentScreen;
