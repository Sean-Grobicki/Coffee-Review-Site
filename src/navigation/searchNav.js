import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

  import { createStackNavigator } from '@react-navigation/stack';
  import Search from '../components/screens/search';
  import Location from '../components/screens/location';
  import WriteReview from '../components/screens/writeReview';
  
  const SearchStack = createStackNavigator();
  
  
  class SearchNav extends Component
  {
    constructor(props)
    {
      super(props);
    }
  
    render()
    {
      return (
        <SearchStack.Navigator>
            <SearchStack.Screen name = "Search" component = {Search} options = {{headerShown: false}}/>
            <SearchStack.Screen name = "Location" component = {Location} options={{headerTitleStyle: {fontFamily: 'monospace'}}}/>
            <SearchStack.Screen name = "WriteReview" component = {WriteReview} options={{headerTitleStyle: {fontFamily: 'monospace'}}}/>
        </SearchStack.Navigator>
      );
    }
  }
  
  export default SearchNav;
