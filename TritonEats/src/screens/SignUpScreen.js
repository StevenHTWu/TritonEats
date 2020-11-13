import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <Button title="Sign Up" />
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
