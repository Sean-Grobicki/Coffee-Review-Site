import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ID_KEY = '@id';
const SESSION_KEY = '@sessionKey';

class Login extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      email: '',
      password: '',
      id: '',
      session: '',
    };
  }

  async storeData()
  {
    try 
    {
        await AsyncStorage.setItem(ID_KEY,`${this.state.id}`);
        await AsyncStorage.setItem(SESSION_KEY,`${this.state.session}`);
        this.props.navigation.navigate('Home');
    } 
    catch (error) 
    {
      Alert.alert("Error Saving data",error.message);
    }
  }

  async login()
  {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login",
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
          console.log(responseJson);
          this.setState({id: responseJson.id, session: responseJson.token,});
          console.log(this.state.session);
          this.storeData();
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    r}




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
  },

});

