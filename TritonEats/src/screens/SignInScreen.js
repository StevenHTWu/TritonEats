<<<<<<< HEAD
import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../Components/AuthForm";
import NavLink from "../Components/NavLink";
import { Context } from "../context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        deliverCheck=""
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="SignUpScreen"
      />
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    header: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});
=======
import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SignInScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 49 }}>SignInScreen</Text>
      <Button
        title="Go to MainFlow"
        onPress={() => navigation.navigate("mainFlow")}
      />
    </>
  );
};

const styles = StyleSheet.create({});
>>>>>>> origin/backend

export default SignInScreen;
