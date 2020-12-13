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
import Loader from "../Components/Loader";
import * as Progress from "react-native-progress";
import { navigate } from "../navigationRef";

const complete = async () => {
  console.log("in complete block");
  const token = await AsyncStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  await trackerApi.post(
    "/auth/complete",
    {},
    {
      headers: headers,
    }
  );
};

class OrderStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status: "",
      delivererName: "",
      delivererPhone: "",
    };
  }

  async componentDidMount() {
    const getDelivererStatus = async () => {
      console.log("get mount");
      this.setState({ isLoading: true });
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
          console.log(res);
          this.setState({ isLoading: false });
          this.setState({ status: res.data.status });
          this.setState({ delivererName: res.data.name });
          this.setState({ delivererPhone: res.data.num });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      getDelivererStatus();
      console.log(this.state.status + "curStats");
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    console.log(this.state.status + "this state here in render");
    switch (this.state.status) {
      case "pending":
        var statusText = "Waiting for Tritons to pick up!";
        var progressBar = 0.33;
        break;
      case "Picked Up":
        var statusText =
          "Your food has been Picked up! It will arrive in 20 minutes";
        var progressBar = 0.66;
        break;
      case "Delivered":
        var statusText =
          "Your food has arrived! Please pick up your food before it gets cold!";
        break;
      default:
        var statusText = "";
    }

    console.log(statusText + "this is statusText");
    return (
      <>
        <Loader loading={this.state.isLoading} />
        <Text
          style={{
            fontSize: 49,
            paddingTop: 40,
            fontFamily: "Unica One",
            textAlign: "center",
          }}
        >
          Order Status
        </Text>
        {this.state.status == "" ? (
          <View style={styles.container}>
            <Text style={styles.status}>
              No order is placed! Are you craving for food?
            </Text>
          </View>
        ) : (
          <>
            {this.state.status == "Delivered" ? (
              <>
                <View style={styles.container}>
                  <Text style={styles.status}>
                    Thank you for ordering from TritonEats!
                  </Text>
                </View>
                <Text style={styles.tracking}>Delivery Tracking</Text>
                <Image
                  style={styles.checkMark}
                  source={require("../../assets/check.png")}
                />
                <Progress.Bar
                  style={{ alignSelf: "center", marginTop: 20, borderWidth: 2 }}
                  progress={1}
                  width={300}
                  color="rgba(0, 223, 118, 1)"
                />
              </>
            ) : (
              <>
                <View style={styles.container}>
                  <Text style={styles.status}>
                    Thank you for ordering from TritonEats! Your food will be
                    here shortly!
                  </Text>
                </View>
                <Text style={styles.tracking}>Delivery Tracking</Text>
                <Progress.Bar
                  style={{ alignSelf: "center", marginTop: 50, borderWidth: 2 }}
                  progress={progressBar}
                  width={300}
                  color="#0a2657"
                />
              </>
            )}

            <View style={styles.deliverStatus}>
              <View style={{ borderBottomWidth: 1 }}>
                <Text style={styles.deliverStatusText}>{statusText}</Text>
              </View>
              <Text style={styles.delivererInfo}>
                Deliverer name: {this.state.delivererName}
              </Text>
            </View>
            {this.state.status == "Delivered" ? (
              <TouchableOpacity
                onPress={() => {
                  complete();
                  navigate("HomeScreen");
                }}
                style={styles.completeBtn}
              >
                <Text style={styles.completeText}>Complete</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </>
        )}
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
    backgroundColor: "#0a2657",
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  status: {
    fontSize: 25,
    fontFamily: "Unica One",
    color: "#FFD700",
    textAlign: "center",
  },
  tracking: {
    fontSize: 25,
    fontFamily: "Unica One",
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: "900",
  },
  deliverStatus: {
    marginTop: 50,
    borderWidth: 3,
    alignSelf: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  deliverStatusText: {
    fontSize: 25,
    fontFamily: "Unica One",
    textAlign: "center",
    paddingBottom: 10,
  },
  delivererInfo: {
    fontSize: 25,
    fontFamily: "Unica One",
    paddingTop: 10,
  },
  checkMark: {
    marginTop: 30,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  completeBtn: {
    alignSelf: "center",
    backgroundColor: "rgba(0, 223, 118, 1)",
    padding: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  completeText: {
    fontFamily: "Unica One",
    fontSize: 25,
  },
});

export default OrderStatusScreen;
