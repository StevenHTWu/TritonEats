import { Component } from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import NavBar from "../Components/NavBar";

const status_update = async ( order_id, text ) => {
    const token = await AsyncStorage.getItem("token");
    const response = await trackerApi.patch("/deliveryStatusUpdate", 
      { order_id },
      { 
        headers: { status: this.state.text }
      })
    /*if( this.state.text == "Delivered") {
        navigation.navigate("DelivererHomeScreen")
    }*/
    this.setState({text: text});
    //map_direction();
};

const map_direction = async( ) => {
    const token = await AsyncStorage.getItem("token");
    const response = await trackerApi.post("/mapDirection",
        {token},
        {headers: headers},
    )
    this.setState({link: response})
}

class DelivererStatusScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Picked Up",  
            link: ""
        };
        map_direction();
    }
    render() {
        return (
            <>
            <View style={styles.MainContainer}>
                <Text style={styles.TextStyle} onPress={()=> Linking.openURL(this.state.link)}>Directions</Text>
            </View>
            <TouchableOpacity
                onClick={() => {status_update("Delivered")}}
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
        color: "Blue",
        textDecorationLine: 'underline',
    },
    PaymentBtn: {
        position: 'absolute',
        backgroundColor: "#FFD700",
        bottom: 0,
        width: '100%',
        height: 45,
        //marginLeft: 36   
      },
      ButtonText: {
        fontSize: 23,
        color: "#0a2657",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Unica One",
      }
});