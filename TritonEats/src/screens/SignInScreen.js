import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../Components/AuthForm";
import NavLink from "../Components/NavLink";
import { Context } from "../context/AuthContext";
import { Keyboard } from "react-native";

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{}}>
        <View>
          <NavigationEvents onWillFocus={clearErrorMessage} />
          <AuthForm
            headerText="Sign In"
            errorMessage={state.errorMessage}
            onSubmit={signin}
            onSubmitAlt={null}
            deliverCheck=""
            submitButtonText="Sign In"
          />
          <NavLink
            text="Don't have an account? Sign up instead"
            routeName="SignUpScreen"
          />
        </View>
      </TouchableWithoutFeedback>
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

export default SignInScreen;
