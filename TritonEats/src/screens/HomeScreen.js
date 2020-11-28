import React, { Component } from "react";
import { Container, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavBar from "../Components/NavBar";
import foodWorx from '../../assets/FWsandwich.jpg';
import pines from '../../assets/Pinburrito.jpg'
import clubMed from '../../assets/CMfish.jpg';
import canVista from '../../assets/CanVnoodles.jpg';
import degrees from '../../assets/64salmon.jpg';
import cafeV from '../../assets/CafeVsalad.jpg';
import oceanView from '../../assets/OVpizza.jpg';

class HomeScreen extends Component {
  render() {
    return (
    <SafeAreaView forceInset={{ top: "always" }}>
    <View style={styles.main}>
      
    <View style={styles.Container}>
    <View style={styles.LogoRow}>
      <Image
        style={styles.LogoImg}
        source={require("../../assets/TritonLogo.png")}
      />
      <Text style={styles.LogoFont}>Triton Eats</Text>
    </View>
    </View>
      
        <ScrollView
        //scrollEventThrottle={200}
        //decelerationRate="fast"
        >
        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={degrees}
          />
          <Text style={styles.name}>  64 Degrees</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={cafeV}
          />
          <Text style={styles.name}>  Cafe Ventanas</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={canVista}
          />
          <Text style={styles.name}>  Canyon Vista</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={clubMed}
          />
          <Text style={styles.name}>  Club Med</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={foodWorx}
          />
          <Text style={styles.name}>  Foodworx</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={oceanView}
          />
          <Text style={styles.name}>  OceanView</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuScreen")}
          style={styles.restaurant}
        >
          <Image
            style={styles.icon}
            source={pines}
          />
          <Text style={styles.name}>  Pines</Text>
          <Text style={styles.hours}>           7:00 am to 9:00 pm</Text>
        </TouchableOpacity>
        
        </ScrollView>
      </View>
    </SafeAreaView>

  );
}
}

const styles = StyleSheet.create({
main: {
  alignItems: "center",
},
image: {
  width: 375,
  height: 175,
},
name: {
  fontSize: 22,
  width: 110,
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
  width: 65,
  height: 55,
  marginLeft: 5,
},
restaurant: {
  elevation: 8,
  backgroundColor: "#0a2657",
  paddingVertical: 5,
  width: 375,
  height: 65,
  marginTop: 3,
  flexDirection: 'row',
},
LogoFont: {
  fontSize: 55,
  fontFamily: "Unica One",
  paddingLeft: 20,
},
Container: {
  marginTop: 10,
  marginBottom: 20,
  marginRight: 10,
},
LogoRow: {
  flexDirection: "row",
  marginTop: "5%",
  marginLeft: "5%",
},
LogoImg: {
  width: 50,
  height: 50,
},
});

export default HomeScreen;