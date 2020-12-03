import React, { Component } from "react";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavBar from "../Components/NavBar";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Restaurants: [
        {Id: "1", Name: "64 Degrees to Earl Warren College  (0.9 miles)", Compensation: "Estimated Earnings: $8.65 + $1.76 tip"},
        {Id: "2", Name: "Cafe Ventanas to The Village  (0.2 mi)", Compensation: "Estimated Earnings: $5.87 + $0.89 tip"},
        {Id: "3", Name: "Canyon Vista to Thurgood Marshall College  (0.6 mi)", Compensation: "Estimated Earnings: $7.41 + $2.03 tip"},
        {Id: "4", Name: "Foodworx to Sixth College  (1.2 mi)", Compensation: "Estimated Earnings: $10.62 + $3.84 tip"},  
        {Id: "5", Name: "OceanView to John Muir College  (0.5 mi)", Compensation: "Estimated Earnings: $6.54 + $1.06 tip"},
        {Id: "6", Name: "Pines to Revelle College  (0.5)", Compensation: "Estimated Earnings: $6.27 + $1.89 tip"},
      ],
    };
  }

  render() {
    return (
    <SafeAreaView forceInset={{ top: "always" }} >
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

    <View style={styles.List}>
    <FlatList
      data={this.state.Restaurants}
      renderItem={({ item }) => (
        <View>
            <TouchableOpacity 
              onPress={() => navigation.navigate("MenuScreen")}
              style={styles.restaurant}>
                <Text style={styles.name}>{item.Name}</Text>
                <Text style={styles.compensation}>{item.Compensation}</Text>
                <Text style={styles.miles}>{item.Miles}</Text>
            </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.Id}
    />
    </View>
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
  fontSize: 25,
  height: 75,
  color: '#FFD700',
  fontFamily: "Unica One",
  textAlign: "center",
  paddingLeft: "5%",
  paddingRight: "5%",
},
compensation: {
  fontSize: 22,
  color: "white",
  fontFamily: "Unica One",
  textAlign: "center",
  flexDirection: 'row', 
},
List:{
  paddingBottom: 300,
},
icon: {
  width: "22%",
  height: "80%",
  marginLeft: "3%",
},
info: {
  flexDirection: 'row', 
},
restaurant: {
  backgroundColor: "#0a2657",
  paddingVertical: "5%",
  width: 375,
  marginTop: 0,
  marginBottom: 5,
},
LogoFont: {
  fontSize: 55,
  fontFamily: "Unica One",
  paddingLeft: 20,
},
Container: {
  marginTop: 10,
  marginBottom: 15,
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