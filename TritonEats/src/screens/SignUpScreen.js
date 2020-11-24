<<<<<<< HEAD
import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../Components/AuthForm";
import NavLink from "../Components/NavLink";

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
          headerText="Sign Up"
          errorMessage={state.errorMessage}
          submitButtonText="Sign Up"
          deliverCheck="true"
          onSubmit={signup}
        />
        <NavLink
          routeName="SignInScreen"
          text="Already have an account? Sign in instead!"
        />
      </View>
=======
import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('You made a post request');
});

module.exports = router;

const SignUpScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 49 }}>SignUpScreen</Text>
      <Button
        title="Go to MainFlow"
        onPress={() => navigation.navigate("mainFlow")}
      />
>>>>>>> origin/backend
    </>
  );
};

<<<<<<< HEAD
SignUpScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
  TitleFont: {
    fontSize: 45,
    fontFamily: "Unica One",
    paddingLeft: 120,
    marginTop: 45
  },
});

export default SignUpScreen;

{
  /* <>
  <Text style={{ fontSize: 49 }}>SignUpScreen</Text>
  <Button
    title="Go to MainFlow"
    onPress={() => navigation.navigate("mainFlow")}
  />
</>; */
}
=======
const styles = StyleSheet.create({});

export default SignUpScreen;
>>>>>>> origin/backend
