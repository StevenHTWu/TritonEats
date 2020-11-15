import React from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import NavLinkOrder from "../Components/NavLinkOrder";




//these will be replaced by variables updated by the ordering page. For now have hardcoded.
var restaurant_name = "Oceanview"; //since we only plan to support one restaurant at a time, we can display the restaurant name
var order_arr = [
  {key: 'Fries', quantity: 5, value: 1},
  {key: 'Stir Fry Noodles', quantity: 2, value: 4.5},
  {key: 'Meat', quantity: 5, value: 4.6},
  {key: 'Cheese', quantity: 2, value: 5.4},
  {key: 'Bread', quantity: 5, value: 10.2},
  {key: 'Vegetables', quantity: 2, value: 9},
  {key: 'Fish', quantity: 5, value: 40},
  {key: 'Salt', quantity: 2, value: 30},
  {key: 'Pepper', quantity: 5, value: 1},
  {key: 'Pizza', quantity: 2, value: 0.5},
  {key: 'Hamburger', quantity: 5, value: 0},
  {key: 'Pork Bun', quantity: 2, value: 9},

]

switch(restaurant_name) {
  case "Pines":
    var title_image = require('../../assets/PinesNoodles.jpg');
    var color = '#F0EAD6'
    break;
  case "Oceanview":
    var title_image = require('../../assets/Pizza.jpg');
    var color = 'black';
    break;
  default:
    var title_image = require('../../assets/Sandwich.jpg');
}
const OrderButton = ({ navigation, text, routeName }) => {
  
  return (
    <Button title="Order Now!" onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </Button>
  );
};


const ShoppingCartScreen = ({ navigation }) => {
  return (
    
        <View style={styles.container}>
          
          {/*image and title*/}
          <ImageBackground
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            source={title_image}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <Text style={styles.titleText}>Your Order From {restaurant_name}</Text>
              </View>
            </ImageBackground>

            <View style={styles.listView}>
              <FlatList
                data={
                    order_arr
                }
                renderItem={({item}) => <View style={{display: 'flex', alignItems: 'center', padding: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                                       <Text style={styles.item}>{item.key} ({item.quantity}) </Text> 
                               
                                       <Text style={styles.item}> {String((item.value*item.quantity).toFixed(2))} </Text>
                                       </View>
                                      }
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
              />
            </View>
            <NavLinkOrder
          routeName="OrderScreen"
          text="Order Now!"
        /> 
            </View>
     
      );
}


ShoppingCartScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    justifyContent: 'center'
  },
  titleText: {
      color: 'white',
      fontSize: 35,
      fontWeight: "bold"
  },
  listView: {
    flex: 1,
    paddingTop: 50,
    padding: 10
  },
  link: {
    fontWeight: "bold",
    color: "#0a2657",
  }

});

export default ShoppingCartScreen;
