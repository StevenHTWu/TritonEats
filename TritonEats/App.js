import React, { useState } from "react";
import { AppLoading } from "expo";
<<<<<<< HEAD
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

=======
import { useFonts, UnicaOne_400Regular } from "@expo-google-fonts/unica-one";
import * as Font from "expo-font";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

>>>>>>> origin/backend
import HomeScreen from "./src/screens/HomeScreen";
import LandingScreen from "./src/screens/LandingScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";
<<<<<<< HEAD
import PaymentScreen from "./src/screens/PaymentScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import MenuScreen from "./src/screens/MenuScreen";

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen: ResolveAuthScreen,
=======

const switchNavigator = createSwitchNavigator({
>>>>>>> origin/backend
  loginFlow: createStackNavigator({
    LandingScreen: LandingScreen,
    SignUpScreen: SignUpScreen,
    SignInScreen: SignInScreen,
  }),
<<<<<<< HEAD
  mainFlow: createBottomTabNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: "Home",
        },
      },
      OrderHistoryScreen: {
        screen: OrderHistoryScreen,
        navigationOptions: {
          title: "History",
        },
      },
      Cart: createStackNavigator({
        ShoppingCartScreen: ShoppingCartScreen,
        PaymentScreen: PaymentScreen,
      }),
      SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
          title: "Settings",
        },
      },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === "HomeScreen") {
            return <Feather name="home" size={24} color="black" />;
          } else if (routeName === "OrderHistoryScreen") {
            return <MaterialIcons name="history" size={24} color="black" />;
          } else if (routeName === "ShoppingCartScreen") {
            return <AntDesign name="shoppingcart" size={24} color="black" />;
          } else {
            return <Feather name="settings" size={24} color="black" />;
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: "#FF6F00",
        inactiveTintColor: "#263238",
      },
    }
  ),
=======
  mainFlow: createBottomTabNavigator({
    HomeScreen: HomeScreen,
    OrderHistoryScreen: OrderHistoryScreen,
    ShoppingCartScreen: ShoppingCartScreen,
    SettingsScreen: SettingsScreen,
  }),
>>>>>>> origin/backend
});

const getFonts = () =>
  Font.loadAsync({
    "Unica One": require("./assets/fonts/UnicaOne-Regular.ttf"),
  });

const App = createAppContainer(switchNavigator);

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
<<<<<<< HEAD
    return (
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    );
=======
    return <App />;
>>>>>>> origin/backend
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
};
