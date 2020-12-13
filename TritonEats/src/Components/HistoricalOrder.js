import React from 'react';
import {Text, StyleSheet, ScrollView, View, FlatList, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-navigation";
var CurrentCart = require("../Components/Cart");
import { navigate } from "../navigationRef";

class HistoricalOrder extends React.Component{
    /*<*/ 
    render(){
        return (
                <View style={styles.main}>
                <ScrollView>
                <View style={{ flex: 1, flexDirection: "row", height: 50, justifyContent: "center" }}>
                    <View style={{ width: "73%", height: 35 }}>
                        <Text style={styles.title}>{this.props.restaurant}</Text>
                    </View>
                    <View style={{ width: "27%", height: 35 }}>
                        <Text style={styles.title}>${this.props.price}</Text>
                    </View>
                </View>
                
                    <View style={{ flex: 1, flexDirection: "row", height: 30, width: "100%", alignItems: "center" }}>
                        <View style={{ width: "60%", height: 35 }}>
                            <Text style={styles.text}>Item(s)</Text>
                        </View>
                        <View style={{ width: "30%", height: 35 }}>
                            <Text style={styles.text}>Price</Text>
                        </View>
                        <View style={{ width: "30%", height: 35 }}>
                            <Text style={styles.text}>Qty</Text>
                        </View>
                    </View>
                    <FlatList style={{width: "100%", borderBottomWidth: 1, borderBottomColor: "#FFD700"}} data={this.props.items}
                              renderItem={({item}) =>
                                  <ScrollView style={{width: "100%"}}>
                                      
                                      <View style={{ flex: 1, flexDirection: "row", height: 30, width: "100%", alignItems: "center" }}>
                                        <View style={{ width: "60%", height: 35 }}>
                                            <Text style={styles.text}>{item.key}</Text>
                                        </View>
                                        <View style={{ width: "30%", height: 35 }}>
                                            {item.value.toString().length > 3 ? (<Text style={styles.text}>${item.value}</Text>) : (<Text style={styles.text}>${item.value}.00</Text>)}
                                        </View>
                                        <View style={{ width: "30%", height: 35 }}>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                        </View>
                                      </View>
                                  </ScrollView>
                              }/>
                    <View style={{ flexDirection: "row", height: 82, justifyContent: "center", marginTop: "2%", borderBottomWidth: 1, borderBottomColor: "#FFD700"}}>
                        <View style={{ width: "50%", height: 45 }}>
                            <Text style={styles.text}>Ordered By</Text>
                            <Text style={styles.text}>{this.props.timeOrdered.substr(0,16)}</Text>
                            <Text style={styles.text}>{this.props.timeOrdered.substr(16,5)}</Text>
                        </View>
                        <View style={{ width: "50%", height: 45 }}>
                            <Text style={styles.text}>Delivered By</Text>
                            <Text style={styles.text}>{this.props.timeDelivered.substr(0,16)}</Text>
                            <Text style={styles.text}>{this.props.timeDelivered.substr(16,5)}</Text>
                        </View>
                    </View>
                    <Text style={styles.textDeliverer}>Deliverer: {this.props.deliverer}</Text>
                    <TouchableOpacity
                        color="#FFD700"
                        accessibilityLabel="Add to cart"
                        onPress={() => {
                          CurrentCart.emptyOrderArr();
                          CurrentCart.order_arr = this.props.items;
                          CurrentCart.restaurant_name = this.props.restaurant;
                          CurrentCart.viewing_restaurant = this.props.restaurant;
                          console.log(CurrentCart.restaurant_name);
                          console.log(CurrentCart.order_arr);
                          navigate("ShoppingCartScreen");
                        }}
                      >
                        <View style={styles.reorderBtn}>
                            <Text style={styles.textReorder}>Again!</Text>
                        </View>
                      </TouchableOpacity>
                </ScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        //alignItems: "flex-start",
        marginTop:0,
        marginBottom:15,
        backgroundColor: "#0a2657",
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        padding: 15,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 }
    },
    text: {
        fontSize: 20,
        color:"#FFD700",
        marginLeft:5,
        marginRight:5,
        fontFamily: "Unica One",
    },
    textDeliverer: {
        fontSize: 20,
        color:"#FFD700",
        marginLeft:5,
        marginRight:5,
        marginTop: 10,
        fontFamily: "Unica One"
    },
    title: {
        fontSize: 32,
        color:"#FFD700",
        marginLeft:5,
        marginRight:5,
        fontFamily: "Unica One",
    },
    textReorder: {
        fontSize: 20,
        color:"#0a2657",
        marginLeft:5,
        marginRight:5,
        fontFamily: "Unica One",
    },
    reorderBtn: {
        alignSelf: "center",
        backgroundColor: "#FFD700",
        padding: 10,
        borderRadius: 100,
        marginTop: 15
    }
});

export default HistoricalOrder;
//<Text style={styles.text}>Order Id: {this.props.orderId}</Text>
