import React from "react";
import { Text, View, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.text}>This is the home page</Text>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
