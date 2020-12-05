import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import HistoricalOrder from "../Components/HistoricalOrder";
import { AsyncStorage } from "react-native";

import trackerApi from "../api/tracker";
import Loader from "../Components/Loader";

class OrderHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isEmpty: false,
      OrderHistory: [],
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    const AuthStr = "Bearer ".concat(token);

    const response = await trackerApi.get("/auth/history", {
      headers: { Authorization: AuthStr },
    });

    console.log("-----------------------");
    console.log(response.data);
    console.log("-----------------------");
    if (response.data.length == 0) {
      this.setState({
        isLoading: false,
        isEmpty: true,
      });
    } else {
      this.setState({
        isLoading: false,
        isEmpty: false,
        OrderHistory: response.data,
      });
    }
  }

  render() {
    //connect to database
    //get the order history through api
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <Loader loading={this.state.isLoading} />
        {this.state.isEmpty ? (
          <>
            <Text style={styles.text}>Order History</Text>
            <Text style={styles.emptyMessage}>
              Order history is empty for current user.
            </Text>
          </>
        ) : (
          <View style={styles.main}>
            <Text style={styles.text}>Order History</Text>
            <FlatList
              style={styles.main}
              data={this.state.OrderHistory}
              renderItem={({ item }) => (
                <HistoricalOrder
                  orderId={item.order_id}
                  items={item.order_items}
                  restaurant={item.restaurant_name}
                  timeOrdered={item.order_placement_time}
                  timeDelivered={item.order_completion_time}
                  deliverer={item.deliverer_id}
                  price={item.total_price}
                />
              )}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

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

export default OrderHistoryScreen;
