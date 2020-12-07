import React, { Component } from "react";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import NavBar from "../Components/NavBar";
import { NativeModules } from "react-native";
import { navigate } from "../navigationRef";
import traffic from "../../assets/traffic.png";

class DelivererStatusScreen extends Component {
  // constructor that sets button text to picked up and initializes link
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      link: "",
      address: "",
      apartment: "",
      status: "",
    };
    //binding the two functions so they act on correct object
    this.status_update = this.status_update.bind(this);
    this.map_direction = this.map_direction.bind(this);

    //Update status in database to Pending and get directions to restaraunt.
  }

  //set link to right address
  map_direction = () => {
    console.log("Setting direction");
    switch (order.restaurant) {
      case "Pines":
        this.setState({ link: "https://goo.gl/maps/dZBAF9C48MYWjnxDA" });
        break;
      case "64 Degrees":
        this.setState({ link: "https://goo.gl/maps/e9Vacp3cZsWryBCh7" });
        break;
      case "Cafe Ventanas":
        this.setState({ link: "https://goo.gl/maps/QxAVFtB9axgYqrAB9" });
        break;
      case "OceanView":
        this.setState({ link: "https://goo.gl/maps/LFDDc3Dtq6vHa9U37" });
        break;
      case "Foodworx":
        this.setState({ link: "https://goo.gl/maps/1bgKS1jvH6GMzLkc6" });
        break;
      case "Club Med":
        this.setState({ link: "https://goo.gl/maps/azDZHitkQAnqYg8P7" });
        break;
      case "Canyon Vista":
        this.setState({ link: "https://goo.gl/maps/QSXhZ5cVwVx138cw7" });
        break;
    }
  };

  //set the order status as it should be
  getOrderStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("Trying to get ORDER INFO ");
    const response = await trackerApi
      .get(
        `/orderer/orderInfoAsDeliverer/${order.order_id}`,

        { headers: headers }
      )
      .then((res) => {
        console.log("GOT order info");
        this.setState({ status: res.data.status });
      });
  };

  //get the directions for a given orderer
  orderer_direction = async () => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("Getting User Info...");
    console.log(order.orderer_id);
    const response = await trackerApi
      .get(`/orderer/userInfoAsDeliverer/${order.orderer_id}`, {
        headers: headers,
      })
      .then((response) => {
        var userInfo = response.data;

        var address = userInfo.address;
        var residence = userInfo.residence;
        var apartment = userInfo.apartment;

        this.getOrderStatus();
        this.setState({
          link: `https://www.google.com/maps/place/${residence.replace(
            /\s+/g,
            "+"
          )}+${address.replace(/\s+/g, "+")}`,
          apartment: apartment,
          residence: residence,
          address: address,
        });
      });
  };

  //update the status within
  status_update = async (text) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("Attempting to update delivery status to " + text);
    const response = await trackerApi
      .patch(
        "/auth/deliveryStatusUpdate",
        {
          status: text,
          order_id: order.order_id,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log("Finished updating..");
        if (text == "Delivered") {
          console.log("We are delivering!");
          navigate("DelivererHomeScreen");
        } else if (text === "Picked Up") {
          console.log("We are picking up!");
          this.orderer_direction();
        } else {
          console.log("We are ????!");
        }
      });
  };

  componentDidMount = () => {
    this.map_direction();
    this.getOrderStatus(); //set status
  };

  screenGenerator = () => {
    console.log("=======================");
    console.log("Generating screen");
    console.log(this.state.status);
    console.log(this.state.link);
    if (this.state.status == "pending" || this.state.status == "") {
      console.log("Checked pending!");

      var display = (
        <View style={styles.MainContainer}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 30 }}>
              Pick Up From {order.restaurant}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(this.state.link)}
            style={styles.directionStyle}
          >
            <Text style={styles.TextStyle}>Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Picked up!");

              this.status_update("Picked Up");
            }}
            style={styles.StatusBtn}
          >
            <Text style={styles.ButtonText}>Picked up?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      this.state.text === "Picked Up" ||
      this.state.status === "Picked Up"
    ) {
      console.log("Successfully changed...");
      console.log(this.state.apartment);
      console.log(this.state.residence);

      var display = (
        <View style={styles.MainContainer}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 30 }}>
              Deliver To {this.state.apartment} {this.state.residence}{" "}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(this.state.residence + this.state.address)
            }
            style={styles.directionStyle}
          >
            <Text style={styles.TextStyle}>Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Delivered!");

              this.status_update("Delivered");
            }}
            style={styles.StatusBtn}
          >
            <Text style={styles.ButtonText}>Delivered?</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      console.log("FAIL!");
      console.log(this.state.text);
    }

    return display;
  };

  render() {
    return <View style={styles.MainContainer}>{this.screenGenerator()}</View>;
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
  },
  TextStyle: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
    backgroundColor: "#0a2657",
    margin: "10%",
    marginBottom: "15%",
    padding: "6%",
    borderRadius: 50,
  },
  directionStyle: {
    alignSelf: "center",
    fontFamily: "Unica One",
    backgroundColor: "#0a2657",
    margin: 10,
    borderRadius: 50,
  },
  StatusBtn: {
    backgroundColor: "#296906",
    marginBottom: "40%",
    width: "70%",
    height: 200,
    paddingHorizontal: "10%",
    marginHorizontal: "16%",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: "10%",
  },
  ButtonText: {
    fontSize: 34,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
    flex: 1,
    textAlign: "center",
    paddingTop: "1%",
    paddingBottom: "1%",
    marginTop: "30%",
    marginBottom: "-20%",
  },
});

export default DelivererStatusScreen;
