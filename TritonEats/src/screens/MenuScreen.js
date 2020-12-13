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
      errorMessage: false,
      viewing_restaurant: CurrentCart.viewing_restaurant
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
    console.log("CALLING RENDER");
    let view;
    //console.log(this.errorMessage);
    if (this.state.errorMessage === true) {
      view = (
        <Text
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: 20,
            padding: 10,
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
          <View style={ { height: "100%"}}>
            <Text style={styles.headerTitle}>
              {CurrentCart.viewing_restaurant}
            </Text>

            <Image
              style={styles.topImage}
              source={require("../../assets/Pinsalmon.jpg")}
            />
            {view}
            <View style={styles.List}> 
            <FlatList
              data={this.state.RestaurantMenu}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.borderItem}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 20,
                        paddingTop: 10,
                      }}
                    >
                      <Text style={styles.bodyText}>{item.name}</Text>
                        <View>
                        <Text style={styles.priceText}>{item.price}</Text>
                          <TouchableOpacity
                          style={styles.addToCartButton}
                            color="#FFD700"
                            accessibilityLabel="Add to cart"
                            onPress={() => {
                              console.log("RESTAURANT NAME");
                              console.log(CurrentCart.restaurant_name);
                              console.log("VIEW NAME");
                              console.log(CurrentCart.viewing_restaurant);
                              if (CurrentCart.viewing_restaurant === CurrentCart.restaurant_name || CurrentCart.restaurant_name === "") {
                                CurrentCart.restaurant_name = CurrentCart.viewing_restaurant;
                                console.log("RESTAURANT NAME");
                                console.log(CurrentCart.restaurant_name);
                                var tmpArr = Object.assign([], CurrentCart.order_arr);
                                CurrentCart.emptyOrderArr();
                                CurrentCart.order_arr = tmpArr;
                                CurrentCart.addToOrderArr({
                                  key: item.name,
                                  quantity: 1,
                                  value: parseFloat(item.price.substring(1)),
                                });
                              }
                              else {
                                console.log("ERROR!");
                                this.setState ({ errorMessage : true });
                              }
                            }}
                          >
                            <Text style={styles.addToCartText}>Add to cart</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    
                      
            
                  </View>
                  <Text></Text>
                </View>
              )}
              keyExtractor={(item) => item.Id}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            />
           </View>
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
    marginBottom: 7,
    width: 500,
    height: 190,
  },
  headerTitle: {
    fontSize: 49,
    // paddingBottom: 10,
    fontFamily: "Unica One",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 25,
    paddingTop: 5,
    paddingLeft: 12,
    color: "#FFD700",
    fontFamily: "Unica One",
    textAlign: "left",
    width: "70%"
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
    borderWidth: 0,
    height: 130,
    backgroundColor: "#0a2657",
    margin: -5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 0,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 }
  },
  addToCartButton: {
    paddingLeft: 12,
    paddingRight: "10%",
    marginRight: "25%",
    marginLeft: "-3%",
    paddingTop: 5,
    borderWidth: 1,
    // marginBottom: 10,
    borderColor: "#FFD700",
    borderRadius: 10,
    width: "50%",

  },

  List: {
    flex: 1,

  },
  addToCartText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFD700",
    margin: "1%",
    fontFamily: "Unica One",
  },
});

export default MenuScreen;
