import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  deliverCheck,
}) => {
  const [value1, onChangeText1] = React.useState(' Email');
  const [value2, onChangeText2] = React.useState(' Password');
  const [value3, onChangeText3] = React.useState(' isDeliverer');
  


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_deliverer, setIsDeliverer] = useState("");

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
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      {deliverCheck ? (
        <TextInput
          label="Is Deliverer"
          value={is_deliverer}
          onChangeText={setIsDeliverer}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={value3}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}


      {submitButtonText =="Sign Up" ?
        (<TouchableOpacity
          onPress={() => onSubmit({ email, password, is_deliverer })}
        style={styles.SignUpBtn}
          >
          <Text style={styles.ButtonText}>Sign Up to Deliver Food</Text>
        </TouchableOpacity>)
        : null
      }

      {submitButtonText =="Sign In" ?
        (<TouchableOpacity
          onPress={() => onSubmit({ email, password })}
        style={styles.SignUpBtn}
          >
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>)
        : null
      }

      


    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
  TitleFont: {
    fontSize: 45,
    fontFamily: "Unica One",
    paddingLeft: 120,
    marginTop: 45
  },
  SignUpBtn: {
    elevation: 8,
    backgroundColor: "#0a2657",
    borderRadius: 600,
    paddingVertical: 17,
    width: 250,
    height: 60,
    marginTop: 23,
    marginBottom: 133,
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

export default AuthForm;
