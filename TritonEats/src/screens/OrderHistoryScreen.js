import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import HistoricalOrder from '../Components/HistoricalOrder';

class OrderHistoryScreen extends React.Component{
  render () {
      //connect to database
      //get the order history through api
      return (
      <SafeAreaView forceInset={{top: "always"}}>
          <View style={styles.main}>
              <Text style={styles.text}>Order History</Text>
              <FlatList style={styles.main} data={[{item: "fish", date: "01/01/1990", restaurant: "64 degrees"},
                               {item: "eggs", date: "01/01/1991", restaurant: "64 degrees"},
                               {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},
                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},
                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},

                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},


                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},

                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},

                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees eeeeeeveeen loooooooooong"}]}
                        renderItem={({item}) => <HistoricalOrder itemOrdered={item.item}
                                                                  dateOrdered={item.date}
                                                                  restaurant={item.restaurant}/>
                        }
                        />
          </View>
      </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  main: {
    marginTop:0,
      marginBottom:90,
      width:"100%",
  },
  text: {
    fontSize: 30,
    fontFamily: "Unica One",
      alignItems: "center",
    textAlign:"center",
      marginBottom:30,
      marginTop:30,
  },
});

export default OrderHistoryScreen;
