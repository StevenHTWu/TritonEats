import React, { useContext, Component, useEffect } from "react";
import { View, StyleSheet, Text, Button, TextInput, ScrollView, Keyboard, Dimensions, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";


const menu = [{key: 'My Profile', nav: 'ProfileScreen'}, 
              {key: 'Manage Address', nav: 'AddressScreen'}, 
              {key: 'Add Payment Method', nav: 'AddCardFromSettingsScreen'}, 
              {key: 'Manage Payment Method(s)', nav: 'ManagePaymentScreen'}, 
              {key: 'Change Password', nav: 'PasswordScreen'}];

global.object = {name: "mudit", email: "example@ucsd.edu", phone_num: "1234567890",
              payment_methods: [{card_number: "1234567812345678", cvv: "456", expiration_date: "5678", name: "Card 1"},
              {card_number: "1234567812341111", cvv: "123", expiration_date: "1234", name: "Card 2"}],
              apartment: "212", residence: "ERC Building 1", address: "Gilman Drive", 
              password: "1234", password1: "", password2: ""};

global.cards = object.payment_methods;
//global.cards = [{}]



const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 49, paddingTop: 40, fontFamily: "Unica One", textAlign: "center" }}>Settings</Text>

      <FlatList style={ styles.list }
      data={menu} renderItem={({item}) => 
        <Text style={styles.text} onPress={() => {
          global.card = {cardNum: "", expiry: "", cvv: "", name: ""};
          navigation.navigate(item.nav)
        }} >{item.key}</Text>
      } />
      
      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#0a2657',
    color: '#FFD700',
    marginBottom: 1
  },
  list: {
    paddingTop: 30,
    marginBottom: 1
  }
});

export default SettingsScreen;


