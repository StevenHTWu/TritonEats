import React from 'react';
import {Text, StyleSheet, ScrollView, View, FlatList} from "react-native";
import {SafeAreaView} from "react-navigation";
class HistoricalOrder extends React.Component{
    render(){
        return (
                <View style={styles.main}>
                <ScrollView>
                    <Text style={styles.text}>Items:</Text>
                    <FlatList style={styles.text} data={this.props.items}
                              renderItem={({item}) =>
                                  <ScrollView horizontal={true}>
                                  <Text style={styles.text}>- {item.name}</Text>
                                  <Text style={styles.text}>x{item.quantity}</Text>
                                  </ScrollView>
                              }/>
                    <Text style={styles.text}>Restaurant: {this.props.restaurant}</Text>
                    <Text style={styles.text}>Time Ordered: {this.props.timeOrdered}</Text>
                    <Text style={styles.text}>Time Delivered: {this.props.timeDelivered}</Text>
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
    },
    text: {
        fontSize: 20,
        color:"#FFD700",
        marginLeft:5,
        marginRight:5,
    },
    textRight:{
        fontSize: 20,
        color:"#FFD700",
        marginLeft:5,
        marginRight:5,
        textAlign: 'right',
        alignSelf: 'flex-end'
    }
});

export default HistoricalOrder;