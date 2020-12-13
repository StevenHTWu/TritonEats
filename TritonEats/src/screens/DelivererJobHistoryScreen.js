import React, { Component } from "react";
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
  AsyncStorage,
} from "react-native";
import trackerApi from "../api/tracker";
import { SafeAreaView } from "react-navigation";
import DelivererHistoricalOrder from "../Components/DelivererHistoricalOrder";
import Loader from "../Components/Loader";

class DelivererJobHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      JobHistory: [],
    };
    console.log("heyheyhey");
  }

  async componentDidMount() {
    const getOrderHistory = async () => {
      const token = await AsyncStorage.getItem("token");
      const AuthStr = "Bearer ".concat(token);

      const response = await trackerApi.get("/auth/delivererHistory", {
        headers: { Authorization: AuthStr },
      });

      // console.log("-----------------------");
      // console.log(response.data);
      // console.log("-----------------------");

      if (response.data.length == 0) {
        this.setState({
          isLoading: false,
          isEmpty: true,
        });
      } else {
        this.setState({
          isLoading: false,
          isEmpty: false,
          JobHistory: response.data,
        });
      }
    };
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      getOrderHistory();
    });
  }

  render() {
    //connect to database
    //get the order history through api
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <Loader loading={this.state.isLoading} />
        <View style={styles.main}>
          <Text style={styles.text}>Job History</Text>
          {this.state.isEmpty ? (
            <Text style={styles.emptyMessage}>
              You haven't completed any deliveries! Once you complete one, a
              record will show up here.
            </Text>
          ) : (
            <FlatList
              style={styles.main}
              data={this.state.JobHistory}
              renderItem={({ item }) => (
                <DelivererHistoricalOrder
                  orderId={item.order_id}
                  price={item.total_price}
                  items={item.order_items}
                  restaurant={item.restaurant_name}
                  timeOrdered={item.order_placement_time}
                  timeDelivered={item.order_completion_time}
                  orderer={item.orderer_id}
                />
              )}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
DelivererJobHistoryScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  main: {
    marginTop: 0,
    marginBottom: 90,
    width: "100%",
  },
  text: {
    fontSize: 30,
    fontFamily: "Unica One",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  emptyMessage: {
    fontSize: 35,
    fontFamily: "Unica One",
    textAlign: "center",
    paddingTop: "20%",
  },
});

export default DelivererJobHistoryScreen;
