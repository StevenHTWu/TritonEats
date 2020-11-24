import React, { Component } from "react";
<<<<<<< HEAD
import { Container, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavBar from "../Components/NavBar";
import sandwich from '../../assets/sandwich.jpg';
import sushi from '../../assets/sushi.jpg'
import fruit from '../../assets/fruit.jpg';
import chicken from '../../assets/chicken.jpg';
import pasta from '../../assets/pasta.jpg';
import meat from '../../assets/meat.jpg'
import sandwich2 from '../../assets/sandwich2.jpg';
import salad from '../../assets/salad.jpg';
=======
import { Text, View, StyleSheet } from "react-native";

import NavBar from "../Components/NavBar";
>>>>>>> origin/backend

class HomeScreen extends Component {
  render() {
    return (
<<<<<<< HEAD
      <SafeAreaView forceInset={{ top: "always" }}>
        <View style={styles.main}>
          
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
            //onPress={() => navigation.navigate("RestaurantScreen")}
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
      </SafeAreaView>

=======
      <View style={styles.main}>
        <Text style={styles.text}>This is the main page</Text>
        <Text style={styles.text}>This is body</Text>
        <NavBar />
      </View>
>>>>>>> origin/backend
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
<<<<<<< HEAD
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
=======
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
>>>>>>> origin/backend
  },
});

export default HomeScreen;