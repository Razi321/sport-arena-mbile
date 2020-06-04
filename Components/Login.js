/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import {Input, Icon} from 'react-native-elements';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      pressed: 0,
      email: '',
      password: '',
      emailError: '',
      pswError: '',
    };
  }

  onFocus(v) {
    this.setState({
      pressed: v,
    });
  }
  onBlur(v) {
    this.setState({
      pressed: v,
    });
  }
  _login() {
    fetch('http://stage.t-cody.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success != null) {
         AsyncStorage.setItem('user', JSON.stringify(responseJson.success));
         Alert.alert('loggedIn');
         console.log(responseJson.success.name);
          this.props.navigation.navigate('user');
        } else if (responseJson.error === 'Unauthorised') {
          Alert.alert('Adresse e-mail ou mot de passe invalide');
        } else {
          this.setState({
            emailError: responseJson.error.email,
            pswError: responseJson.error.password,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let {pressed} = this.state;
    return (
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 70,
          }}>
          <Icon name="opencart" type="font-awesome" color="#212121" size={50} />

          <View
            style={{
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text style={{fontSize: 28, color: '#373737', marginBottom: 30}}>
              Se connecter
            </Text>
            <Input
              onChangeText={value => {
                return this.setState({email: value});
              }}
              errorMessage={this.state.emailError}
              onBlur={() => this.onBlur(0)}
              onFocus={() => this.onFocus(1)}
              placeholder="Email"
              inputContainerStyle={{
                width: 290,
                borderBottomColor: pressed === 1 ? '#ffc107' : '#a9a9a9',
              }}
              containerStyle={{
                marginBottom: 20,
              }}
              leftIcon={
                <FontAwesome
                  name="user"
                  style={{marginRight: 20}}
                  size={24}
                  color={pressed === 1 ? '#ffc107' : '#a9a9a9'}
                />
              }
            />
            <Input
              secureTextEntry={true}
              errorMessage={this.state.pswError}
              onChangeText={value => {
                return this.setState({password: value});
              }}
              placeholder="Mot de passe"
              onBlur={() => this.onBlur(0)}
              onFocus={() => this.onFocus(2)}
              inputContainerStyle={{
                width: 290,
                borderBottomColor: pressed === 2 ? '#ffc107' : '#a9a9a9',
              }}
              containerStyle={{marginBottom: 20}}
              leftIcon={
                <FontAwesome
                  name="lock"
                  style={{marginRight: 20}}
                  size={24}
                  color={pressed === 2 ? '#ffc107' : '#a9a9a9'}
                />
              }
            />
            <Text style={{fontSize: 15, color: 'red'}}>
              {this.state.pswError}
            </Text>
          </View>
          <Button
            style={{
              width: 300,
              backgroundColor: '#ffc107',
              borderColor: '#ffc107',
              height: 50,
              alignSelf: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}
            textStyle={{
              color: '#fff',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            onPress={() => this._login()}>
            Se connecter
          </Button>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#373737',
              marginTop: 30,
            }}
            onPress={() => this.props.navigation.navigate('register')}>
            Vous n'avez pas un compte ?
            <Text style={{fontWeight: 'bold', color: '#ffc107', fontSize: 17}}>
              {' '}
              S'inscrire
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;