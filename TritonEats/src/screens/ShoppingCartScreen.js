import React from "react";
import { Button } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";

const ShoppingCartScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.main}>
        <Text style={styles.text}>Shopping Cart</Text>
        <Button
          title="Make Payment!"
          onPress={() => {
            navigation.navigate("PaymentScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

ShoppingCartScreen.navigationOptions = () => {
  return {
    header: false,
  };
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop: 300,
  },
  text: {
    fontSize: 30,
  },
});

export default ShoppingCartScreen;
