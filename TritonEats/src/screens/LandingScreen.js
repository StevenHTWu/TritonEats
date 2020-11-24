import React from "react";
<<<<<<< HEAD
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
=======
import { View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
>>>>>>> origin/backend

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

<<<<<<< HEAD
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
=======
        <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")} style={styles.appButtonContainerSignUp}>
          <Text style={styles.appButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("SignInScreen")} style={styles.appButtonContainerSignIn}>
          <Text style={styles.appButtonText}>Sign In</Text>
        </TouchableOpacity>
        
>>>>>>> origin/backend
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
<<<<<<< HEAD
  SignUpBtn: {
=======
  appButtonContainerSignUp: {
>>>>>>> origin/backend
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 300,
<<<<<<< HEAD
    marginLeft: "23.5%",
  },
  SignInBtn: {
=======
    marginLeft: "23.5%"
  },
  appButtonContainerSignIn: {
>>>>>>> origin/backend
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 23,
<<<<<<< HEAD
    marginLeft: "23.5%",
  },
  ButtonText: {
=======
    marginLeft: "23.5%"
  },
  appButtonText: {
>>>>>>> origin/backend
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
<<<<<<< HEAD
    fontFamily: "Unica One",
  },
=======
    fontFamily: "Unica One"
  }
>>>>>>> origin/backend
});

export default LandingScreen;
