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

class Favourite extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View>
        <Text>Favourite</Text>
        <Button title = "Location" onPress = {() => this.props.navigation.navigate('Location')}></Button>
      </View>
    );

  }

}

export default Favourite;
