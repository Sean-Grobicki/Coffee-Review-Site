import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

  import { createStackNavigator } from '@react-navigation/stack';
  import Search from './search';
  import Location from './location';
  import WriteReview from './writeReview';
  
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
            <SearchStack.Screen name = "Location" component = {Location}/>
            <SearchStack.Screen name = "WriteReview" component = {WriteReview}/>
        </SearchStack.Navigator>
      );
    }
  }
  
  export default SearchNav;