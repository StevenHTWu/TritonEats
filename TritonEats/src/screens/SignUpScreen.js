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
          routeName="HomeScreen"
          text="Already have an account? Sign in instead!"
        />
      </View>
    </>
  );
};

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
    marginTop: 45,
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
