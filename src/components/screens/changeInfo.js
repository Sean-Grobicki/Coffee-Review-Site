import React from 'react';
import {
  View,
  Button,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ValidationComponent from 'react-native-form-validator';
import { getUserID, getToken } from '../../api/asyncStorage';
import { patch, get } from '../../api/apiRequests';

class ChangeInfo extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rPassword: '',
      uID: '',
      token: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    const id = await getUserID();
    const tok = await getToken();
    this.setState({ uID: id, token: tok });
    const route = '/user/'.concat(id);
    const headers = { 'X-Authorization': tok };
    const response = await get(route, headers);
    this.setState({ user: response.data });
  }

  async changeInfo() {
    this.validate(
      {
        firstName: { required: true },
        lastName: { required: true },
        email: { required: true, email: true },
        password: { minLength: 5, required: true, equalPassword: this.state.rPassword },
      },
    );
    if (this.isFormValid) {
      const route = '/user/'.concat(this.state.uID);
      const headers = { 'X-Authorization': this.state.token, 'Content-Type': 'application/json' };
      const body = this.getBody();
      const response = await patch(route, headers, body);
      if (response.code === 200) {
        Alert.alert('You have successfully updated your information.');
      } else if (response.code === 400) {
        Alert.alert('A bad request was sent to the server');
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to change this information');
      } else if (response.code === 403) {
        Alert.alert('You are forbidden to change this information');
      } else if (response.code === 404) {
        Alert.alert('This information cannot be found on the server.');
      } else {
        Alert.alert('Server Error');
      }
    }
  }

  getBody() {
    const body = {};
    if (this.state.user.first_name !== this.state.firstName && this.state.firstName !== '') {
      body.first_name = this.state.firstName;
    }
    if (this.state.user.last_name !== this.state.lastName && this.state.lastName !== '') {
      body.last_name = this.state.lastName;
    }
    if (this.state.user.email !== this.state.email && this.state.email !== '') {
      body.email = this.state.email;
    }
    if (this.state.password !== '') {
      body.password = this.state.password;
    }
    return JSON.stringify(body);
  }

  render() {
    return (
      <View>
        <TextInput defaultValue={this.state.user.first_name} onChangeText={(fName) => this.setState({ firstName: fName })} />
        <TextInput defaultValue={this.state.user.last_name} onChangeText={(lName) => this.setState({lastName: lName })} />
        <TextInput defaultValue={this.state.user.email} onChangeText={(email) => this.setState({ email: email })} />
        <TextInput placeholder="Enter New Password" onChangeText={(password) => this.setState({ password: password })} />
        <TextInput placeholder="Repeat New Password" onChangeText={(rPassword) => this.setState({ rPassword: rPassword })} />
        <Button title="Update Info" onPress={() => this.changeInfo()} />
      </View>
    );

  }

}

export default ChangeInfo;
