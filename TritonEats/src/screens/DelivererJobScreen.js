import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import NavBar from "../Components/NavBar";
import { AsyncStorage } from "react-native";
var delivery = require("../Components/DelivererGlobal");
import trackerApi from "../api/tracker";
import Loader from "../Components/Loader";

class DelivererJobScreen extends Component {
  constructor(props) {
    
    super(props);
 
  }

  

  render() {
    let view;
    if (delivery.order_id === "") {
      view = (
        <Text
          style={{
            backgroundColor: "#0a2657",
            color: "white",
            fontSize: 30,
            padding: "25%",

            margin: "10%",
            textAlign: "center"
          }}
        >
          No active jobs
        </Text>
      );
    } else {
      view = null;
    }
    return (
      <View style={styles.main}>
        <SafeAreaView forceInset={{ top: "always" }}>
          <View style={styles.Container}>
            <View style={styles.LogoRow}>
              <Image
                style={styles.LogoImg}
                source={require("../../assets/TritonLogo.png")}
              />
              <Text style={styles.LogoFont}>Triton Eats</Text>
            </View>
          </View>


          {view}

          

        </SafeAreaView>
      </View>
    );
  }
}

DelivererJobScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 375,
    height: 175,
  },
  name: {
    fontSize: 24,
    color: "#FFD700",
    fontFamily: "Unica One",
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginHorizontal: 20,
  },
  compensation: {
    fontSize: 21,
    color: "white",
    fontFamily: "Unica One",
    textAlign: "center",
    flexDirection: "row",
  },
  List: {
    paddingBottom: 195,
  },
  icon: {
    width: "22%",
    height: "80%",
    marginLeft: "3%",
  },
  info: {
    flexDirection: "row",
  },
  refreshIcon: {
    width: 25,
    height: 25,
    marginVertical: 5,
  },
  refreshText: {
    fontFamily: "Unica One",
    textAlign: "center",
    fontSize: 28,
    color: "black",
  },
  refresh: {
    borderColor: "#0a2657",
    borderBottomWidth: 2,
    width: 375,
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: "13%",
  },
  buttonText: {
    color: "#FFD700",
    fontFamily: "Unica One",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#0a2657",
    borderColor: "#FFD700",
    borderWidth: 1,
    width: 150,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  restaurant: {
    backgroundColor: "#0a2657",
    paddingVertical: "5%",
    width: 375,
    marginTop: 0,
    marginBottom: 5,
  },
  LogoFont: {
    fontSize: 55,
    fontFamily: "Unica One",
    paddingLeft: 20,
  },
  Container: {
    //marginTop: 10,
    //marginBottom: 15,
    //marginRight: 10,
  },
  LogoRow: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  LogoImg: {
    width: 50,
    height: 50,
  },
});

export default DelivererJobScreen;
