import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

class HomeScreen extends Component {
  render() {
    return <Text>Deliverer Job History Screen</Text>;
  }
}
HomeScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default HomeScreen;
