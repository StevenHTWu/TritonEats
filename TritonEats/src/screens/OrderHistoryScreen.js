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
      OrderHistory: [],
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    console.log("-----------------------", token);
    const response = await trackerApi.get(
      "restaurantMenu/" + CurrentCart.viewing_restaurant
    );

    // console.log("-----------------------");
    // console.log(response.data[0].lunch_menu);
    // console.log("-----------------------");

    if (typeof response.data[0].lunch_menu !== "undefined") {
      this.setState({
        isLoading: false,
        ResaturantMenu: response.data[0].lunch_menu,
      });
    } else if (typeof response.data[0].breakfast_menu !== "undefined") {
      this.setState({
        isLoading: false,
        ResaturantMenu: response.data[0].breakfast_menu,
      });
    } else if (typeof response.data[0].dinner_menu !== "undefined") {
      this.setState({
        isLoading: false,
        ResaturantMenu: response.data[0].dinner_menu,
      });
    }
  }

  render() {
    //connect to database
    //get the order history through api
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <View style={styles.main}>
          <Text style={styles.text}>Order History</Text>
          <FlatList
            style={styles.main}
            data={[
              {
                items: [
                  { item: "Triton Burger", price: "8.00", qty: "1" },
                  { item: "Fries", price: "6.00", qty: "2" },
                ],
                timeOrdered: "01/01/2023 3:27 PM",
                timeDelivered: "01/01/2023 4:08 PM",
                restaurant: "64 degrees",
                orderId: "005",
                deliverer: "001",
                price: "20.00",
              },
              {
                items: [{ item: "Triton Salad", price: "6.00", qty: "1" }],
                timeOrdered: "01/01/2022 3:27 PM",
                timeDelivered: "01/01/2022 4:08 PM",
                restaurant: "Canyon Vista",
                orderId: "004",
                deliverer: "001",
                price: "6.00",
              },
              {
                items: [
                  { item: "Milkshake", price: "5.00", qty: "3" },
                  { item: "Fries", price: "6.00", qty: "2" },
                ],
                timeOrdered: "01/01/2021 3:27 PM",
                timeDelivered: "01/01/2021 4:08 PM",
                restaurant: "Cafe Ventanas",
                orderId: "003",
                deliverer: "001",
                price: "27.00",
              },
              {
                items: [
                  { item: "Triton Burger", price: "8.00", qty: "1" },
                  { item: "Fries", price: "6.00", qty: "2" },
                ],
                timeOrdered: "01/01/1990 3:27 PM",
                timeDelivered: "01/01/1990 4:08 PM",
                restaurant: "64 degrees",
                orderId: "001",
                deliverer: "001",
                price: "20.00",
              },
              {
                items: [
                  { item: "Triton Burger", price: "8.00", qty: "1" },
                  { item: "Fries", price: "6.00", qty: "2" },
                ],
                timeOrdered: "01/01/1990 3:27 PM",
                timeDelivered: "01/01/1990 4:08 PM",
                restaurant: "64 degrees",
                orderId: "001",
                deliverer: "001",
                price: "20.00",
              },
            ]}
            renderItem={({ item }) => (
              <HistoricalOrder
                orderId={item.orderId}
                items={item.items}
                restaurant={item.restaurant}
                timeOrdered={item.timeOrdered}
                deliverer={item.deliverer}
                price={item.price}
              />
            )}
          />
        </View>
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
});

export default OrderHistoryScreen;
