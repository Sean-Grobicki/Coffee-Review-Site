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
import Home from './home';
import Search from './search';
import Favourite from './favourite';
import SettingNav from './settingsNav';

const TabNavigation = createBottomTabNavigator();


class MainNav extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
          <TabNavigation.Navigator>
            <TabNavigation.Screen name = "Home" component = {Home}/>
            <TabNavigation.Screen name = "Search" component = {Search}/>
            <TabNavigation.Screen name = "Favourite" component = {Favourite}/>
            <TabNavigation.Screen name = "Settings" component = {SettingNav}/>
          </TabNavigation.Navigator>
    );

  }

}

export default MainNav;