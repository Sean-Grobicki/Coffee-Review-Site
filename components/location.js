import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

class Location extends Component
{
  constructor(props)
  {
    super(props);
  }

  getLocation()
  {
    const locationID = this.props.navigation.getParam(locationID);
    // get request here to that location.
  }

  render()
  {
    
    return (
      <View>
        <Text>Search</Text>
        <Button title = "Write a review" onPress = {() => this.props.navigation.navigate('WriteReview')}></Button>
      </View>
    );

  }

}

export default Location;