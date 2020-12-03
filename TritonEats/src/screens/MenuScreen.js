import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image
} from "react-native";



var CurrentCart = require('../Components/Cart');

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ResaturantMenu: [
        { Id: "1", ItemName: "Triton Burger", Price: "$7" },
        { Id: "3", ItemName: "Pizza-Slice", Price: "$2.50" },
        { Id: "4", ItemName: "California Roll", Price: "$9.00" },
        { Id: "5", ItemName: "Spicy Tuna Roll", Price: "$9.00" },
        { Id: "6", ItemName: "Tofu and Avocado Roll", Price: "$8.00" },
        { Id: "7", ItemName: "Sandwich", Price: "$7" },
        { Id: "8", ItemName: "Baja Fish Tacos", Price: "$6.00" },
      ],
      errorMessage: false
    };
  }

  render() {
    let view;
    console.log(this.errorMessage);
    if (this.state.errorMessage === true) {
      view = <Text style={{backgroundColor:'red', color: 'white', fontSize: 20, padding: 0, margin: 0}}>You have items in your shopping cart from another restaurant! Please empty your cart then add more.</Text>
    }
    else {
      view = (null);
    }
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <Text style={styles.headerTitle}>{CurrentCart.viewing_restaurant}</Text>

        <Image style={styles.topImage} source={require('../../assets/Pinburrito.jpg')} />
        {view}
        <FlatList
          data={this.state.ResaturantMenu}

          

          
          renderItem={({ item }) => (
            <View>
                <View style={styles.borderItem}>
                    <Text style={styles.bodyText}>{item.ItemName}</Text>
                    <Text style={styles.priceText}>{item.Price}</Text>
                    <View style={styles.addToCartButton}>
                        <TouchableOpacity
                            
                            color="#FFD700"
                            accessibilityLabel="Add to cart"
                            onPress = {() => {
                              if (CurrentCart.viewing_restaurant === CurrentCart.restaurant_name || CurrentCart.restaurant_name === "") {
                                var tmpArr = Object.assign([], CurrentCart.order_arr);
                                CurrentCart.emptyOrderArr();
                                CurrentCart.order_arr = tmpArr;
                                CurrentCart.addToOrderArr( {key: item.ItemName, quantity: 1, value: parseFloat(item.Price.substring(1)) }); 
                                CurrentCart.restaurant_name = CurrentCart.viewing_restaurant;
                              }
                              else {
                                this.setState({ errorMessage: true});
                              }
                        
                            }
                          }
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
    color:"#FFD700",
    fontFamily: "Unica One",
    textAlign: "left",
  },
  priceText: {
    fontSize: 30,
    paddingLeft: 12,
    color:"#FFD700",
    paddingTop: 5,
    fontFamily: "Unica One",
    textAlign: "left",
  },
  borderItem: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor:"#0a2657"
  },
  addToCartButton:{
    marginLeft: 300,
    marginRight: 12,
    borderWidth: 1,
    marginBottom:10,
    borderColor: "#FFD700",
    borderRadius: 10
  },

  addToCartText: {
    fontSize: 15,
    textAlign: "center",
    color: "#FFD700",
    margin: "25%"

  }
});

export default MenuScreen;
