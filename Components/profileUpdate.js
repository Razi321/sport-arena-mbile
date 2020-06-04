import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, Input, Button, Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import DateTimePicker from "@react-native-community/datetimepicker";

class profileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //active: 0,
      login: "",
      name: "",
      adress: "",
      phone: "",
      birthday: "",
      sexe: "",
      choosenIndex: 0,

      emailError: "",
      phoneError: "",

      nameError: "",
      existError: "cet email est déjà utilisé. merci d'en saisir un nouveau",
      filePath: "null",
      user: "",
      show: false,
      mode: "date",
      date: new Date(1598051730000),
    };
  }
  onChange = (event,date) => {
    console.log(date);
    this.setState({ birthday: date, show: false });
  };

  showDatepicker = () => {
    this.setState({
      show: true,
    });
  };

  _Update() {
    fetch("http://stage.t-cody.com/api/update/" + this.state.user.id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        adress: this.state.adress,
        phone: this.state.phone,
        birthday: this.state.birthday,
        sexe: this.state.sexe,
        imageSrc: this.state.filePath,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success != null) {
          AsyncStorage.setItem("user", JSON.stringify(responseJson.success));
          this.props.navigation.navigate("profile");
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = async () => {
    this.getPermissionAsync();
    try {
      const value = await AsyncStorage.getItem("user");

      if (value !== null) {
        // We have data!!
        this.setState({
          user: JSON.parse(value),
        });
      }
      if (this.state.user.filePath !== null) {
        this.setState({
          filePath: this.state.user.imageSrc,
        });
      }
      this.setState({
        name: this.state.user.name,
        phone: this.state.user.phone,
        birthday: this.state.user.birthday,
        adress: this.state.user.adress,
        sexe: this.state.user.sexe,
      });
    } catch (error) {
      console.log("Error retrieving data");
    }
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor:"#fff" }}>
        <View
          style={{
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name="md-close"
              size={35}
              color="#aaa69d"
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="md-checkmark"
              size={35}
              color="#212121"
              onPress={() => this._Update()}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "#373737", marginBottom: 20 }}>
            modifier votre Compte
          </Text>
          <Avatar
            size="xlarge"
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={this._pickImage}
            activeOpacity={0.7}
            source={{
              uri: this.state.filePath === null ? "null" : this.state.filePath,
            }}
            showEditButton
          />
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Input
              disabled
              label="Email"
              //labelStyle={{marginLeft:50}}
              placeholder="Email"
              errorStyle={{ color: "red" }}
              inputContainerStyle={{ width: 290 }}
              defaultValue={this.state.user.email}
              onChangeText={(value) => {
                return this.setState({ login: value });
              }}
              /*leftIcon={
                    <FontAwesome
                      name="user"
                      color="gray"
                      style={{marginRight: 20}}
                      size={24}
                    />
                  }*/
            />
            <Text style={{ fontSize: 15, color: "red" }}>
              {this.state.emailError}
            </Text>

            <Input
              label="Nom & Prénom"
              defaultValue={this.state.user.name}
              placeholder="Nom & Prénom"
              inputContainerStyle={{ width: 290 }}
              onChangeText={(value) => {
                return this.setState({ name: value });
              }}
            />
            <Text>{this.state.nameError}</Text>
            <Input
              label="Adresse"
              defaultValue={
                this.state.user.adress === null ? "" : this.state.user.adress
              }
              placeholder="Entrer votre adresse"
              inputContainerStyle={{ width: 290 }}
              onChangeText={(value) => {
                return this.setState({ adress: value });
              }}
            />
            <Input
              label="Téléphone"
              defaultValue={
                this.state.user.phone === null ? "" : this.state.user.phone
              }
              placeholder="Entrer votre Téléphone"
              inputContainerStyle={{ width: 290 }}
              onChangeText={(value) => {
                return this.setState({ phone: value });
              }}
              containerStyle={{ marginTop: 15 }}
            />

            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 10,
                fontSize: 17,
                color: "#929DA6",
                fontWeight: "bold",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Date de naissance
            </Text>
            <View>
              <View>
                <Button
                  buttonStyle={{
                    backgroundColor: "white",
                    borderColor: "white",

                    alignSelf: "center",
                  }}
                  titleStyle={{
                    color: "#000",

                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  onPress={this.showDatepicker}
                  icon={
                    <Icon
                      name="calendar"
                      type="font-awesome"
                      size={15}
                      color="#000"
                      style={{ marginRight: 5 }}
                    />
                  }
                  title={
                    this.state.birthday === null
                      ? ""
                      : this.state.birthday.toString()
                  }
                />
              </View>

              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  
                  value={
                    this.state.user.birthday === null
                      ? new Date()
                      : new Date(this.state.birthday)
                  }
                  mode="date"
                  dateFormat={"year-day-month"}
                  display="calendar"
                  onChange={this.onChange}
                />
              )}
            </View>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 10,
                fontSize: 17,
                color: "#929DA6",
                fontWeight: "bold",
              }}
            >
              Sexe
            </Text>
            <Picker
              selectedValue={this.state.sexe}
              style={{
                marginBottom: 10,
                height: 50,
                width: 150,
                alignSelf: "flex-start",
              }}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({ sexe: itemValue, choosenIndex: itemPosition })
              }
            >
              <Picker.Item label="Homme" value="Homme" />
              <Picker.Item label="Femme" value="Femme" />
            </Picker>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default profileUpdate;
