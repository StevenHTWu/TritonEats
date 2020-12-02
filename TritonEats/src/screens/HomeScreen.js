import React, { Component } from "react";
import { FlatList, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavBar from "../Components/NavBar";
import foodWorx from '../../assets/FWsandwich.jpg';
import pines from '../../assets/Pinburrito.jpg'
import clubMed from '../../assets/CMfish.jpg';
import canVista from '../../assets/CanVnoodles.jpg';
import degrees from '../../assets/64salmon.jpg';
import cafeV from '../../assets/CafeVsalad.jpg';
import oceanView from '../../assets/OVpizza.jpg';

import { navigate } from "../navigationRef";

var CurrentCart = require('../Components/Cart'); //use to set what restaurant menu needs to display

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Restaurants: [
        {Id: "1", Image: degrees, Name: "64 Degrees", Hours: "7 am to 9 pm"},
        {Id: "2", Image: cafeV, Name: "Cafe Ventanas", Hours: "7 am to 9 pm"},
        {Id: "3", Image: canVista, Name: "Canyon Vista", Hours: "7 am to 9 pm"},
        {Id: "4", Image: clubMed, Name: "Club Med", Hours: "7 am to 9 pm"},
        {Id: "5", Image: foodWorx, Name: "Foodworx", Hours: "7 am to 9 pm"},
        {Id: "6", Image: oceanView, Name: "OceanView", Hours: "7 am to 9 pm"},
        {Id: "7", Image: pines, Name: "Pines", Hours: "7 am to 9 pm"},
      ],
    };
  }

  render() {
    return (
      <View>
        <View style={styles.main}>
        <View style={styles.List}>
    <FlatList
      data={this.state.Restaurants}
      renderItem={({ item }) => (
        <View>
            <TouchableOpacity
              onPress={() =>  { CurrentCart.viewing_restaurant = item.Name; navigate('MenuScreen'); }}
              style={styles.restaurant}>
                <Image style={styles.icon} source={item.Image} /> 
                <Text style={styles.name}>{item.Name}</Text>
                <Text style={styles.hours}>{item.Hours}</Text>
            </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.Id}
    />
    </View>
    </View>
  </View>
  /*
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
          >
            <Image
              style={styles.image}
              source={sandwich}
            />
            <Image
              style={styles.image}
              source={sushi}
            />
            <Image
              style={styles.image}
              source={meat}
            />
            <Image
              style={styles.image}
              source={salad}
            />            
          </ScrollView>
        </View>

        <View style={styles.verticalScroll}>
          <ScrollView
          //scrollEventThrottle={200}
          //decelerationRate="fast"
          >
          <TouchableOpacity
            onPress={() => { CurrentCart.viewing_restaurant = "64 Degrees"; navigate('MenuScreen'); }}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={sandwich}
            />
            <Text style={styles.name}>  64 Degrees</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {CurrentCart.viewing_restaurant = "Cafe Ventanas"; navigate('MenuScreen');}}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={pasta}
            />
            <Text style={styles.name}>  Cafe Ventanas</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {CurrentCart.viewing_restaurant = "Club Med"; navigate('MenuScreen');}}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={sandwich2}
            />
            <Text style={styles.name}>  Club Med</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {CurrentCart.viewing_restaurant = "Foodworx"; navigate('MenuScreen');}}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={fruit}
            />
            <Text style={styles.name}>  Foodworx</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {CurrentCart.viewing_restaurant = "Pines"; navigate('MenuScreen');}}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={sushi}
            />
            <Text style={styles.name}>  Pines</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {CurrentCart.viewing_restaurant = "OceanView"; navigate('MenuScreen');}}
            style={styles.restaurant}
          >
            <Image
              style={styles.icon}
              source={chicken}
            />
            <Text style={styles.name}>  OceanView</Text>
            <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
          </TouchableOpacity>
          
          </ScrollView>
        </View>
      </View>
*/
    );
  }
}
HomeScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  verticalScroll: {
    alignItems: "center",
  },
  image: {
    width: 375,
    height: 175,
  },
  name: {
    fontSize: 22,
    width: 100,
    height: 75,
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Unica One",
  },
  hours: {
    fontSize: 15,
    color: "white",
    fontFamily: "Unica One",
  },
  icon: {
    width: 60,
    height: 50,
    marginLeft: 5,
  },
  restaurant: {
    elevation: 8,
    backgroundColor: "#0a2657",
    paddingVertical: 5,
    width: 375,
    height: 60,
    marginTop: 3,
    flexDirection: 'row',
  },
});

export default HomeScreen;