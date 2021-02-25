import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import { post } from '../../api/apiRequests';
import { getToken, removeItems } from '../../api/asyncStorage';

class Settings extends Component
{
  constructor(props)
  {
    super(props);
  }

  async logout() {
    const route = '/user/logout';
    const token = await getToken();
    const headers = {'X-Authorization': token , 'Content-Type': 'application/json'};
    const body = {};
    const response = await post(route, headers, body);
    if (response.code === 200) {
      await removeItems();
      this.props.navigation.popToTop();
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to logout.');
    } else {
      Alert.alert('Server Error');
    }
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
