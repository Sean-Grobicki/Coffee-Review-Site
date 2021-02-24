import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
  import { createStackNavigator } from '@react-navigation/stack';
  import Favourite from '../components/screens/favourite';
  import Location from '../components/screens/location';
  import WriteReview from '../components/screens/writeReview';
  
  const FavStack = createStackNavigator();
  
  
  class FavouriteNav extends Component
  {
    constructor(props)
    {
      super(props);
    }
  
    render()
    {
      return (
        <FavStack.Navigator>
          <FavStack.Screen name = "FavouriteRoot" component = {Favourite} options = {{headerShown: false}}/>
          <FavStack.Screen name = "Location" component = {Location}/>
          <FavStack.Screen name = "WriteReview" component = {WriteReview}/>
        </FavStack.Navigator>
      );
    }
  }
  
  export default FavouriteNav;