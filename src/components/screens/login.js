import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { storeData } from '../../api/asyncStorage';
import { post } from '../../api/apiRequests';
import globalStyle from '../../styles/globalStyle';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async login() {
    const route = '/user/login';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email: this.state.email, password: this.state.password,});
    const response = await post(route, headers, body);
    if (response.code === 200) {
      await storeData(response.data.id, response.data.token);
      this.props.navigation.navigate('Home');
    } else if (response.code === 400) {
      Alert.alert('An invalid email or password was entered.');
    } else {
      Alert.alert('Server Error');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Enter your email" onChangeText={(email) => this.setState({ email:email })} />
        <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter your password" onChangeText={(pword) => this.setState({ password: pword })} />
        <TouchableOpacity style={globalStyle.button} onPress={() => this.login()}>
          <Text style={globalStyle.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyle.button} onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={globalStyle.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:
  {
    marginLeft: '25%',
    alignSelf: 'flex-start',
    fontFamily: 'monospace',
    width: '100%',
  },
});

export default Login;
