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
import { post } from '../../api/apiRequests';
import { getToken } from '../../api/asyncStorage';

class Settings extends Component
{
  constructor(props)
  {
    super(props);
  }

  async logout()
  {
    const route = '/user/logout';
    const token = await getToken();
    const headers = {'X-Authorization': token , 'Content-Type': 'application/json'};
    const body = {};
    const response = await post(route,headers,body);
    this.props.navigation.popToTop();
  }

  render()
  {
    return (
      <View>
        <Text>Settings</Text>
        <Button title = "Change Settings" onPress = {() => this.props.navigation.navigate('ChangeInfo')}></Button>
        <Button title = "Logout" onPress = {() => this.logout()}></Button>
      </View>
    );

  }

}

export default Settings;