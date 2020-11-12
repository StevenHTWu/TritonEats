import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";

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

        <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")} style={styles.appButtonContainerSignUp}>
          <Text style={styles.appButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("SignInScreen")} style={styles.appButtonContainerSignIn}>
          <Text style={styles.appButtonText}>Sign In</Text>
        </TouchableOpacity>
        
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
  appButtonContainerSignUp: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 300,
    marginLeft: "23.5%"
  },
  appButtonContainerSignIn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 23,
    marginLeft: "23.5%"
  },
  appButtonText: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One"
  }
});

export default LandingScreen;
