import React from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { post } from '../../api/apiRequests';
import globalStyle from '../../styles/globalStyle';

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
      <View style={styles.container}>
        <TextInput style={styles.text} placeholder="Enter First Name" onChangeText={(fName) => this.setState({ firstName: fName })} />
        <TextInput style={styles.text} placeholder="Enter Last Name" onChangeText={(lName) => this.setState({ lastName: lName })} />
        <TextInput style={styles.text} placeholder="Enter Email" onChangeText={(em) => this.setState({ email: em })} />
        <TextInput style={styles.text} placeholder="Enter Password" onChangeText={(pass) => this.setState({ password: pass })} />
        <TextInput style={styles.text} placeholder="Repeat Password" onChangeText={(rPass) => this.setState({ rPassword: rPass })} />
        <TouchableOpacity style={globalStyle.button} onPress={() => this.createUser()}>
          <Text style={globalStyle.buttonText}> Create Account </Text>
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
  text:
  {
    fontFamily: 'monospace',
    width: '100%',
    marginLeft: '55%',
  },
});

export default Signup;
