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
    this.state = 
    {
      locationID: '',
    }
  }

  getLocation()
  {
    this.setState({ locationID: this.props.navigation.state});
    // get request here to that location.
  }


  componentDidMount()
  {
    this.getLocation();
  }

  render()
  {
    return (
      <View>
        <Text>ID: {this.props.navigation.state.locationID}</Text>
        <Button title = "Write a review" onPress = {() => this.props.navigation.navigate('WriteReview')}></Button>
      </View>
    );

  }

}

export default Location;