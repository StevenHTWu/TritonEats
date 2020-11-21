import React from 'react';
import {Text, StyleSheet, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-navigation";
class HistoricalOrder extends React.Component{
    render(){
        return (
                <View style={styles.main}>
                <ScrollView>
                    <Text style={styles.text}>Item: {this.props.itemOrdered}</Text>
                    <Text style={styles.text}>Date: {this.props.dateOrdered}</Text>
                    <Text style={styles.text}>Restaurant: {this.props.restaurant}</Text>
                </ScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: "flex-start",
        marginTop:30,
        marginBottom:30,
        backgroundColor: '#d6d6d6',
    },
    text: {
        fontSize: 30,
    },
});

export default HistoricalOrder;