import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import { post } from '../../api/apiRequests';
import { getToken, removeItems } from '../../api/asyncStorage';
import globalStyle from '../../styles/globalStyle';

class Settings extends Component {
  async logout() {
    const route = '/user/logout';
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={globalStyle.title}>Settings</Text>
        <TouchableOpacity style={globalStyle.button} onPress={() => this.props.navigation.navigate('Change Information')}>
          <Text style={globalStyle.buttonText}> Change Settings </Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyle.button} onPress={() => this.changeReview()}>
          <Text style={globalStyle.buttonText}> Logout </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
  },
});

export default Settings;
