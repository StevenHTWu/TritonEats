import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavBar from "../Components/NavBar";

class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
         <View style={styles.main}>
            <Text style={styles.text}>Homescreen</Text>
          </View>
      </SafeAreaView>
     
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop:300
  },
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
