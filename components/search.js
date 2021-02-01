import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

class Search extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View>
        <Text>Search</Text>
        <Button title = "Location" onPress = {() => this.props.navigation.navigate('Location')}></Button>
      </View>
    );

  }

}

export default Search;