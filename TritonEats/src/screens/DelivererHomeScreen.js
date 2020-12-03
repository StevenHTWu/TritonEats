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

class DelivererHomeScreen extends Component {
  render() {
    return <Text>Deliverer Home Screen</Text>;
  }
}
DelivererHomeScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default DelivererHomeScreen;
