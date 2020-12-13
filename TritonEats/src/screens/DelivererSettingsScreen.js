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
import { Context } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";
import { get } from "mongoose";

import { navigate } from "../navigationRef";

const menu = [{ key: "My Profile", nav: "DelivererProfileScreen" }];

//global.cards = [{}]
global.delivererProfileInfo = {
  name: "tmp",
};

export const getDelivererInfo = async () => {
  console.log("in getuserinfo");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = trackerApi
    .get("/auth/deliverer/userInfo", {
      headers: headers,
    })
    .then((res) => {
      var info = res.data;
      console.log(info);
      delivererProfileInfo.name = info.name;
      return info;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const setDelivererProfile = async (name) => {
  console.log("in setDelivererProfile");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = trackerApi
    .patch(
      "/auth/deliverer/userProfileUpdate",
      {
        name,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log("Updated...");
      getDelivererInfo();
      return;
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
      return null;
    });
};

class DelivererSettingsScreen extends React.Component {
  static contextType = Context;
  constructor() {
    super();
  }
  render() {
    const { signout } = this.context;
    getDelivererInfo();
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

DelivererSettingsScreen.navigationOptions = () => {
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

export default DelivererSettingsScreen;
