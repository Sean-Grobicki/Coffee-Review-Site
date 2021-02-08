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
import getLocationInfo from '../../api/apiRequests';

class Location extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      locationID: '',
      location: [],
    }
  }

  getLocation()
  {
    this.setState({ 
      locationID: this.props.route.params.locationID,
      location: getLocationInfo(this.state.locationID),
    });
  }


  componentDidMount()
  {
    this.getLocation();
  }

  render()
  {
    return (
      <View>
        <Text>Location: {JSON.stringify(this.state.location)}</Text>
        <Button title = "Write a review" onPress = {() => this.props.navigation.navigate('WriteReview')}></Button>
      </View>
    );

  }

}

export default Location;