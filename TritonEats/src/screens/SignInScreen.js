import React from "react";
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from "react-native";

const SignInScreen = ({ navigation }) => {
  const [value1, onChangeText1] = React.useState(' Email');
  const [value2, onChangeText2] = React.useState(' Password');
  
  return (
    <>
    <View style={styles.Container}>
      <Text style={styles.TitleFont}>Sign In</Text>

    <View style={styles.LogoRow}>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText1(text)}
      placeholder={value1}
      />
    </View>

    <View style={styles.LogoRow}>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText2(text)}
      secureTextEntry={true}
      placeholder={value2}
      />
    </View>

      <TouchableOpacity
          onPress={() => navigation.navigate("mainFlow")}
          style={styles.SignInBtn}
        >
          <Text style={styles.ButtonText}>Sign In</Text>
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
  SignUpBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 200,
    height: 60,
    marginTop: 300,
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

export default SignInScreen;
