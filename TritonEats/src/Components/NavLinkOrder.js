import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";

const NavLinkOrder = ({ navigation, text, routeName }) => {
  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>

          <Text style={styles.link}>{text}</Text>
      
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
    margin: "5%",

  },
  background: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: "#0a2657"
  }
});

export default withNavigation(NavLinkOrder);
