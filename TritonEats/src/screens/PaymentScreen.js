import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Keyboard,  TouchableWithoutFeedback, PickerIOSItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const PaymentScreen = ({ navigation }) => {
  //const [response, setResponse] = useState();

  const[alternateSelect, setAlternateSelect] = useState(true);

  const changeSelect = () => {
    setAlternateSelect(alternateSelect => !alternateSelect);
  }

  const array = [
      {cardNum: navigation.getParam('cardNum'),
        name: navigation.getParam('name')}
  ]

  var cardNum = null;

  if(array[0].cardNum != null) {
    cardNum = "xxxx-xxxx-xxxx-" + array[0].cardNum.substring(12,16);
  }
  return (
      
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
              style={styles.CardImg}
              source={require("../../assets/pay.png")}
              
        />
          <View style={styles.layer1}>
          <View>

          {navigation.getParam('cardNum') != null ? (
              <TouchableOpacity style={styles.selectCard} onPress={changeSelect}>
                  {alternateSelect && <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 70, height: 40}} >
                    <Image
                                style={styles.CardImgVisa}
                                source={require("../../assets/visa.png")}
                            />
                    </View>
                    <View style={{width: 400, height: 40}} >
                        <Text style={{ fontSize: 20, fontFamily: "Unica One", marginLeft: 20, color: "#0a2657"}}>{cardNum}</Text>
                    </View>
                    
                  </View>}
                  {!alternateSelect && 
                  <View style={styles.selectCardPress}>
                    <View style={{width: 70, height: 40}} >
                    <Image
                                style={styles.CardImgVisa}
                                source={require("../../assets/visa.png")}
                            />
                    </View>
                    <View style={{width: 400, height: 40}} >
                        <Text style={{ fontSize: 20, fontFamily: "Unica One", marginLeft: 20, color: "#0a2657"}}>{cardNum}</Text>
                    </View>
                    
                  </View>}
             </TouchableOpacity>
            ) : <TouchableOpacity
            onPress={() => navigation.navigate("AddCardScreen")}
            style={styles.AddCardBtn}
        >
            
            <Text style={styles.ButtonText}>Add Card</Text>
          </TouchableOpacity>}
            
          
            
            
            
  
              
            </View>

            <View style={styles.layer2}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("HomeScreen")}
                        style={styles.PaymentBtn}
                    >
                        <Text style={styles.ButtonText}>Pay</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontFamily: "Unica One", marginLeft: 250, position: "absolute", top: 35, color: "#FFD700"}}>$12.00</Text>
                
          </View>
          
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
PaymentScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a2657",},
  CardImg: {
    width: 120,
    height: 120,
    marginLeft: 125,
    marginTop: 50,
    marginBottom: 30,
    zIndex: 1
  },
  CardImgVisa: {
    width: 50,
    height: 40,
    marginLeft: 20,
    position: "absolute",
    bottom: 9
  },
  layer1: {
    borderRadius: 50,
    height: 450,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    position: "absolute",
    top: 130,
    width: "100%"
  },
  layer2: {
    borderRadius: 50,
    height: 150,
    width: "100%",
    backgroundColor: "#0a2657",
    position: "absolute",
    top: 325
  },
  AddCardBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 125
  },
  PaymentBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    width: 120,
    borderRadius: 50,
    height: 45,
    marginTop: 32,
    marginLeft: 36
  },
  ButtonText: {
    fontSize: 23,
    color: "#0a2657",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Unica One",
  },
  selectCard: {
    backgroundColor: "#f1f2f6",
    height: 60,
    width: 330,
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 20,
    paddingLeft: 3
  },
  selectCardPress: {
    flex: 1, 
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: "#0a2657",
    borderRadius: 6,
    height: 60,
    width: 330,
    position: "absolute",
    top:0,
    paddingTop: 17,
    
  },
  textIn: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInEXP: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  textInCVV: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: 40, 
    borderColor: 'gray', 
    borderTopWidth: 0,
    borderBottomWidth: 1,
    fontFamily: "Unica One",
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  }
});

export default PaymentScreen;
