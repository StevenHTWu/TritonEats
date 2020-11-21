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
              <FlatList data={[{item: "fish", date: "01/01/1990", restaurant: "64 degrees"},
                               {item: "eggs", date: "01/01/1991", restaurant: "64 degrees"},
                               {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},
                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees"},
                  {item: "beef", date: "01/01/1992", restaurant: "64 degrees loooooooooong"}]}
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
    alignItems: "center",
    marginTop:30,
      marginBottom:50,
  },
  text: {
    fontSize: 30,
  },
});

export default OrderHistoryScreen;
