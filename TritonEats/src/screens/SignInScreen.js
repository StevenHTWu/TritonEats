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

export default SignInScreen;
