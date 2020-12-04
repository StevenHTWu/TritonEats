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

class DelivererSettingsScreen extends Component {
  render() {
    return <Text>DelivererSettingsScreen</Text>;
  }
}
DelivererSettingsScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default DelivererSettingsScreen;
