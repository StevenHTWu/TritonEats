import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { StyleSheet, View, Text, Image, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback, Picker } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const residences = [
"Revelle: Argo Hall", "Revelle: Blake Hall", "Revelle: Atlantis Hall", "Revelle: Beagle Hall", 
"Revelle: Challenger Hall", "Revelle: Discovery Hall", "Revelle: Galathea Hall", "Revelle: Meteor Hall",
"Revelle: Keeling Apartments",

"Muir: Tenaya", "Muir: Tioga", "Muir: Tuolumne", "Muir: Tamarack",
"Marshall: Lower Apartments", "Marshall: Upper Apartments", "Marshall: Residential Halls",

"Warren: Frankfurter", "Warren: Harlan", "Warren: Stewart", "Warren: Black", "Warren: Brennan", 
"Warren: Douglas", "Warren: Goldberg", "Warren: Bates", "Warren: Brown",

"ERC: North America", "ERC: Latin America", "ERC: Europe", "ERC: Asia", "ERC: Africa",
"ERC: Earth Hall North", "ERC: Earth Hall South", "ERC: Oceania", "ERC: Middle East", "ERC: Mesa Verde",
"I-House: Geneva", "I-House: Kathmandu", "I-House: Cuzco", "I-House: Asante",

"Sixth: Catalyst", "Sixth: Kaleidoscope", "Sixth: Tapestry",
"Village: West Building (1-8)", "Village: East Building (1-5)"
];

const AddressScreen = ({ navigation }) => {
  //const [response, setResponse] = useState();

  const [selectedValue, setSelectedValue] = useState(object.residence);
  const [alternateSelect, setAlternateSelect] = useState(true);
  const [apartmentValue, setApartmentValue] = useState(object.apartment);
  const [addressValue, setAddressValue] = useState(object.address);

  const changeSelect = () => {
    setAlternateSelect(alternateSelect => !alternateSelect);
  }

  return (
      
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
              style={styles.CardImg}
              source={require("../../assets/pay.png")}
              
        />
        <View style={styles.layer1}>

            <Text
              style={{
                fontSize: 20,
                fontFamily: "Unica One",
                paddingTop: 5,
                paddingLeft: 10,
              }}>Apartment Number</Text>
            <TextInput
              label="Apartment Number"
              onChangeText={(apartment) => { setApartmentValue(apartment) }}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textIn}
              placeholder={"Apartment Number"}
              defaultValue={object.apartment}
            />

            <Text
              style={{
                fontSize: 20,
                fontFamily: "Unica One",
                paddingTop: 5,
                paddingLeft: 10,
              }}>Address</Text>
            <TextInput
              label="Address"
              onChangeText={(address) => { setAddressValue(address) }}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textIn}
              placeholder={"Address"}
              defaultValue={object.address}
            />

            <Text
              style={{
                fontSize: 20,
                fontFamily: "Unica One",
                paddingTop: 5,
                paddingLeft: 10,
              }}>Residence</Text>

            <Picker style={styles.selectCard}
                selectedValue={selectedValue}
                mode="dropdown"
                //style={{ height: 50, width: 400}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >{residences.map(residence => <Picker.Item label={residence} value={residence} />)}
            </Picker>
              
            <View style={styles.layer2}>
                    <TouchableOpacity
                        onPress={() => {
                            if (apartmentValue.length === 0 || addressValue.length === 0) {
                                Alert.alert("Error! Please enter valid information.")
                            } else {
                                object.residence = selectedValue;
                                object.apartment = apartmentValue;
                                object.address = addressValue;
                                // make api call to save data
                                navigation.navigate("SettingsScreen")
                            }
                        }}
                        style={styles.PaymentBtn}
                    >
                        <Text style={styles.ButtonText}>Save</Text>
                    </TouchableOpacity>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
AddressScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657",paddingTop: 100},
  CardImg: {
    width: 120,
    height: 120,
    //marginLeft: 125,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
    zIndex: 1
  },
  CardImgVisa: {
    width: 50,
    height: 40,
    marginLeft: 20,
    position: "absolute",
    bottom: 9
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 230,
    width: "100%"
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 325
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 160,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 125
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    //marginLeft: 36,
    alignSelf: "center"
  },
  ButtonText: {
    fontSize: 23,
    color: "#0a2657",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  selectCard: {
    backgroundColor: "#f1f2f6",
    height: 60,
    //width: 330,
    //marginLeft: 30,
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 20,
    paddingLeft: 3,
    marginHorizontal: 10
  },
  selectCardPress: {
    flex: 1, 
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: "#0a2657",
    borderRadius: 6,
    height: 60,
    width: 330,
    position: "absolute",
    top:0,
    paddingTop: 17,
    
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
});

export default AddressScreen;


/*
"Revelle: Hawai'i", "Revelle: Molokai'i", "Revelle: Kaho'olawe", "Revelle: Maui", "Revelle: Lana'l",
"Revelle: O'ahu", "Revelle: Ni'ihau", "Revelle: Kaua'i",
*/