import React, { Component } from "react";
import { View, Text } from "react-native";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 9, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 40,
              fontWeight: "700",
            }}
          >
            LOGO
          </Text>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            copyrights 2020
          </Text>
        </View>
      </View>
    );
  }
}

export default SplashScreen;
