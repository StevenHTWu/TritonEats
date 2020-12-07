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
import { AsyncStorage } from "react-native";
var CurrentCart = require("../Components/Cart");
import trackerApi from "../api/tracker";
import Loader from "../Components/Loader";

global.order = {order_id: "", orderer_id: "", restaurant: ""};

class DelivererHomeScreen extends Component {
  constructor(props) {
    
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      Restaurants: [
        {

       }
      ],
      errorMessage: false,
    };
  }
  async componentDidMount() {
    this.refresh();
  }
  async refresh() {
    console.log("Getting order list");
    const response = await trackerApi.get(
      "/allOrders"
    );
    //console.log("-----------------------");
    console.log("-----------------------");
    var dataset = response.data;
    var stateUpdate = []
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].status === "pending") {
        console.log(dataset[i]);
        stateUpdate.push ({
          Id: i.toString(),
          Secret: dataset[i].order_id,
          Name: dataset[i].restaurant_name,
          Orderer_Id: dataset[i].orderer_id,
          Compensation: (dataset[i].total_price * 0.1).toFixed(2)
        });
      }
    }

    this.setState({Restaurants: stateUpdate});
    console.log("Update complete");
  }

  async refresh() {
    this.setState( {
      Restaurants : this.state.Restaurants,
      errorMessage: false
    })
    console.log("Getting order list");
    const response = await trackerApi.get(
      "/allOrders"
    );
    //console.log("-----------------------");
    //console.log("-----------------------");
    var dataset = response.data;
    var stateUpdate = []
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].status === "pending") {
        //console.log(dataset[i]);
        stateUpdate.push ({
          Id: i.toString(),
          Name: dataset[i].restaurant_name,
          Compensation: (dataset[i].total_price * 0.1).toFixed(2),
          secret: dataset[i].order_id,
        });
      }
    }
    
    this.setState({Restaurants: stateUpdate});
    console.log("Update complete");
  }

  async componentDidMount() {
    this.refresh()
  }

  render() {
    let view;
    console.log(this.state.errorMessage);
    if (this.state.errorMessage === true) {
      view = (
        <Text
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: 20,
            padding: 10,
            margin: 0,
          }}
        >
          You already have a job active! Please complete it before continuing!
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
        
          <View style={styles.List}>
            <FlatList
              data={this.state.Restaurants}
              renderItem={({ item }) => (
                <View style={styles.restaurant}>
                  <Text style={styles.name}>{item.Name}</Text>
                  <Text style={styles.compensation}>${item.Compensation}</Text>

                  <TouchableOpacity
                    onPress={() => {
               
                      order.order_id = item.Secret;
                      order.orderer_id = item.Orderer_Id;
                      order.restaurant = item.Name;
                      
                      navigate("DelivererStatusScreen");
                    
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Accept Job</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.Id}
            />

            <TouchableOpacity
              onPress={this.refresh}
              style={styles.refresh}
            >
              <Image
                style={styles.refreshIcon}
                source={require("../../assets/refreshIcon.jpg")}
              />
              <Text style={styles.refreshText}> Click to Refresh Page</Text>
            </TouchableOpacity>
            {view}
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
    paddingBottom: "10%",
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
    width: "100%",
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
