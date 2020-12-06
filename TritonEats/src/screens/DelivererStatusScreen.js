import React, { Component } from "react";
import { Linking, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import NavBar from "../Components/NavBar";
import { NativeModules } from "react-native";
import { navigate } from "../navigationRef";

class DelivererStatusScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Picked Up",  
            link: ""
        };
        //map_direction();
        this.status_update = this.status_update.bind(this);
        this.map_direction = this.map_direction.bind(this);

        this.map_direction();
    }
    map_direction = async( ) => {
        const token = await AsyncStorage.getItem("token");
        const response = await trackerApi.post("/mapDirection",
            {token},
            {headers: headers},
        )
        this.setState({link: response})
    }
    status_update = async ( text ) => {
        const token = await AsyncStorage.getItem("token");
        const response = await trackerApi.patch("/deliveryStatusUpdate", 
          { token },
          { 
            headers: { status: this.state.text }
          })
        if( this.state.text == "Delivered") {
            navigate("DelivererHomeScreen")
        }
        this.setState({text: text});
        this.map_direction();
    };
    render() {
        return (
            <>
            <View style={styles.MainContainer}>
                <Text style={styles.TextStyle} onPress={()=> Linking.openURL(this.state.link)}>Directions</Text>
            </View>
            <TouchableOpacity
                onClick={() => {this.status_update("Delivered")}}
                style={styles.PaymentBtn} >
                <Text style={styles.ButtonText}>{this.state.text}</Text>
            </TouchableOpacity>
            </>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    TextStyle: {
        fontSize: 20,
        color: "#0a2657",
        textDecorationLine: 'underline',
    },
    PaymentBtn: {
        position: 'absolute',
        backgroundColor: "#0a2657",
        bottom: 0,
        width: '100%',
        height: 45,
        //marginLeft: 36   
      },
      ButtonText: {
        fontSize: 23,
        color: "#FFD700",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Unica One",
      }
});

export default DelivererStatusScreen;
