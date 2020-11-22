import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import LandingScreen from "./src/screens/LandingScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import MenuScreen from "./src/screens/MenuScreen";

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    LandingScreen: LandingScreen,
    SignUpScreen: SignUpScreen,
    SignInScreen: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator({
    HomeScreen: HomeScreen,
    MenuScreen: MenuScreen,
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
    return (
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
};
