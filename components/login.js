import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  AsyncStorage,
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
      info: '',
    };
  }

  login()
  {
    return fetch("http://10.0.2.2:3333/user/login",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson);
          this.setState({info: responseJson});
          //Use this function to store the id and token in async storage.
          storeData();
          this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert(error);
        });
     }
  }




  render()
  {
    return (
      <View style = {styles.container}>
        <TextInput style = {styles.inputs} placeholder = "Enter your email" onChangeText = {(email) => this.setState({email:email})}/>
        <TextInput style = {styles.inputs} secureTextEntry = {true} placeholder = "Enter your password" onChangeText = {(pword) => this.setState({password:pword})}/>
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