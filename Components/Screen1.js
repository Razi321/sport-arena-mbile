import React, { Component } from "react";
import { View, Text, ImageBackground, Button } from "react-native";


class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <ImageBackground
        source={require("")}
        style={{flex:1,width:'100%', height:'100%'}}
      >
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2'}}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 8,
              marginTop: 10,
            }}
          >
            <Button
              style={{
                backgroundColor: "rgba(255,255,255,0)",
                marginLeft: "80%",
                borderColor: "rgba(255,255,255,0)",
              }}
              textStyle={{ color: "#fff", fontSize: 17 }}
              onPress={() => this.props.navigation.navigate("login")}
            >
              Sauter
            </Button>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 3,
              alignSelf: "center",
            }}
          >
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: "#eeeeee",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 25,
              }}
            >
              lorem ipsum dolor{" "}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: "#cccccc",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Lorem ipsum dolor sit {"\n"} sit consectetur adipiscing elit.
              {"\n"}Lorem ipsum dolor sit{" "}
            </Text>
          </View>

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              marginBottom: 10,
            }}
          >
            <Button
              style={{
                backgroundColor: "rgba(255,255,255,0)",
                marginLeft: "80%",
                borderColor: "rgba(255,255,255,0)",
              }}
              textStyle={{ color: "#fff", fontSize: 17 }}
              onPress={() => this.props.navigation.navigate("discover")}
            >
              Suivant
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Screen1;