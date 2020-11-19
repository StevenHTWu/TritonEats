import React, { useContext, Component } from "react";
import ReactDOM from 'react-dom';
import { View, StyleSheet, Text, Button, FlatList, TextInput, ScrollView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";

const sixteen = 16;
const four = 4;
const three = 3;
const inputHeight = 70;
const buttonHeight = 40;
let menu = [{key: 'My Profile', nav: 'HomeScreen', val : 'profile'}, {key: 'Payment Methods', nav: 'OrderHistoryScreen', val : false}, 
  {key: 'Manage Address', nav: 'ShoppingCartScreen', val : false}, {key: 'Manage Profile Picture', nav: 'HomeScreen', val : false}, 
  {key: 'Change Password', nav: 'HomeScreen', val : false}, {key: 'Log Out', nav: 'loginFlow', val : false}];

let object = {profile: {name: "Mudit Bajaj", email: "muditbajaj97@gmail.com"}, payment: {card_number: "1234567890123456", expiry: "0922", cvv: "123"}, address: {apartment_number: "212", building: "Earth Hall North", line: "Instructions"}, password: "qwerty1234"};

class Test extends Component {
  constructor(){
    super();
    this.state = {
        profileHeight: 0,
        paymentHeight: 0,
        addressHeight: 0,
        passwordHeight: 0,
        profileButtonHeight: 0,
        paymentButtonHeight: 0,
        addressButtonHeight: 0,
        passwordButtonHeight: 0
    }
  }
  profile = () => {
    if (this.state.profileHeight === 0) {
      this.setState({
        profileHeight: inputHeight,
        paymentHeight: 0,
        addressHeight: 0,
        passwordHeight: 0,
        profileButtonHeight: buttonHeight,
        paymentButtonHeight: 0,
        addressButtonHeight: 0,
        passwordButtonHeight: 0
      });
    } else {
      this.setState({
        profileHeight: 0,
        profileButtonHeight: 0
      })
    }
  }
  payment = () => {
    if (this.state.paymentHeight === 0) {
      this.setState({
        profileHeight: 0,
        paymentHeight: inputHeight,
        addressHeight: 0,
        passwordHeight: 0,
        profileButtonHeight: 0,
        paymentButtonHeight: buttonHeight,
        addressButtonHeight: 0,
        passwordButtonHeight: 0
      });
    } else {
      this.setState({
        paymentHeight: 0,
        paymentButtonHeight: 0
      })
    }
  }
  address = () => {
    if (this.state.addressHeight === 0) {
      this.setState({
        profileHeight: 0,
        paymentHeight: 0,
        addressHeight: inputHeight,
        passwordHeight: 0,
        profileButtonHeight: 0,
        paymentButtonHeight: 0,
        addressButtonHeight: buttonHeight,
        passwordButtonHeight: 0
      });
    } else {
      this.setState({
        addressHeight: 0,
        addressButtonHeight: 0,
      })
    }
  }
  password = () => {
    if (this.state.passwordHeight === 0) {
      this.setState({
        profileHeight: 0,
        paymentHeight: 0,
        addressHeight: 0,
        passwordHeight: inputHeight,
        profileButtonHeight: 0,
        paymentButtonHeight: 0,
        addressButtonHeight: 0,
        passwordButtonHeight: buttonHeight
      });
    } else {
      this.setState({
        passwordHeight: 0,
        passwordButtonHeight: 0
      })
    }
  }
// secureTextEntry, 
  render() {
    return (
      <>
        
        <Text style={styles.text} onPress={this.profile} >My Profile</Text>
        <View style={{ height: this.state.profileHeight }}>
          <Text style={styles.inputText} >Name: </Text> 
          <TextInput defaultValue={object.profile.name} style={styles.input}  />
        </View>
        <View style={{ height: this.state.profileHeight }}>
          <Text style={styles.inputText} >Email Address: </Text>
          <TextInput defaultValue={object.profile.email} keyboardType="email-address" style={styles.input} />
        </View>
        <View style={{ height: this.state.profileButtonHeight }}>  
          <Text style={styles.button} >Save</Text>
        </View>

        <Text style={styles.text} onPress={this.payment} >Payment Method</Text>
        <View style={{ height: this.state.paymentHeight }}>
          <Text style={styles.inputText} >Card Number: </Text> 
          <TextInput defaultValue={object.payment.card_number} style={styles.input} keyboardType="decimal-pad" maxLength={sixteen} />
        </View>
        <View style={{ height: this.state.paymentHeight }}>
          <Text style={styles.inputText} >Expiry Date (mmyy): </Text>
          <TextInput defaultValue={object.payment.expiry} style={styles.input} keyboardType="decimal-pad" maxLength={four} />
        </View>
        <View style={{ height: this.state.paymentHeight }}>
          <Text style={styles.inputText} >CVV number: </Text>
          <TextInput defaultValue={object.payment.cvv} style={styles.input} keyboardType="decimal-pad" maxLength={three} secureTextEntry={true} />
        </View>
        <View style={{ height: this.state.paymentButtonHeight }}>  
          <Text style={styles.button} >Save</Text>
        </View>

        <Text style={styles.text} onPress={this.address} >Manage Address</Text>        
        <View style={{ height: this.state.addressHeight }}>
          <Text style={styles.inputText} >Apartment Number: </Text> 
          <TextInput defaultValue={object.address.apartment_number} style={styles.input} />
        </View>
        <View style={{ height: this.state.addressHeight }}>
          <Text style={styles.inputText} >Building: </Text> 
          <TextInput defaultValue={object.address.building} style={styles.input} />
        </View>
        <View style={{ height: this.state.addressHeight }}>
          <Text style={styles.inputText} >Address Line: </Text> 
          <TextInput defaultValue={object.address.line} style={styles.input} />
        </View>
        <View style={{ height: this.state.addressButtonHeight }}>  
          <Text style={styles.button} >Save</Text>
        </View>

        <Text style={styles.text} onPress={this.password} >Change Password</Text>
        <View style={{ height: this.state.passwordHeight }}>
          <Text style={styles.inputText} >New Password: </Text>
          <TextInput defaultValue="" style={styles.input} secureTextEntry={true} />
        </View>
        <View style={{ height: this.state.passwordHeight }}>
          <Text style={styles.inputText} >Confirm Password: </Text>
          <TextInput defaultValue="" style={styles.input} secureTextEntry={true} />
        </View>
        <View style={{ height: this.state.passwordButtonHeight }}>  
          <Text style={styles.button} >Save</Text>
        </View>
        
      </>
    );
  }

}

const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      
      <Text style={{ fontSize: 49, paddingTop: 40, fontFamily: "Unica One", textAlign: "center" }}>Settings</Text>
      
      <ScrollView style={styles.scroll} >
        <Test/>
        <Button title="Sign Out" onPress={signout} />
      </ScrollView>
      

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
  },
  input: {
    borderColor: '#444444',
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    marginHorizontal: 10,
    padding: 2,
    paddingHorizontal: 10,
  },
  inputText: {
    margin: 2,
    marginHorizontal: 5,
    padding: 2,
    paddingHorizontal: 5,
  },
  button: {
    paddingTop: 5,
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  scroll: {
    marginVertical: 20,
  }
});

export default SettingsScreen;
/*
class Test extends Component{
 
  constructor(){
      super();
      this.state = {
          TextHolder:''
      }
  }
  ChangeTextFunction =()=> {
      this.setState({
        TextHolder: "This is New Text."
      })
  }
   render(){
      return(
      

      <FlatList style={ styles.list }
      data={menu} renderItem={({item}) => {
        return (
        <>
          <Text style={styles.text} onPress={this.ChangeTextFunction} >{item.key}</Text>
          <Text>{this.state.TextHolder}</Text>
          
        </>
        );
      }} />
      );
  }
}
*/

/*
<FlatList style={ styles.list }
      data={menu} renderItem={({item}) => 
        <Text style={styles.text} onPress={() => navigation.navigate(item.nav)} >{item.key}</Text>
      } />
*/

/*
<FlatList style={ styles.list }
      data={menu} renderItem={({item}) => {
        return (
        <>
          <Text style={styles.text} onPress={item.key === 'My Profile' ? this.profile : this.changeText} >{item.key}</Text>
        <Text style={{ height: this.state.h }} >{this.state.TextHolder} {this.state.profile}</Text>
        </>
        );
      }} />
*/