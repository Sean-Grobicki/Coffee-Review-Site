import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

class Login extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      email: '',
      password: '',
    };
  }

  login()
  {
    this.props.navigation.navigate('Home');
  }


  render()
  {
    return (
      <View style = {styles.container}>
        <TextInput style = {styles.inputs} placeholder = "Enter your email"/>
        <TextInput style = {styles.inputs}placeholder = "Enter your password"/>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.login()}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.navigate('Signup')}>
          <Text>Create New Account</Text>
        </TouchableOpacity>
      </View>
    );

  }

}

export default Login;

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  inputs:
  {

  },
  buttons:
  {
    borderWidth: 2,
    borderColor: 'black',
    padding: '2%',
    borderRadius: 5,
    margin: '5%',
  }

});