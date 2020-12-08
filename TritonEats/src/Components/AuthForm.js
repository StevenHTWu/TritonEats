import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
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
  const [value3, onChangeText3] = React.useState("Name");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [is_deliverer, setIsDeliverer] = useState("");
  const [name, setName] = useState("");
  return (
    
      <>
      <Text style={styles.TitleFont}>{headerText}</Text>
      <View style={styles.LogoRow}>

      {submitButtonText == "Sign Up" ? (
        <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={value3}
        style={styles.textInput}
      />
      ) : null}
      

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          keyboardType='email-address'
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
            onSubmit({ name, email, password, is_deliverer });
          }}
          style={styles.SignUpBtn}
        >
          <Text style={styles.ButtonText}>Sign Up As Orderer</Text>
        </TouchableOpacity>
      ) : null} 

      {submitButtonText == "Sign Up" ? (
        <TouchableOpacity
          onPress={() => {
            onSubmitAlt({ name, email, password, is_deliverer });
          }}
          style={styles.SignUpBtnDeliv}
        >
          <Text style={styles.ButtonText}>Sign Up As Deliverer</Text>
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
    fontSize: 50,
    fontFamily: "Unica One",
    fontWeight: "bold",
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
    marginLeft: "20%",
    
    marginTop: 10
  },
  SignUpBtnDeliv: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 250,
    height: 60,
    marginLeft: "20%",

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
