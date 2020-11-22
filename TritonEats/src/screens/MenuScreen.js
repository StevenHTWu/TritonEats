import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button
} from "react-native";

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ResaturantMenu: [
        { Id: "1", ItemName: "Sandwich", Price: "$7" },
        { Id: "2", ItemName: "Noodles", Price: "$6.25" },
        { Id: "3", ItemName: "Pizza-Slice", Price: "$2.50" },
        { Id: "4", ItemName: "Sandwich", Price: "$7" },
        { Id: "5", ItemName: "Noodles", Price: "$6.25" },
        { Id: "6", ItemName: "Pizza-Slice", Price: "$2.50" },
        { Id: "7", ItemName: "Sandwich", Price: "$7" },
        { Id: "8", ItemName: "Noodles", Price: "$6.25" },
        { Id: "9", ItemName: "Pizza-Slice", Price: "$2.50" },
        { Id: "10", ItemName: "Sandwich", Price: "$7" },
        { Id: "11", ItemName: "Noodles", Price: "$6.25" },
        { Id: "12", ItemName: "Pizza-Slice", Price: "$2.50" },
      ],
    };
  }

  render() {
    return (
      <SafeAreaView forceInset={{ top: "always" }}>
        <Text style={styles.headerTitle}>Pines</Text>
        <FlatList
          data={this.state.ResaturantMenu}
          renderItem={({ item }) => (
            <View>
                <TouchableOpacity style={styles.borderItem}>
                    <Text style={styles.bodyText}>{item.ItemName}</Text>
                    <Text style={styles.priceText}>{item.Price}</Text>
                    <View style={{marginLeft: 300, borderWidth: 1, marginBottom:10, borderColor: "#FFD700", borderRadius: 10}}>
                        <Button
                            title="Add to Cart"
                            color="#FFD700"
                            accessibilityLabel="Add to cart"
                        />
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
          )}
          keyExtractor={(item) => item.Id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop: 300,
  },
  text: {
    fontSize: 30,
  },
  headerTitle: {
    fontSize: 49,
    paddingTop: 40,
    paddingBottom: 80,
    fontFamily: "Unica One",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 45,
    paddingTop: 5,
    color:"#FFD700",
    fontFamily: "Unica One",
    textAlign: "left",
  },
  priceText: {
    fontSize: 24,
    color:"#FFD700",
    paddingTop: 5,
    fontFamily: "Unica One",
    textAlign: "left",
  },
  borderItem: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor:"#0a2657"
  },
});

export default MenuScreen;
