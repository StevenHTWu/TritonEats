import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";

const LandingScreen = ({ navigation }) => {
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

        <Button 
          title="Go to SignUp"
          color="#000000"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
        <Button
          title="Go to SignIn"
          color="#000000"
          onPress={() => navigation.navigate("SignInScreen")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  LogoFont: {
    fontSize: 55,
    fontFamily: "Unica One",
    paddingLeft: 20,
  },
  Container: {},
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

export default LandingScreen;
