import React from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { post } from '../../api/apiRequests';

class Signup extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rPassword: '',
    };
  }

  async createUser() {
    this.validate(
      {
        firstName: { required: true },
        lastName: { required: true },
        email: { required: true, email: true },
        password: { minLength: 5, required: true, equalPassword: this.state.rPassword },
      },
    );
    if (this.isFormValid()) {
      const route = '/user';
      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      });
      const response = await post(route, headers, body);
      if (response.code === 201) {
        Alert.alert('User Created Successfully');
        this.props.navigation.navigate('Login');
      } else if (response.code === 400) {
        Alert.alert('A bad request was sent to the server.');
      } else {
        Alert.alert('Server Error');
      }
    } else {
      Alert.alert(this.getErrorMessages());
    }
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Enter First Name" onChangeText={(fName) => this.setState({ firstName: fName })} />
        <TextInput placeholder="Enter Last Name" onChangeText={(lName) => this.setState({ lastName: lName })} />
        <TextInput placeholder="Enter Email" onChangeText={(em) => this.setState({ email: em })} />
        <TextInput placeholder="Enter Password" onChangeText={(pass) => this.setState({ password: pass })} />
        <TextInput placeholder="Repeat Password" onChangeText={(rPass) => this.setState({ rPassword: rPass })} />
        <Button title="Create Account" onPress={() => this.createUser()} />
      </View>
    );
  }
}

export default Signup;
