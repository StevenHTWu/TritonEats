import React, { Component } from "react";
import { Linking, StyleSheet, TouchableOpacity, View, Text, ImageBackground } from "react-native";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import NavBar from "../Components/NavBar";
import { NativeModules } from "react-native";
import { navigate } from "../navigationRef";
import traffic from "../../assets/traffic.png";

const getOrderStatus = async () => {
    console.log("Calling getORderStatus");
    const token = await AsyncStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const response = await trackerApi.get("/orderer/orderInfoAsDeliverer", 
        { 
        order_id : order.orderer_id
      },
      { headers : headers 
    
    }).then((res) => {
        var userInfo = res.data;
        var info = userInfo[0];

        var address = userInfo.address;
        var residence = userInfo.residence;
        var apartment = userInfo.apartment;

        this.setState( {
            address: address,
            residence: residence,
            apartment: apartment
        });
    
    });
  };

class DelivererStatusScreen extends Component {

    // constructor that sets button text to picked up and initializes link
    constructor(props) {
        console.log(order);
        super(props);
        this.state = {
            text: "",  
            link: "",
            address: "",
            apartment: "",
            residence: "",
            fake: order
        };
        //binding the two functions so they act on correct object
        this.status_update = this.status_update.bind(this);
        this.map_direction = this.map_direction.bind(this);
        
        //Update status in database to Pending and get directions to restaraunt.
        
    }
    map_direction = ( ) => {
        switch (order.restaurant) {
            case ("Pines"):
                this.setState( { link: "https://goo.gl/maps/dZBAF9C48MYWjnxDA" } );
            case ("64 Degrees"):
                this.setState( { link: "https://goo.gl/maps/dM3Z6QfzAnbhVT3p6" } );
            case ("Cafe Ventanas"):
                this.setState( { link: "https://goo.gl/maps/QxAVFtB9axgYqrAB9" } );
            case ("OceanView"):
                this.setState( { link: "https://goo.gl/maps/LFDDc3Dtq6vHa9U37" } );
            case ("Foodworx"):
                this.setState( { link: "https://goo.gl/maps/1bgKS1jvH6GMzLkc6" } );
            case ("Club Med"):
                this.setState( { link: "https://goo.gl/maps/azDZHitkQAnqYg8P7" } );
            case ("Canyon Vista"):
                this.setState( { link: "https://goo.gl/maps/QSXhZ5cVwVx138cw7" } );
        }
        
    }

    orderer_direction = async ( text ) => {
        
        const token = await AsyncStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const response = await trackerApi.get("/auth/orderer/getUserInfoAsDeliverer", 
            { 
            order_id : order.orderer_id
          },
          { headers : headers 
        
        }).then((res) => {
            var userInfo = res.data;
            var info = userInfo[0];

            var address = userInfo.address;
            var residence = userInfo.residence;
            var apartment = userInfo.apartment;

            this.setState( {
                address: address,
                residence: residence,
                apartment: apartment
            });
        
        });


    }
    status_update = async ( text ) => {
        console.log("Calling update...");
        const token = await AsyncStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await trackerApi.patch("/auth/deliveryStatusUpdate", 
            { 
            status: this.state.text,
            order_id : order.order_id
          },
          { headers : headers 
        
        }).then ( (res) => {
                if( this.state.text == "Delivered") {
                    navigate("DelivererHomeScreen");
                }
                if( text === "Picked Up" ) {
                    
                    this.setState({text: "Delivered"});
                    this.orderer_direction();
                    this.setState({text: text});
                } 
                this.map_direction();
          });
    };




    componentDidMount = () => {
        this.state.text = getOrderStatus();
        this.map_direction();
    }


    render() {
        console.log("===================");
        //On click of the url the link would open.
        //On clicking of the button the text would change to delivered and the status would be updated to Picked up.
        //On clicking of button second time database would be notified of complete delivery and you would be redirected to home page.
        console.log("STATE: " + this.state.text);
        if (this.state.text === "Pending") {
            var display = (


            <View style={styles.MainContainer}>
                <View style={ { padding: 20} }>
                    <Text style={ {fontSize: 30} }>Pick Up From {order.restaurant}</Text>

                </View>
                <TouchableOpacity 
                    onPress={()=> Linking.openURL(this.state.link)}
                    style={styles.directionStyle}
                    >
        
                    <Text style={styles.TextStyle} >Directions</Text>
                </TouchableOpacity>
                
                
            
            <TouchableOpacity
                onPress={() => {
                    console.log("Picked up!");

                    this.status_update("Picked Up");
                }}
                style={styles.StatusBtn} >
                <Text style={styles.ButtonText}>Picked up?</Text>
            </TouchableOpacity>
            </View>

            );
        } else if (this.state.text === "Picked Up") {
            console.log("Successfully changed...");
            var display = (


                <View style={styles.MainContainer}>
                    <View style={ { padding: 20} }>
                        <Text style={ {fontSize: 30} }>Deliver To {this.state.apartment} {this.state.residence} </Text>
    
                    </View>
                    <TouchableOpacity 
                        onPress={()=> Linking.openURL(this.state.residence + this.state.address)}
                        style={styles.directionStyle}
                        >
            
                        <Text style={styles.TextStyle} >Directions</Text>
                    </TouchableOpacity>
                    
                    
                
                <TouchableOpacity
                    onPress={() => {
                        console.log("Delivered!");
    
                        this.status_update("Delivered");
                    }}
                    style={styles.StatusBtn} >
                    <Text style={styles.ButtonText}>Delivered?</Text>
                </TouchableOpacity>
                </View>
    
                );
        }

        return (
            <View>
            {display}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: "10%",
    },
    TextStyle: {
        fontSize: 23,
        color: "#FFD700",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Unica One",
        backgroundColor: "#0a2657",
        margin: "5%",
        padding: "10%",
        borderRadius: 50
    },
    directionStyle: {

        alignSelf: "center",
        fontFamily: "Unica One",
        backgroundColor: "#0a2657",

        borderRadius: 50
    },
    StatusBtn: {
        backgroundColor: "#296906",
        marginBottom: "40%",
        width: '70%',
        height: 200,
        paddingHorizontal: "10%",
        marginHorizontal: "16%",
        textAlign: 'center', 
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: "10%" 
      },
      ButtonText: {
        fontSize: 46,
        color: "#FFD700",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Unica One",
        flex: 1,
        textAlign: 'center',
        paddingTop: "1%",
        paddingBottom: "1%",
        marginTop: "30%",
        marginBottom: "-20%",
      }
});

export default DelivererStatusScreen;
