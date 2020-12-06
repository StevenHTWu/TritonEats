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
import { navigate } from "../navigationRef";

import NavBar from "../Components/NavBar";

class DelivererHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Restaurants: [
        {
          Id: "1",
          Name: "64 Degrees to Earl Warren College  (0.9 miles)",
          Compensation: "Estimated Earnings: $8.65 + $1.76 tip",
        },
        {
          Id: "2",
          Name: "Cafe Ventanas to The Village  (0.2 mi)",
          Compensation: "Estimated Earnings: $5.87 + $0.89 tip",
        },
        {
          Id: "3",
          Name: "Canyon Vista to Thurgood Marshall College  (0.6 mi)",
          Compensation: "Estimated Earnings: $7.41 + $2.03 tip",
        },
        {
          Id: "4",
          Name: "Foodworx to Sixth College  (1.2 mi)",
          Compensation: "Estimated Earnings: $10.62 + $3.84 tip",
        },
        {
          Id: "5",
          Name: "OceanView to John Muir College  (0.5 mi)",
          Compensation: "Estimated Earnings: $6.54 + $1.06 tip",
        },
        {
          Id: "6",
          Name: "Pines to Revelle College  (0.5)",
          Compensation: "Estimated Earnings: $6.27 + $1.89 tip",
        },
      ],
    };
  }

  render() {
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

          <View style={styles.List}>
            <FlatList
              data={this.state.Restaurants}
              renderItem={({ item }) => (
                <View style={styles.restaurant}>
                  <Text style={styles.name}>{item.Name}</Text>
                  <Text style={styles.compensation}>{item.Compensation}</Text>

                  <TouchableOpacity
                    onPress={() => navigate("DelivererStatusScreen")}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Accept Job</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.Id}
            />

            <TouchableOpacity
              onPress={() => navigate("HomeScreen")}
              style={styles.refresh}
            >
              <Image
                style={styles.refreshIcon}
                source={require("../../assets/refreshIcon.jpg")}
              />
              <Text style={styles.refreshText}> Click to Refresh Page</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

DelivererHomeScreen.navigationOptions = () => {
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

export default DelivererHomeScreen;
