import React from "react";
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from "react-native";

const SignInScreen = ({ navigation }) => {
  const [value1, onChangeText1] = React.useState(' Email');
  const [value2, onChangeText2] = React.useState(' Password');
  const [value3, onChangeText3] = React.useState(' Verify Password');
  
  return (
    <>
    <View style={styles.Container}>
      <Text style={styles.TitleFont}>Sign Up</Text>

    <View style={styles.LogoRow}>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText1(text)}
      value={value1}
      />
    </View>

    <View style={styles.LogoRow}>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText2(text)}
      value={value2}
      />
    </View>

    <View style={styles.LogoRow}>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText3(text)}
      value={value3}
      />
    </View>

      <TouchableOpacity
          onPress={() => navigation.navigate("mainFlow")}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign Up to Order Food</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => navigation.navigate("mainFlow")}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign Up to Deliver Food</Text>
      </TouchableOpacity>


      </View> 
    </>
  );
};

const styles = StyleSheet.create({
  TitleFont: {
    fontSize: 45,
    fontFamily: "Unica One",
    paddingLeft: 120,
    marginTop: 45
  },
  Container: {},
  LogoRow: {
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
  },
  LogoImg: {
    width: 50,
    height: 50,
  },
  Button: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 150,
    height: 60,
    marginTop: 10,
    marginLeft: "20%",
  },
  SignUpBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 250,
    height: 60,
    marginTop: 23,
    marginLeft: "15%",
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

export default SignInScreen;
