import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StatusBar,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';

class Signup extends ValidationComponent
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rPassword: '',
    }
  }
  
  createUser()
  {
    this.validate(
      {
        firstName: {required:true},
        lastName: {required: true},
        email: {required: true, email: true},
        password: {minLength:5, required: true, equalPassword: this.state.rPassword},
      });
      if(this.isFormValid())
      {
        return fetch("http://10.0.2.2:3333/api/1.0.0/user",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          })
        })
        .then((response) => {
          if(response.status == 201)
          {
            Alert.alert("Account Created");
            this.props.navigation.navigate('Login')
          }
          else
          {
            Alert.alert("Unsuccessful Request");
            console.log(response);
          }
        })
          
        .catch((error) => {
          Alert.alert(error.message);
        });
     }
     else
     {
       Alert.alert(this.getErrorMessages());
     }
  }

  render()
  {
    return (
      <View>
          <TextInput placeholder = "Enter First Name" onChangeText = {(fName) => this.setState({firstName:fName})}/>
          <TextInput placeholder = "Enter Last Name" onChangeText = {(lName) => this.setState({lastName:lName})}/>
          <TextInput placeholder = "Enter Email" onChangeText = {(email) => this.setState({email:email})}/>
          <TextInput placeholder = "Enter Password" onChangeText = {(password) => this.setState({password:password})}/>
          <TextInput placeholder = "Repeat Password" onChangeText = {(rPassword) => this.setState({rPassword:rPassword})}/>
          <Button title = "Create Account" onPress = {() => this.createUser()}/>
        </View>
    );

  }

}

export default Signup;