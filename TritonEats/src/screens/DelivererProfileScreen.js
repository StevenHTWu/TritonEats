import React, { useState, useContext, Component } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { navigate } from "../navigationRef";
import { setDelivererProfile, getDelivererInfo } from "./DelivererSettingsScreen";
const ten = 10;
import { withNavigationFocus } from "react-navigation";
class DelivererProfileScreen extends Component {
  //= ({ navigation }, props) => {
  /*
  const [name1, onChangeText1] = React.useState(' CardHolder Name');
  const [cardnum, onChangeText2] = React.useState(' 1234-5678-1234-5678');
  const [date1, onChangeText3] = React.useState(' MM/YY');
  const [cvv1, onChangeText4] = React.useState(' CVV');
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  const data = {name:"hello", age:"15"}
  */
  constructor(props) {
    super(props);
    this.state = {
      name: delivererProfileInfo.name,
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Unica One",
              paddingLeft: "30%",
              color: "white"
            }}
          >
            User Profile
          </Text>
          <Image
            style={styles.CardImg}
            source={require("../../assets/profile.png")}
          />
          <View style={styles.layer1}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Unica One",
                paddingTop: 5,
                paddingLeft: 10,
              }}
            >
              Name
            </Text>
            <TextInput
              label="Name"
              //value={cardNum}
              onChangeText={(name) => this.setState({ name })}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textIn}
              placeholder={"Name"}
              defaultValue={this.state.name}
            />


            <View style={styles.layer2}>
              <TouchableOpacity
                onPress={() => {
                  ordererProfileInfo.name = this.state.name;

                  
                  setDelivererProfile(this.state.name);
                  navigate("DelivererSettingsScreen");

                }}
                style={styles.AddCardBtn}
              >
                <Text style={styles.ButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const digitsOnly = (string) =>
  [...string].every((c) => "0123456789".includes(c));
const validEmail = (string) => string.includes("@") && string.includes(".");

DelivererProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657", paddingTop: 100 },
  CardImg: {
    width: 120,
    height: 120,
    //marginLeft: 125,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    zIndex: 1,
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 230,
    width: "100%",
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 360,
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    alignSelf: "center",
  },
  ButtonText: {
    fontSize: 23,
    color: "#0a2657",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
});

export default withNavigationFocus(DelivererProfileScreen);
