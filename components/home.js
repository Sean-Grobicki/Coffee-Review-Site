import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Search from './search';
import Favourite from './favourite';
import Settings from './settings';


class Home extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (<Text>Home</Text>
    );

  }

}

export default Home;

