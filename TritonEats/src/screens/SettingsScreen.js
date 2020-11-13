import React from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";

const SettingsScreen = ({ navigation }) => {

  const menu = [{key: 'My Profile', nav: 'HomeScreen'}, {key: 'Payment Methods', nav: 'OrderHistoryScreen'}, {key: 'Manage Address', nav: 'ShoppingCartScreen'}, {key: 'Manage Profile Picture', nav: 'HomeScreen'}, {key: 'Change Password', nav: 'HomeScreen'}];

  return (
    <>
      <Text style={{ fontSize: 49, padding: 15, paddingTop: 25 }}>Settings</Text>
      
      <FlatList style={ styles.list }
      data={menu} renderItem={({item}) => 
        <Text style={styles.text} onPress={() => navigation.navigate(item.nav)} >{item.key}</Text>
      } />
      
      <Button title="LogOut" onPress={() => navigation.navigate("loginFlow")} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#0a2657',
    color: '#FFD700',
    marginBottom: 1
    /*
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'*/
  },
  list: {
    paddingTop: 30
  }
});

export default SettingsScreen;
