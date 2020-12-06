import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

import trackerApi from "../api/tracker";
import Loader from "../Components/Loader";

var CurrentCart = require("../Components/Cart");

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      RestaurantMenu: [],
      errorMessage: true,
    };
  }

  async componentDidMount() {
    console.log(CurrentCart.viewing_restaurant);
    const response = await trackerApi.get(
      "/restaurantMenu/" + CurrentCart.viewing_restaurant
    );
    // console.log("-----------------------");
    // console.log(response.data[0].lunch_menu);
    // console.log("-----------------------");

    if (typeof response.data[0].lunch_menu !== "undefined") {
      this.setState({
        isLoading: false,
        RestaurantMenu: response.data[0].lunch_menu,
      });
    } else if (typeof response.data[0].breakfast_menu !== "undefined") {
      this.setState({
        isLoading: false,
        RestaurantMenu: response.data[0].breakfast_menu,
      });
    } else if (typeof response.data[0].dinner_menu !== "undefined") {
      this.setState({
        isLoading: false,
        RestaurantMenu: response.data[0].dinner_menu,
      });
    }
  }

  render() {
    let view;
    //console.log(this.errorMessage);
    if (this.state.errorMessage === true) {
      view = (
        <Text
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: 20,
            padding: 0,
            margin: 0,
          }}
        >
          You have items in your shopping cart from another restaurant! Please
          empty your cart then add more.
        </Text>
      );
    } else {
      view = null;
    }
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <Loader loading={this.state.isLoading} />
        {this.state.isLoading ? (
          <></>
        ) : (
          <View>
            <Text style={styles.headerTitle}>
              {CurrentCart.viewing_restaurant}
            </Text>
            <Image
              style={styles.topImage}
              source={require("../../assets/Pinsalmon.jpg")}
            />
            <FlatList
              data={this.state.RestaurantMenu}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.borderItem}>
                    <Text style={styles.bodyText}>{item.name}</Text>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <View style={styles.addToCartButton}>
                      <TouchableOpacity
                        color="#FFD700"
                        accessibilityLabel="Add to cart"
                        onPress={() => {
                          var tmpArr = Object.assign([], CurrentCart.order_arr);
                          CurrentCart.emptyOrderArr();
                          CurrentCart.order_arr = tmpArr;
                          CurrentCart.addToOrderArr({
                            key: item.name,
                            quantity: 1,
                            value: parseFloat(item.price.substring(1)),
                          });
                        }}
                      >
                        <Text style={styles.addToCartText}>Add to cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text></Text>
                </View>
              )}
              keyExtractor={(item) => item.Id}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
MenuScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop: 300,
  },
  text: {
    fontSize: 30,
  },
  topImage: {
    marginBottom: 0,
    width: 500,
    height: 200,
  },
  headerTitle: {
    fontSize: 49,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Unica One",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 38,
    paddingTop: 5,
    paddingLeft: 12,
    color: "#FFD700",
    fontFamily: "Unica One",
    textAlign: "left",
  },
  priceText: {
    fontSize: 30,
    paddingLeft: 12,
    color: "#FFD700",
    paddingTop: 5,
    fontFamily: "Unica One",
    textAlign: "left",
  },
  borderItem: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "#0a2657",
  },
  addToCartButton: {
    marginLeft: 300,
    marginRight: 12,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#FFD700",
    borderRadius: 10,
  },

  addToCartText: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFD700",
    margin: "10%",
  },
});

export default MenuScreen;
