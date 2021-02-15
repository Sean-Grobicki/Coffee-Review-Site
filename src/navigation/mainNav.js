import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeNav from './homeNav';
import SearchNav from './searchNav';
import FavouriteNav from './favNav';
import SettingNav from './settingsNav';

const TabNavigation = createBottomTabNavigator();

class MainNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TabNavigation.Navigator>
        <TabNavigation.Screen name = "Home" component = {HomeNav}/>
        <TabNavigation.Screen name = "Search" component = {SearchNav}/>
        <TabNavigation.Screen name = "Favourite" component = {FavouriteNav}/>
        <TabNavigation.Screen name = "Settings" component = {SettingNav}/>
      </TabNavigation.Navigator>
    );
  }

}

export default MainNav;