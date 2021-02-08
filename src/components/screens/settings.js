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

class Settings extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View>
        <Text>Settings</Text>
        <Button title = "Change Settings" onPress = {() => this.props.navigation.navigate('ChangeInfo')}></Button>
        <Button title = "Logout" onPress = {() => this.props.navigation.popToTop()}></Button>
      </View>
    );

  }

}

export default Settings;