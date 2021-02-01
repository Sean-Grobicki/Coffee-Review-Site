/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Signup from './components/signup';
import MainNav from './components/mainNav';



const LoginStack = createStackNavigator();

class App extends Component
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

export default App;
