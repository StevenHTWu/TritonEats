import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SignUpScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 49 }}>SignUpScreen</Text>
      <Button
        title="Go to MainFlow"
        onPress={() => navigation.navigate("mainFlow")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
