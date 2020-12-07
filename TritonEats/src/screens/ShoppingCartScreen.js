import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import NavLinkOrder from "../Components/NavLinkOrder";
import { withNavigationFocus } from "react-navigation";

var CurrentCart = require("../Components/Cart");

//these will be replaced by variables updated by the ordering page. For now have hardcoded.
/*
var restaurant_name = "Canyon Vista"; //since we only plan to support one restaurant at a time, we can display the restaurant name
var order_arr = [
  { key: "Fries", quantity: 5, value: 1 },
  { key: "Stir Fry Noodles", quantity: 2, value: 4.5 },
  { key: "Meat", quantity: 5, value: 4.6 },
  { key: "Cheese", quantity: 2, value: 5.4 },
  { key: "Bread", quantity: 5, value: 10.2 },
  { key: "Vegetables", quantity: 2, value: 9 },
  { key: "Fish", quantity: 5, value: 40 },
  { key: "Salt", quantity: 2, value: 30 },
  { key: "Pepper", quantity: 5, value: 1 },
  { key: "Pizza", quantity: 2, value: 0.5 },
  { key: "Hamburger", quantity: 5, value: 0 },
  { key: "Pork Bun", quantity: 2, value: 9 },
];
*/

switch (CurrentCart.restaurant_name) {
  case "Pines":
    var title_image = require("../../assets/Pinsalmon.jpg");
    break;
  case "Oceanview":
    var title_image = require("../../assets/OVpizza.jpg");
    break;
  default:
    var title_image = require("../../assets/salmon.jpg");
}

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    sum += el.quantity * el.value;
  }
  return sum;
}

class ShoppingCartScreen extends React.Component {
  constructor(props) {
    super();

    this.state = { refresh: false, data: CurrentCart.order_arr };
  }

  render() {
    return (
      <View style={styles.container}>
        {/*image and title*/}
        <ImageBackground
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          source={title_image}
          imageStyle={{ opacity: 0.7 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={styles.titleText}>
              Your Order From{" "}
              <Text
                style={{
                  color: "#0a2657",
                  fontSize: 35,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingHorizontal: "10%",
                }}
              >
                {CurrentCart.viewing_restaurant}
              </Text>
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.listView}>
          <FlatList
            ref={(ref) => (this.timerFlatlistRef = ref)}
            style={{ flex: 1, width: "100%" }}
            data={CurrentCart.order_arr}
            extraData={this.state.refresh}
            removeClippedSubviews={false}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.item}>{item.key}</Text>

                  <TouchableOpacity
                    style={styles.quantityButtonRight}
                    onPress={() => {
                      CurrentCart.removeFromOrderArr({
                        key: item.key,
                        quantity: item.quantity,
                        value: item.value,
                      });
                      this.setState({ state: this.state });
                    }}
                    underlayColor="#fff"
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      borderWidth: 0.5,
                      borderColor: "grey",
                      borderRadius: 4,
                      padding: 6,
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      CurrentCart.addToOrderArr({
                        key: item.key,
                        quantity: item.quantity,
                        value: item.value,
                      });
                      this.setState({ state: this.state });
                    }}
                    underlayColor="#fff"
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.item}>
                  {" "}
                  {String((item.value * item.quantity).toFixed(2))}{" "}
                </Text>
              </View>
            )}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.item}> Total: </Text>
            <Text style={styles.item}>
              {" "}
              {parseFloat(
                CurrentCart.order_arr.reduce(function (sum, current) {
                  return sum + current.quantity * current.value;
                }, 0)
              ).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              CurrentCart.emptyOrderArr();
              this.setState({ state: this.state });
            }}
            underlayColor="#fff"
          >
            <Text style={styles.quantityText}>Clear Order</Text>
          </TouchableOpacity>
        </View>
        <NavLinkOrder
          routeName="PaymentScreen"
          text="Order Now!"
          orderArr={CurrentCart.order_arr}
          totalPrice={parseFloat(
            CurrentCart.order_arr.reduce(function (sum, current) {
              return sum + current.quantity * current.value;
            }, 0)
          ).toFixed(2)}
          resName={CurrentCart.viewing_restaurant}
        />
      </View>
    );
  }
}

ShoppingCartScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    justifyContent: "center",
    fontFamily: "Unica One",
  },
  titleText: {
    color: "#0a2657",
    fontSize: 35,
    width: "90%",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: "10%",
    borderWidth: 2,
    borderColor: "#0a2657",
  },
  listView: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
  },
  link: {
    fontWeight: "bold",
    color: "#0a2657",
  },
  quantityButton: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#0a2657",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  quantityButtonRight: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#0a2657",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  quantityText: {
    color: "#FFD700",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontFamily: "Unica One",
  },
  clearButton: {
    marginRight: "3%",
    marginLeft: "3%",
    marginTop: "3%",
    marginBottom: "3%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#0a2657",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default withNavigationFocus(ShoppingCartScreen);
