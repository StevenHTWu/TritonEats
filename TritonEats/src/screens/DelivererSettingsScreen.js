import React, { useContext, Component, useEffect } from "react";
import { View, StyleSheet, Text, Button, TextInput, ScrollView, Keyboard, Dimensions, FlatList } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";


const menu = [{key: 'My Profile', nav: 'DelivererProfileScreen'}, 
              {key: 'Add Payment Method', nav: 'DelivererAddCardFromSettingsScreen'}, 
              {key: 'Manage Payment Method(s)', nav: 'DelivererManagePaymentScreen'}, 
              {key: 'Change Password', nav: 'DelivererPasswordScreen'}];

global.object = {name: "mudit", email: "example@ucsd.edu", phone_num: "1234567890", balance: "30",
              payment_methods: [{card_number: "1234567812345678", cvv: "456", expiration_date: "5678", name: "Card 1"},
              {card_number: "1234567812341111", cvv: "123", expiration_date: "1234", name: "Card 2"}],
              apartment: "212", residence: "ERC Building 1", address: "Gilman Drive", 
              password: "1234", password1: "", password2: ""};

global.cards = object.payment_methods;
//global.cards = [{}]



const DelivererSettingsScreen = ({ navigation }) => {
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

DelivererSettingsScreen.navigationOptions = () => {
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

export default DelivererSettingsScreen;



/*
// Constants used in the code
const sixteen = 16;
const four = 4;
const three = 3;
const ten = 10;
const inputHeight = 70;
const buttonHeight = 40;

// To be replaced with return value of GET API
let object2 = {profile: {name: "mudit", email: "example@ucsd.edu", phone: "1234567890"}, 
              payment: {card_number: "1234567890123456", expiry: "0922", cvv: "123"}, 
              address: {apartment_number: "212", building: "Earth Hall North", line: "Address"}, 
              password: "1234", password1: "", password2: ""};
let object = {name: "mudit", email: "example@ucsd.edu", phone_num: "1234567890", 
              card1: {card_number: "", expiry: "", cvv: "", card_holder_name: ""},
              card2: {card_number: "", expiry: "", cvv: "", card_holder_name: ""},
              card3: {card_number: "", expiry: "", cvv: "", card_holder_name: ""},
              card4: {card_number: "", expiry: "", cvv: "", card_holder_name: ""},
              card5: {card_number: "", expiry: "", cvv: "", card_holder_name: ""},
              apartment: "212", residence: "Earth Hall North", address: "Gilman Drive", 
              password: "1234", password1: "", password2: ""};


class DropdownList extends Component {
  
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
        passwordButtonHeight: 0,
        scrollHeight: Dimensions.get("window").height * 0.815
    }
  }

  // Following 4 methods are used to detect whether keyboard is open and 
  // dynamically update ScrollView's height.
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = (e) => {
    this.setState({
      scrollHeight: Dimensions.get("window").height * 0.815 - e.endCoordinates.height
    });
  }
  _keyboardDidHide = () => {
    this.setState({
      scrollHeight: Dimensions.get("window").height * 0.815
    });
  }

  // Maximum one dropdown will be open at a time.
  // opens/closes dropdown for profile.
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
  // opens/closes dropdown for payment.
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
  // opens/closes dropdown for address.
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
  // opens/closes dropdown for password.
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

  // Update user profile (name and email) by making API call to backend
  saveProfile = () => {
  }
  // Update user payment info by making API call to backend
  savePayment = () => {
  }
  // Update user address info by making API call to backend
  saveAddress = () => {
  }
  // Check password1 === password2 and Update user password by making API call to backend
  savePassword = () => {
    if (object.password1 !== object.password2) {
      alert("Error! Passwords don't match.");
      return;
    } else if (object.password === object.password1) {
      alert("Error! Please set a different password.");
      return;
    }
  }

  render() {
    return (
      <SafeAreaView >
        <ScrollView style={{ marginVertical: 20, height: this.state.scrollHeight }} >
          
          <Text style={styles.text} onPress={this.profile} >My Profile</Text>
          <View style={{ height: this.state.profileHeight }}>
            <Text style={styles.inputText} >Name: </Text> 
            <TextInput defaultValue={object.name} style={styles.input} 
            onChangeText={(text) => object.name = text} />
          </View>
          <View style={{ height: this.state.profileHeight }}>
            <Text style={styles.inputText} >Email Address: </Text>
            <TextInput defaultValue={object.email} style={styles.input} 
            keyboardType="email-address" onChangeText={(text) => object.email = text}/>
          </View>
          <View style={{ height: this.state.profileHeight }}>
            <Text style={styles.inputText} >Phone Number: </Text>
            <TextInput defaultValue={object.phone_num} style={styles.input} keyboardType="decimal-pad"
            maxLength={ten} onChangeText={(text) => object.phone_num = text} />
          </View>
          <View style={{ height: this.state.profileButtonHeight }}>  
            <Text style={styles.button} onPress={this.saveProfile} >Save</Text>
          </View>



          <Text style={styles.text} onPress={navigation.navigate("AddPaymentScreen")} >Add Payment Method</Text>
          <Text style={styles.text} onPress={navigation.navigate("ManagePaymentScreen")} >Manage Payment Method(s)</Text>
          

          <Text style={styles.text} onPress={this.address} >Manage Address</Text>
          <View style={{ height: this.state.addressHeight }}>
            <Text style={styles.inputText} >Apartment Number: </Text> 
            <TextInput defaultValue={object.apartment} style={styles.input} 
            onChangeText={(text) => object.apartment = text}/>
          </View>
          <View style={{ height: this.state.addressHeight }}>
            <Text style={styles.inputText} >Building: </Text> 
            <TextInput defaultValue={object.residence} style={styles.input} 
            onChangeText={(text) => object.residence = text}/>
          </View>
          <View style={{ height: this.state.addressHeight }}>
            <Text style={styles.inputText} >Address: </Text> 
            <TextInput defaultValue={object.address} style={styles.input} 
            onChangeText={(text) => object.address = text}/>
          </View>
          <View style={{ height: this.state.addressButtonHeight }}>  
            <Text style={styles.button} onPress={this.saveAddress}>Save</Text>
          </View>

          <Text style={styles.text} onPress={this.password} >Change Password</Text>
          <View style={{ height: this.state.passwordHeight }}>
            <Text style={styles.inputText} >New Password: </Text>
            <TextInput defaultValue="" style={styles.input} secureTextEntry={true} 
            onChangeText={(text) => object.password1 = text}/>
          </View>
          <View style={{ height: this.state.passwordHeight }}>
            <Text style={styles.inputText} >Confirm Password: </Text>
            <TextInput defaultValue="" style={styles.input} secureTextEntry={true} 
            onChangeText={(text) => object.password2 = text}/>
          </View>
          <View style={{ height: this.state.passwordButtonHeight }}>  
            <Text style={styles.button} onPress={this.savePassword}>Save</Text>
          </View>

          <Button title="Sign Out" onPress={logout} />

        </ScrollView>
      </SafeAreaView>
    );
  }

}
let {logout} = {};
let {nav} = {};
const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  logout = signout;
  nav = navigation;
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 49, paddingTop: 40, fontFamily: "Unica One", textAlign: "center" }}>Settings</Text>
      <DropdownList/>
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
    marginBottom: 1
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
  }
});

export default SettingsScreen;

/*


          <Text style={styles.text} onPress={this.payment} >View/Modify Payment Method(s)</Text>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.text} onPress={this.payment} >{object.card1.card_number}</Text>
          </View>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >Card Number: </Text> 
            <TextInput defaultValue={object.card_number} style={styles.input} 
            keyboardType="decimal-pad" maxLength={sixteen} 
            onChangeText={(text) => object.card_number = text}/>
          </View>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >Expiry Date (mmyy): </Text>
            <TextInput defaultValue={object.expiry} style={styles.input} 
            keyboardType="decimal-pad" maxLength={four} 
            onChangeText={(text) => object.expiry = text}/>
          </View>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >CVV number: </Text>
            <TextInput defaultValue={object.cvv} style={styles.input} 
            keyboardType="decimal-pad" maxLength={three} secureTextEntry={true} 
            onChangeText={(text) => object.cvv = text}/>
          </View>
          <View style={{ height: this.state.paymentButtonHeight }}>  
            <Text style={styles.button} onPress={this.savePayment}>Save</Text>
          </View>

*/



/*

<View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >Card Number: </Text> 
            <TextInput defaultValue="" style={styles.input} 
            keyboardType="decimal-pad" maxLength={sixteen} 
            onChangeText={(text) => object.card_number = text}/>
          </View>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >Expiry Date (mmyy): </Text>
            <TextInput defaultValue="" style={styles.input} 
            keyboardType="decimal-pad" maxLength={four} 
            onChangeText={(text) => object.expiry = text}/>
          </View>
          <View style={{ height: this.state.paymentHeight }}>
            <Text style={styles.inputText} >CVV number: </Text>
            <TextInput defaultValue="" style={styles.input} 
            keyboardType="decimal-pad" maxLength={three} secureTextEntry={true} 
            onChangeText={(text) => object.cvv = text}/>
          </View>
          <View style={{ height: this.state.paymentButtonHeight }}>  
            <Text style={styles.button} onPress={this.savePayment}>Save</Text>
          </View>

          */