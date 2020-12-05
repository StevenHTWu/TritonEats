import React, { useState } from "react";
import { AppLoading } from "expo";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import LandingScreen from "./src/screens/LandingScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import AddCardScreen from "./src/screens/AddCardScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import MenuScreen from "./src/screens/MenuScreen";
import OrderStatusScreen from "./src/screens/OrderStatusScreen";

// Deliver Side Imports
import DelivererHomeScreen from "./src/screens/DelivererHomeScreen";
import DelivererJobHistoryScreen from "./src/screens/DelivererJobHistoryScreen";
import DelivererSettingsScreen from "./src/screens/DelivererSettingsScreen";


import AddCardFromSettingsScreen from "./src/screens/AddCardFromSettingsScreen";
import ManagePaymentScreen from "./src/screens/ManagePaymentScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AddressScreen from "./src/screens/AddressScreen";
import PasswordScreen from "./src/screens/PasswordScreen";

console.disableYellowBox = true;

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    LandingScreen: LandingScreen,
    SignUpScreen: SignUpScreen,
    SignInScreen: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator(
    {
      Home: createStackNavigator({
        HomeScreen: HomeScreen,
        MenuScreen: MenuScreen,
      }),
      OrderHistoryScreen: {
        screen: OrderHistoryScreen,
        navigationOptions: {
          title: "History",
        },
      },
      Cart: createStackNavigator({
        ShoppingCartScreen: ShoppingCartScreen,
        PaymentScreen: PaymentScreen,
        AddCardScreen: AddCardScreen,
        OrderStatusScreen: OrderStatusScreen,
      }),
      /*SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
          title: "Settings",
        },
      },*/
      Settings: createStackNavigator({
        SettingsScreen: SettingsScreen,
        ProfileScreen: ProfileScreen,
        AddressScreen: AddressScreen,
        AddCardFromSettingsScreen: AddCardFromSettingsScreen,
        ManagePaymentScreen: ManagePaymentScreen,
        PasswordScreen: PasswordScreen
      }),
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === "Home") {
            return <Feather name="home" size={24} color="black" />;
          } else if (routeName === "OrderHistoryScreen") {
            return <MaterialIcons name="history" size={24} color="black" />;
          } else if (routeName === "Cart") {
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
  menuFlow: createStackNavigator({
    HomeScreen: HomeScreen,
    MenuScreen: MenuScreen,
  }),
  DelivererMainFlow: createBottomTabNavigator(
    {
      DelivererHomeScreen: createStackNavigator({
        Home: DelivererHomeScreen,
      }),
      DelivererJobHistoryScreen: {
        screen: DelivererJobHistoryScreen,
        navigationOptions: {
          title: "Job History",
        },
      },
      DelivererSettingsScreen: {
        screen: DelivererSettingsScreen,
        navigationOptions: {
          title: "Settings",
        },
      },
    }
    // {
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarIcon: ({ focused, horizontal, tintColor }) => {
    //       const { routeName } = navigation.state;
    //       if (routeName === "HomeScreen") {
    //         return <Feather name="home" size={24} color="black" />;
    //       } else if (routeName === "OrderHistoryScreen") {
    //         return <MaterialIcons name="history" size={24} color="black" />;
    //       } else if (routeName === "ShoppingCartScreen") {
    //         return <AntDesign name="shoppingcart" size={24} color="black" />;
    //       } else {
    //         return <Feather name="settings" size={24} color="black" />;
    //       }
    //     },
    //   }),
    //   tabBarOptions: {
    //     activeTintColor: "#FF6F00",
    //     inactiveTintColor: "#263238",
    //   },
    // }
  ),
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
