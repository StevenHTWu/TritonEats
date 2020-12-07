import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  onSubmitAlt,
  submitButtonText,
  deliverCheck,
}) => {
  const [value1, onChangeText1] = React.useState(" Email");
  const [value2, onChangeText2] = React.useState(" Password");
  const [value3, onChangeText3] = React.useState(" isDeliverer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [is_deliverer, setIsDeliverer] = useState("");

  var Falsity = "false";
  var Truth = "true";
  return (
    <>
      <Text style={styles.TitleFont}>{headerText}</Text>
      <View style={styles.LogoRow}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          placeholder={value1}
        />
      </View>
      <TextInput
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={value2}
        style={styles.textInput}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      {submitButtonText == "Sign Up" ? (
        <TouchableOpacity
          onPress={() => {
            onSubmitAlt({ email, password, is_deliverer });
          }}
          style={styles.SignUpBtnDeliv}
        >
          <Text style={styles.ButtonText}>Sign Up As Deliverer</Text>
        </TouchableOpacity>
      ) : null}

      {submitButtonText == "Sign Up" ? (
        <TouchableOpacity
          onPress={() => {
            onSubmit({ email, password, is_deliverer });
          }}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign Up As Orderer</Text>
        </TouchableOpacity>
      ) : null}

      {submitButtonText == "Sign In" ? (
        <TouchableOpacity
          onPress={() => onSubmit({ email, password })}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  TitleFont: {
    fontSize: 45,
    fontFamily: "Unica One",
    paddingLeft: "33%",
    marginTop: "65%",
    marginBottom: 60,
  },
  SignUpBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 262,
    height: 60,
    marginBottom: 10,
    marginLeft: "16%",
    marginTop: 146,
  },
  SignUpBtnDeliv: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 250,
    height: 60,
    marginLeft: "16%",
    position: "absolute",
    top: "83%",
  },
  ButtonText: {
    fontSize: 23,
    color: "#FFD700",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  textInput: {
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: "5%",
    marginLeft: "7%",
    marginRight: "7%",
  },
});

export default AuthForm;
