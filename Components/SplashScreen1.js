import React, { Component } from "react";
import { View, Text } from "react-native";
import SplashScreen from "./SplashScreen";

class SplashScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    /*try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        // We have data!!
        this.setState({user: JSON.parse(value)});
      }
    } catch (error) {
      console.log('Error retrieving data');
    }*/
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate("login");
    }, 2000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return <SplashScreen />;
  }
}

export default SplashScreen1;
