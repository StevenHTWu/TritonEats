import React, { useContext, Component, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
  FlatList,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";
import { get } from "mongoose";

const menu = [
  { key: "My Profile", nav: "ProfileScreen" },
  { key: "Manage Address", nav: "AddressScreen" },
  { key: "Add Payment Method", nav: "AddCardFromSettingsScreen" },
  { key: "Manage Payment Method(s)", nav: "ManagePaymentScreen" },
  { key: "Change Password", nav: "PasswordScreen" },
];

//global.cards = [{}]
global.object = {
  name: "tmp",
  email: "tmp",
  phone_num: "1234567890",
  payment_methods: [
    {
      card_number: "1234567812345678",
      cvv: "456",
      expiration_date: "5678",
      name: "Card 1",
    },
    {
      card_number: "1234567812341111",
      cvv: "123",
      expiration_date: "1234",
      name: "Card 2",
    },
  ],
  apartment: "100",
  residence: "ERC Building 1",
  address: "Gilman Drive",
  password: "1234",
  password1: "",
  password2: "",
};
global.cards = object.payment_methods;

export const getUserInfo = async () => {
  console.log("in getuserinfo");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = trackerApi
    .get("/auth/orderer/userInfo", {
      headers: headers,
    })
    .then((res) => {
      var userInfo = res.data;
      var info = userInfo[0];
      object.name = info.name;
      object.email = info.email;
      object.phone_num = info.phone_num;
      object.payment_methods = info.payment_methods;
      object.password = object.password; //fix this!
      object.password1 = object.password1; //fix this!
      object.password2 = object.password2; //fix this!
      object.address = info.address;
      object.residence = info.residence;
      object.apartment = info.apartment;
      return userInfo;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const setUserAddress = async (address, apartment, residence) => {
  console.log("in setUserAddress");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = trackerApi
    .patch(
      "/auth/orderer/userAddressUpdate",
      {
        address,
        apartment,
        residence,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log("Updated...");
      getUserInfo();
      return;
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
      return null;
    });
};

const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  getUserInfo();
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text
        style={{
          fontSize: 49,
          paddingTop: 40,
          fontFamily: "Unica One",
          textAlign: "center",
        }}
      >
        Settings
      </Text>

      <FlatList
        style={styles.list}
        data={menu}
        renderItem={({ item }) => (
          <Text
            style={styles.text}
            onPress={() => {
              global.card = { cardNum: "", expiry: "", cvv: "", name: "" };
              navigation.navigate(item.nav);
            }}
          >
            {item.key}
          </Text>
        )}
      />

      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#0a2657",
    color: "#FFD700",
    marginBottom: 1,
  },
  list: {
    paddingTop: 30,
    marginBottom: 1,
  },
});

export default SettingsScreen;
