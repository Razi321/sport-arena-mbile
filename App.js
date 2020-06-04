/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Search from "./Components/Search";
import SplashScreen from "./Components/SplashScreen";
import SplashScreen1 from "./Components/SplashScreen1";
import Register from "./Components/Register";
import Descover from "./Components/Descover";
import profileUpdate from "./Components/profileUpdate";
import GymDetail from "./Components/GymDetail";
import Activities from "./Components/Activities";
import ActivityDetail from "./Components/ActivityDetail";
//import Screen1 from './Components/Screen1';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

class App extends Component {
  createHomeStack = () => (
    <Stack.Navigator
      initialRouteName="splashScreen1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="splashScreen" component={SplashScreen} />
      <Stack.Screen name="splashScreen1" component={SplashScreen1} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="profileupdate" component={profileUpdate} />
      <Stack.Screen name="gymdetail" component={GymDetail} />
      <Stack.Screen name="activities" component={Activities} />
      <Stack.Screen name="activityDetail" component={ActivityDetail} />


      <Stack.Screen name="user" children={this.createBottomTabs} />
    </Stack.Navigator>
  );

  createBottomTabs = () => {
    return (
      <BottomTabs.Navigator
        tabBarOptions={{
          activeTintColor: "#F4511E",
        }}
      >
        <BottomTabs.Screen
          name="descover"
          style={{ marginBottom: 16 }}
          component={Descover}
          options={{
            tabBarLabel: "Découvrir",
            tabBarIcon: ({ color }) => (
              <FontAwesome color={color} size={30} name={"compass"} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="search"
          component={Search}
          options={{
            tabBarLabel: "rechercher",
            tabBarIcon: ({ color }) => (
              <FontAwesome color={color} size={30} name={"search"} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: "profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome color={color} size={30} name={"user-circle-o"} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  render() {
    return <NavigationContainer>{this.createHomeStack()}</NavigationContainer>;
  }
}

export default App;
