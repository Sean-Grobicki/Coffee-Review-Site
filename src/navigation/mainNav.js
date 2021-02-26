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
import Icon from 'react-native-vector-icons/Ionicons';
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
      <TabNavigation.Navigator screenOptions={({route}) =>({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === 'Home') {
            iconName = focused
            ? 'home-sharp'
            : 'home-outline'
          }
          else if (route.name == 'Search'){
            iconName = focused
            ? 'search-sharp'
            : 'search-outline'
          }
          else if (route.name == 'Favourite'){
            iconName = focused
            ? 'star-sharp'
            : 'star-outline'
          }
          else if (route.name == 'Settings'){
            iconName = focused
            ? 'settings-sharp'
            : 'settings-outline'
          }
          return (<Icon name={iconName} size={size} color={color} />);
        },
      })}
      tabBarOptions ={{
        activeTintColor: 'red',
        inactiveTintColor: 'red',
        labelStyle: {
          fontFamily: 'monospace',
          fontSize: 12,
        },
      }

      } >
        <TabNavigation.Screen name = "Home" component = {HomeNav}/>
        <TabNavigation.Screen name = "Search" component = {SearchNav}/>
        <TabNavigation.Screen name = "Favourite" component = {FavouriteNav}/>
        <TabNavigation.Screen name = "Settings" component = {SettingNav}/>
      </TabNavigation.Navigator>
    );
  }

}

export default MainNav;