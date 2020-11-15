import React from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { withOrientation } from 'react-navigation';




//these will be replaced by variables updated by the ordering page. For now have hardcoded.
var restaurant_name = "Oceanview"; //since we only plan to support one restaurant at a time, we can display the restaurant name
var order_arr = [
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'},
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'},
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'},
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'},
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'},
  {key: 'Fries', value: '$1.00'},
  {key: 'Stir Fry Noodles', value: '$4.00'}
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

const ShoppingCartScreen = () => {
  return (
    
        <View style={styles.container}>
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
                                       <Text style={styles.item}>{item.key} </Text> 
                                       <Text style={styles.item}> {item.value} </Text>
                                       </View>
                                      }
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
              />
            </View>
        </View>
      );
}


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
  }

});

export default ShoppingCartScreen;
