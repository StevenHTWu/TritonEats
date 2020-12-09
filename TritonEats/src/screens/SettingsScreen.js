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
import { Context
 } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";
import { get } from "mongoose";

import { navigate } from "../navigationRef";

const menu = [
  { key: "My Profile", nav: "ProfileScreen" },
  { key: "Manage Address", nav: "AddressScreen" },
  { key: "Add Payment Method", nav: "AddCardFromSettingsScreen" },
  { key: "View Payment Method(s)", nav: "ManagePaymentScreen" },
];

//global.cards = [{}]
global.ordererProfileInfo = {
  name: "tmp",
  email: "tmp",
}
global.ordererPaymentMethods = [
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
  ]
global.ordererAddressInfo = {
  apartment: "100",
  residence: "ERC Building 1",
  address: "Gilman Drive",
  password: "1234",
  password1: "",
  password2: "",
};


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
      var info = res.data;
      console.log(info);
      ordererProfileInfo.name = info.name;
      ordererProfileInfo.email = info.email;
      ordererPaymentMethods.payment_methods = info.payment_methods;
      ordererAddressInfo.address = info.address;
      ordererAddressInfo.residence = info.residence;
      ordererAddressInfo.apartment = info.apartment;
      return info;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const setUserAddress = async (address, apartment, residence) => {
  console.log("in setUserAddress");
  console.log(address);
  console.log(apartment);
  console.log(residence);
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (ordererAddressInfo.address != address) {
    const responseAddr = trackerApi
      .patch(
        "/auth/orderer/userAddressUpdate",
        {
          address,

        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("Updated...");
        getUserInfo();

      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return null;
      });
    }


    if (ordererAddressInfo.apartment != apartment) {
      const responseApt = trackerApi
      .patch(
        "/auth/orderer/userApartmentUpdate",
        {

          apartment,

        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("Updated...");
        getUserInfo();

      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return null;
      });
    }

    if (ordererAddressInfo.residence) {
      const responseRes = trackerApi
      .patch(
        "/auth/orderer/userResidenceUpdate",
        {

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
    }
};


export const setUserProfile = async (name) => {
  console.log("in setUserProfileInfo");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = trackerApi
    .patch(
      "/auth/orderer/userProfileUpdate",
      {
        name,
        
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




class SettingsScreen extends React.Component {
  static contextType = Context;
  constructor() {
    super();
  }
  render() {
    const { signout } = this.context;
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
                navigate(item.nav);
              }}
            >
              {item.key}
            </Text>
          )}
        />
  
        <Button title="Sign Out" onPress={signout} />
      </SafeAreaView>
    );

  }
}


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
