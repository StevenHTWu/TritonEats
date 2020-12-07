import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

var CurrentCart = require("../Components/Cart");

const LandingScreen = ({ navigation }) => {
  CurrentCart.restaurant_name= "";
  CurrentCard.order_arr= [];
  CurrentCart.viewing_restaurant= "";
  return (
    <>
      <View style={styles.Container}>
        <View style={styles.LogoRow}>
          <Image
            style={styles.LogoImg}
            source={require("../../assets/TritonLogo.png")}
          />
          <Text style={styles.LogoFont}>Triton Eats</Text>
        </View>
        <Image
          style={styles.Picture}
          source={require("../../assets/girlOnBike.jpg")}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignInScreen")}
          style={styles.SignInBtn}
        >
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

LandingScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  LogoFont: {
    fontSize: 57,
    fontFamily: "Unica One",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  Container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  LogoRow: {
    flexDirection: "row",
    marginTop: "5%",
    marginLeft: "5%",
  },
  Picture: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: "20%",
    marginBottom: "10%",
  },
  LogoImg: {
    width: 60,
    height: 60,
    marginBottom: "10%",
  },
  SignUpBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 20,
    marginLeft: "23.5%",
  },
  SignInBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 23,
    marginLeft: "23.5%",
  },
  ButtonText: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
});

export default LandingScreen;
