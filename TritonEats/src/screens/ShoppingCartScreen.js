import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";

const ShoppingCartScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
       <View style={styles.main}>
          <Text style={styles.text}>Shopping Cart</Text>
        </View>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop:300
  },
  text: {
    fontSize: 30,
  },
});

export default ShoppingCartScreen;
