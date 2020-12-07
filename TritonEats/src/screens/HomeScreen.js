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
import foodWorx from "../../assets/FWsandwich.jpg";
import pines from "../../assets/Pinsalmon.jpg";
import clubMed from "../../assets/CMfish.jpg";
import canVista from "../../assets/CanVnoodles.jpg";
import degrees from "../../assets/64burrito.jpg";
import cafeV from "../../assets/CafeVsalad.jpg";
import oceanView from "../../assets/OVpizza.jpg";

import CurrentCart from "../Components/Cart";
import { navigate } from "../navigationRef";

import trackerApi from "../api/tracker";
import Loader from "../Components/Loader";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isEmpty: false,
      Restaurants: [
        {
          Id: "1",
          Image: degrees,
          Name: "64 Degrees",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "2",
          Image: cafeV,
          Name: "Cafe Ventanas",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "3",
          Image: canVista,
          Name: "Canyon Vista",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "4",
          Image: clubMed,
          Name: "Club Med",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "5",
          Image: foodWorx,
          Name: "Foodworx",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "6",
          Image: oceanView,
          Name: "OceanView",
          Hours: "7 am to 9 pm",
        },
        {
          Id: "7",
          Image: pines,
          Name: "Pines",
          Hours: "7 am to 9 pm",
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await trackerApi.get("/homescreen");

    console.log("-----------------------");
    console.log(response.data);
    console.log("-----------------------");
    if (response.data.length == 0) {
      this.setState({
        isLoading: false,
        isEmpty: true,
      });
    } else {
      var resArr = [];
      response.data.forEach(function (item) {
        var obj = {};
        obj.Name = item.Name;
        obj.Hours = item.Hours;
        if (item.Name == "Pines") obj.Image = pines;
        else if (item.Name == "OceanView") obj.Image = oceanView;
        else if (item.Name == "64 Degrees") obj.Image = degrees;
        else if (item.Name == "Foodworx") obj.Image = foodWorx;
        else if (item.Name == "Club Med") obj.Image = clubMed;
        else if (item.Name == "Canyon Vista") obj.Image = canVista;
        else if (item.Name == "Cafe Ventanas") obj.Image = cafeV;
        else obj.Image = canVista;
        resArr.push(obj);
      });

      this.setState({
        isLoading: false,
        isEmpty: false,
        Restaurants: resArr,
      });
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <SafeAreaView forceInset={{ top: "always" }}>
          <Loader loading={this.state.isLoading} />
          {this.state.isEmpty ? (
            <>
              <Image
                style={styles.LogoImg}
                source={require("../../assets/TritonLogo.png")}
              />
              <Text style={styles.LogoFont}>Triton Eats</Text>
              <Text style={styles.emptyMessage}>
                No restaurants are currently open.
              </Text>
            </>
          ) : (
            <>
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
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          CurrentCart.viewing_restaurant = item.Name;
                          navigate("MenuScreen");
                        }}
                        style={styles.restaurant}
                      >
                        <Image style={styles.icon} source={item.Image} />
                        <Text style={styles.name}>{item.Name}</Text>
                        <Text style={styles.hours}>{item.Hours}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.Id}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  image: {
    width: 375,
    height: 175,
  },
  name: {
    fontSize: 28,
    width: "30%",
    height: 75,
    marginLeft: "5%",
    marginRight: "1%",
    color: "white",
    textAlign: "left",
    fontFamily: "Unica One",
  },
  hours: {
    fontSize: 19,
    color: "white",
    fontFamily: "Unica One",
    textAlign: "right",
    marginRight: "20%",
  },
  List: {
    paddingBottom: 200,
  },
  icon: {
    width: "22%",
    height: "80%",
    marginLeft: "3%",
  },
  restaurant: {
    backgroundColor: "#0a2657",
    paddingVertical: "5%",
    width: 375,
    marginTop: 0,
    flexDirection: "row",
    marginBottom: 5,
  },
  LogoFont: {
    fontSize: 55,
    fontFamily: "Unica One",
    paddingLeft: 20,
  },
  Container: {
    marginTop: 5,
    marginRight: 10,
  },
  LogoRow: {
    flexDirection: "row",
    marginHorizontal: "6%",
  },
  LogoImg: {
    width: 50,
    height: 50,
  },
  emptyMessage: {
    fontSize: 25,
    fontFamily: "Unica One",
    textAlign: "center",
    paddingTop: "50%",
  },
});

export default HomeScreen;
