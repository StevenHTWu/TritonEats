import React, { useState } from "react";
import { AppLoading } from "expo";
import { useFonts, UnicaOne_400Regular } from "@expo-google-fonts/unica-one";
import * as Font from "expo-font";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import LandingScreen from "./src/screens/LandingScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    LandingScreen: LandingScreen,
    SignUpScreen: SignUpScreen,
    SignInScreen: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator({
    HomeScreen: HomeScreen,
    OrderHistoryScreen: OrderHistoryScreen,
    ShoppingCartScreen: ShoppingCartScreen,
    SettingsScreen: SettingsScreen,
  }),
});

const getFonts = () =>
  Font.loadAsync({
    "Unica One": require("./assets/fonts/UnicaOne-Regular.ttf"),
  });

const App = createAppContainer(switchNavigator);

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return <App />;
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
};
