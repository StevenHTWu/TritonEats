import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";

const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const menu = [{key: 'My Profile', nav: 'HomeScreen'}, {key: 'Payment Methods', nav: 'OrderHistoryScreen'}, 
  {key: 'Manage Address', nav: 'ShoppingCartScreen'}, {key: 'Manage Profile Picture', nav: 'HomeScreen'}, 
  {key: 'Change Password', nav: 'HomeScreen'}, {key: 'Log Out', nav: 'loginFlow'}];

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      
      <Text style={{ fontSize: 49, paddingTop: 40, fontFamily: "Unica One", textAlign: "center" }}>Settings</Text>
      
      <FlatList style={ styles.list }
      data={menu} renderItem={({item}) => 
        <Text style={styles.text} onPress={() => navigation.navigate(item.nav)} >{item.key}</Text>
      } />
      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#0a2657',
    color: '#FFD700',
    marginBottom: 1,
    /*
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'*/
  },
  list: {
    paddingTop: 40
  }
});

export default SettingsScreen;
