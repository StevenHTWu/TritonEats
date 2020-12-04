import React, { Component, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";

// const getDelivererStatus = async () => {
//   const token = await AsyncStorage.getItem("token");
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };

//   trackerApi
//     .get("/auth/orderStatus", {
//       headers: headers,
//     })
//     .then((res) => {
//       console.log(res.data.status + "response status");
//       this.setState({ status: res.data.status });
//       this.setState({ delivererName: res.data.name });
//       this.setState({ delivererPhone: res.data.num });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

var statusText = "";
// console.log(this.state.status + "111");

// console.log(this.state.status + "hey hey hey");

class OrderStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "", delivererName: "", delivererPhone: "" };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    trackerApi
      .get("/auth/orderStatus", {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.status + "response status");
        this.setState({ status: res.data.status });
        this.setState({ delivererName: res.data.name });
        this.setState({ delivererPhone: res.data.num });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.status + "this state here in render");
    switch (this.state.status) {
      case "pending":
        var statusText = "Waiting for Tritons to pick up!";
        break;
      case "picked up":
        var statusText =
          "Your food has been picked up! It will arrive in 20 minutes";
        break;
      default:
        var statusText = "";
    }

    console.log(statusText + "this is statusText");
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.status}>
            Thank you for ordering from TritonEats! Your food will be here
            shortly!
          </Text>
        </View>
        <View style={styles.deliverStatus}>
          <Text>{statusText}</Text>
        </View>
      </>
    );
  }
}

OrderStatusScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  status: {
    fontSize: 55,
    fontFamily: "Unica One",
  },
  deliverStatus: {},
});

export default OrderStatusScreen;
