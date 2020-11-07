import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import NavBar from "../Components/NavBar";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>This is the main page</Text>
        <Text style={styles.text}>This is body</Text>
        <NavBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
