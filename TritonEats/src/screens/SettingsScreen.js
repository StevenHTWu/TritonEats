import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const SettingsScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 49 }}>SettingsScreen</Text>
      <Button title="LogOut" onPress={() => navigation.navigate("loginFlow")} />
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
