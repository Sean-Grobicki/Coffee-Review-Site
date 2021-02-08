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
import { getToken, getUserID } from '../../api/asyncStorage';

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
    const id = await getUserID();
    const token = await getToken();
    console.log(id);
    console.log(token);
    this.setState(
      {
        id: id,
        token: token,
      });
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

