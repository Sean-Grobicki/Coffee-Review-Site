
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/screens/login';
import Signup from '../components/screens/signup';
import MainNav from './mainNav';



const LoginStack = createStackNavigator();

class LoginNav extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <NavigationContainer>
        <LoginStack.Navigator>
          <LoginStack.Screen name = "Login" component = {Login}/>
          <LoginStack.Screen name = "Signup" component = {Signup}/>
          <LoginStack.Screen options = {{headerShown: false}} name = "Home" component = {MainNav}/>
        </LoginStack.Navigator>
      </NavigationContainer>
    );

  }

}

export default LoginNav;
