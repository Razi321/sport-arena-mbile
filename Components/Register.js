/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "apsl-react-native-button";
import { Avatar, Input, Icon } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
//import DateTimePicker from '@react-native-community/datetimepicker';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //active: 0,
      login: "",
      mdp: "",
      name: "",
      cmdp: "",
      emailError: "",
      pswError: "",
      cpswError: "",
      nameError: "",
      existError: "cet email est déjà utilisé. merci d'en saisir un nouveau",
      filePath: "null",
    };
  }
  _Register() {
    fetch("http://stage.t-cody.com/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        c_password: this.state.c_password,
        imageSrc: this.state.filePath,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success != null) {
          AsyncStorage.setItem("user", JSON.stringify(responseJson.success));
          this.props.navigation.navigate("user");
        } else if (responseJson.message != null) {
          Alert.alert(this.state.existError);
        } else {
          this.setState({
            emailError: responseJson.error.email,
            pswError: responseJson.error.password,
            cpswError: responseJson.error.c_password,
            nameError: responseJson.error.name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ filePath: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View
          style={{
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Icon name="opencart" type="font-awesome" color="#212121" size={50} />

          <Text
            style={{
              marginTop: 40,
              fontSize: 28,
              color: "#373737",
              marginBottom:30
            }}
          >
            Créer Un Compte
          </Text>
          <Avatar
            size="large"
            rounded
            icon={{
              name: "camera",
              type: "font-awesome",
                           
            }}
            onPress={this._pickImage}
            activeOpacity={0.7}
            source={{uri: this.state.filePath}}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Input
              errorMessage={this.state.emailError}
              placeholder="Email"
              errorStyle={{ fontSize: 15, color: "red" }}
              //errorMessage="ENTER A VALID ERROR HERE"
              inputContainerStyle={{ width: 290, marginTop: 20 }}
              onChangeText={(value) => {
                return this.setState({ email: value });
              }}
            />

            <Input
              errorStyle={{ fontSize: 15, color: "red" }}
              errorMessage={this.state.nameError}
              placeholder="Nom & Prénom"
              inputContainerStyle={{ width: 290, marginTop: 20 }}
              onChangeText={(value) => {
                return this.setState({ name: value });
              }}
            />

            <Input
              errorMessage={this.state.pswError}
              errorStyle={{ fontSize: 15, color: "red" }}
              secureTextEntry={true}
              placeholder="Mot de passe"
              inputContainerStyle={{ width: 290, marginTop: 20 }}
              onChangeText={(value) => {
                return this.setState({ password: value });
              }}
            />

            <Input
              errorStyle={{ fontSize: 15, color: "red" }}
              errorMessage={this.state.cpswError}
              secureTextEntry={true}
              placeholder="Confirmer votre mot de passe"
              inputContainerStyle={{ width: 290, marginTop: 20 }}
              onChangeText={(value) => {
                return this.setState({ c_password: value });
              }}
            />
          </View>
          <Button
            style={{
              width: 300,
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              height: 50,
              alignSelf: "center",

              marginTop: 30,
            }}
            textStyle={{
              color: "#fff",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
            onPress={() => this._Register()}
          >
            S'inscrire
          </Button>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#373737",
              marginTop: 10,
            }}
            onPress={() => this.props.navigation.navigate("login")}
          >
            {" "}
            Vous avez un compte ?
            <Text
              style={{ fontWeight: "bold", color: "#ffc107", fontSize: 17 }}
            >
              {" "}
              Se connecter
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

export default Register;
