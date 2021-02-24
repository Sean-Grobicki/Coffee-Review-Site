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
import { storeData } from '../../api/asyncStorage';
import { post } from '../../api/apiRequests';

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

  async login() { 
    const route = "/user/login";
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email: this.state.email, password: this.state.password,});
    const response = await post(route, headers, body);
    if (response.code === 200) {
      await storeData(response.data.id, response.data.token);
      this.props.navigation.navigate('Home');
    } else if (response.code === 400) {
      Alert.alert('An invalid email or password was entered.');
    } else {
      Alert.alert('Server Error');
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
  },

});

