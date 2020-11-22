import React from 'react';
import {Text, StyleSheet, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-navigation";
class HistoricalOrder extends React.Component{
    render(){
        return (
                <View style={styles.main}>
                <ScrollView>
                    <Text style={styles.text}>Order Id: {this.props.orderId}</Text>
                    <Text style={styles.text}>Items: {this.props.itemOrdered}</Text>
                    <Text style={styles.text}>Restaurant: {this.props.restaurant}</Text>
                    <Text style={styles.text}>Time Ordered: {this.props.dateOrdered}</Text>
                    <Text style={styles.text}>Deliverer: {this.props.deliverer}</Text>
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
    },
    text: {
        fontSize: 20,
        color:"#FFD700",
    },
});

export default HistoricalOrder;