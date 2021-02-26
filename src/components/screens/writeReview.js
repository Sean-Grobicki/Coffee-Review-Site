import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { post } from '../../api/apiRequests';
import { getToken } from '../../api/asyncStorage';
import globalStyle from '../../styles/globalStyle';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationID: '',
      comment: '',
      ovrRating: '',
      priceRating: '',
      qualRating: '',
      clenRating: '',
    };
  }

  componentDidMount() {
    this.setState({locationID: this.props.route.params.locationID});
  }

  async sendReview() {
    const route = '/location/'.concat(this.state.locationID).concat('/review');
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      overall_rating: this.state.ovrRating,
      price_rating: this.state.priceRating,
      quality_rating: this.state.qualRating,
      clenliness_rating: this.state.clenRating,
      review_body: this.state.comment,
    });
    const response = await post(route, headers, body);
    if (response.code === 201) {
      this.props.navigation.goBack();
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to add this review');
    } else if (response.code === 404) {
      Alert.alert('This location cannot be found to review');
    } else {
      Alert.alert('Server Error');
    }
  }

  render() {
    const pickerList = [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
    ];
    return (
      <View style ={styles.container}>
        <Text style={globalStyle.text}> Overall Rating: </Text>
        <DropDownPicker globalTextStyle={globalStyle.text} placeholder="Enter Overall Rating: " containerStyle={{ height: 40, width: '100%' }} items={pickerList} onChangeItem={(item) => this.setState({ ovrRating: item.value })} />
        <Text style={globalStyle.text}> Price Rating: </Text>
        <DropDownPicker globalTextStyle={globalStyle.text} placeholder="Enter Price Rating: " containerStyle={{ height: 40, width: '100%'  }} items={pickerList} onChangeItem={(item) => this.setState({ priceRating: item.value })} />
        <Text style={globalStyle.text}> Quality Rating: </Text>
        <DropDownPicker globalTextStyle={globalStyle.text} placeholder="Enter Quality Rating: " containerStyle={{ height: 40, width: '100%'}} items={pickerList} onChangeItem={(item) => this.setState({ qualRating: item.value })} />
        <Text style={globalStyle.text}> Cleanlieness Rating: </Text>
        <DropDownPicker globalTextStyle={globalStyle.text} placeholder="Enter Cleanlieness Rating: " containerStyle={{ height: 40, width: '100%'}} items={pickerList} onChangeItem={(item) => this.setState({ clenRating: item.value })} />
        <TextInput style={styles.comment} placeholder="Enter your comments: " onChangeText={(com) => this.setState({ comment: com })} />
        <TouchableOpacity style={styles.button} onPress={() => this.sendReview()} >
          <Text style={globalStyle.buttonText}> Finish Review </Text>
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
    alignItems: 'flex-start',
    backgroundColor: 'ghostwhite',
  },
  button:
  {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: '2%',
    borderRadius: 5,
    margin: '5%',
  },
  comment:
  {
    fontFamily: 'monospace',
    width: '100%',
  },
});

export default WriteReview;
