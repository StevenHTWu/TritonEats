import React, { Component } from "react";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import NavBar from "../Components/NavBar";
import { NativeModules } from "react-native";
import { navigate } from "../navigationRef";

class DelivererStatusScreen extends Component {
  // constructor that sets button text to picked up and initializes link
  constructor(props) {
    super(props);
    this.state = {
      text: "Picked Up",
      link: "",
    };
    //binding the two functions so they act on correct object
    this.status_update = this.status_update.bind(this);
    this.map_direction = this.map_direction.bind(this);

    //Update status in database to Pending and get directions to restaraunt.
    this.status_update("Pending");
    this.map_direction();
  }
  map_direction = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await trackerApi.post(
      "/mapDirection",
      { token },
      { headers: headers }
    );
    this.setState({ link: response });
  };
  status_update = async (text) => {
    const token = await AsyncStorage.getItem("token");
    const response = await trackerApi.patch(
      "/deliveryStatusUpdate",
      { token },
      {
        headers: { status: this.state.text },
      }
    );
    if (this.state.text == "Delivered") {
      navigate("DelivererHomeScreen");
    }
    if (text != "Pending") {
      this.setState({ text: text });
    }
    this.map_direction();
  };
  render() {
    //On click of the url the link would open.
    //On clicking of the button the text would change to delivered and the status would be updated to Picked up.
    //On clicking of button second time database would be notified of complete delivery and you would be redirected to home page.
    return (
      <>
        <View style={styles.MainContainer}>
          <Text
            style={styles.TextStyle}
            onPress={() => Linking.openURL(this.state.link)}
          >
            Directions
          </Text>
        </View>
        <TouchableOpacity
          onClick={() => {
            this.status_update("Delivered");
          }}
          style={styles.StatusBtn}
        >
          <Text style={styles.ButtonText}>{this.state.text}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
  },
  TextStyle: {
    fontSize: 20,
    color: "#0a2657",
    textDecorationLine: "underline",
  },
  StatusBtn: {
    position: "absolute",
    backgroundColor: "#0a2657",
    bottom: 0,
    width: "100%",
    height: 45,
    //marginLeft: 36
  },
  ButtonText: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
});

export default DelivererStatusScreen;
