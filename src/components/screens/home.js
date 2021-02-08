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
import AsyncStorage from '@react-native-async-storage/async-storage';

const ID_KEY = '@id';
const SESSION_KEY = '@sessionKey';

class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.state ={
      id:'',
      token:'',
    }
  }

  componentDidMount()
  {
    this.getInfo();
  }

  async getInfo()
  {
    try 
    {
      await AsyncStorage.getItem(ID_KEY).then((value) =>{
        if(value)
        {
          this.setState({id:value});
        }
      });
      await AsyncStorage.getItem(SESSION_KEY).then((value) =>{
        if(value)
        {
          this.setState({token:value});
        }
      });
    } catch (error) {
      
    }

  }
  render()
  {
    return (
      <View>
      <Text>{this.state.id}</Text>
      <Text>{this.state.token}</Text>
      </View>
    );

  }

}

export default Home;

