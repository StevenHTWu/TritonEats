import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";

const NavBar = ({ size, margintop }) => {
  return (
    <View style={styles.NavBar}>
      <Feather name="home" size={24} color="white" style={{ marginLeft: 15 }} />
      <Entypo name="menu" size={24} color="white" />
      <AntDesign name="shoppingcart" size={24} color="white" />
      <Feather
        name="settings"
        size={24}
        color="white"
        style={{ marginRight: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "93%",
    height: 55,
    backgroundColor: "#000000",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50,
  },
});

export default NavBar;
