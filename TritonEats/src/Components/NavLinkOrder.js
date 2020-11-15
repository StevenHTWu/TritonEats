import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLinkOrder = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>

        <Text style={styles.link}>{text}</Text>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    color: "#0a2657",
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center"

  },
});

export default withNavigation(NavLinkOrder);
