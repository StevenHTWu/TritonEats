import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_deliverer, setIsDeliverer] = useState("");

  return (
    <>
      <View style={styles.container}>
        <Text>Sign Up Screen</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          label="Is Deliverer"
          value={is_deliverer}
          onChangeText={setIsDeliverer}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="Sign Up"
          onPress={() => signup({ email, password, is_deliverer })}
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
