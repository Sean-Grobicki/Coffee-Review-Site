import React, { Component } from 'react';
import {
  Text, View, Button, Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import ValidationComponent from 'react-native-form-validator';
import Icon from 'react-native-vector-icons/Feather';
import { remove, patch} from '../../api/apiRequests';
import { getToken } from '../../api/asyncStorage';
class ChangeReview extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      locationID: '',
      comment: '',
      ovrRating: '',
      priceRating: '',
      qualRating: '',
      clenRating: '',
    };
  }

  componentDidMount() {
    this.setState({
      review: this.props.route.params.review,
      locationID: this.props.route.params.locationID,
    });
  }

  async changeReview() {
    const route = '/location/' + this.state.locationID + '/review/' + this.state.review.review_id ;
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    const body = this.getReviewBody();
    const response = await patch(route, headers, body);
    if (response.code === 200) {
      Alert.alert('Review has been updated.');
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to change this review');
    } else if (response.code === 403) {
      Alert.alert('You are forbidden to change this review');
    } else if (response.code === 404) {
      Alert.alert('This review cannot be found on the server.');
    } else {
      Alert.alert('Server Error');
    }
  }

  getReviewBody() {
    let body = {};
    if (this.state.review.review_body !== this.state.comment && this.state.comment !== '') {
      body['review_body'] = this.state.comment;
    }
    if (this.state.review.overall_rating !== this.state.ovrRating && this.state.ovrRating !== '') {
      body['overall_rating'] = this.state.ovrRating;
    }
    if (this.state.review.price_rating !== this.state.priceRating && this.state.priceRating !== '') {
      body['price_rating'] = this.state.priceRating;
    }
    if (this.state.review.quality_rating !== this.state.qualRating && this.state.qualRating !== '') {
      body['quality_rating'] = this.state.qualRating;
    }
    if (this.state.review.clenliness_rating !== this.state.clenRating && this.state.clenRating !== '') {
      body['clenliness_rating'] = this.state.clenRating;
    }
    return JSON.stringify(body);
  }

  async deleteReview() {
    const route = '/location/' + this.state.locationID + '/review/' + this.state.review.review_id ;
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    const response = await remove(route, headers);
    if (response.code === 200) {
      this.props.navigation.goBack();
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

  confirmDeleteRev() {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item',
      [
        {
          text: 'Yes',
          onPress: () => this.deleteReview(),
        },
        {
          text: 'No',
        }],
    );
  }

  takePicture() {
    this.props.navigation.navigate('Camera', { locID: this.state.locationID, revID: this.state.review.review_id });
  }

  confirmDeletePic() {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Picture',
      [
        {
          text: 'Yes',
          onPress: () => this.deletePicture(),
        },
        {
          text: 'No',
        }],
    );
  }

  async deletePicture() {
    const route = '/location/'+ this.state.locationID + '/review/' + this.state.review.review_id;
    const token = await getToken();
    const headers = {'X-Authorization': token};
    const response = await remove(route, headers);
    if (response.code === 200) {
      Alert.alert('Item Deleted Successfully');
    } else if (response.code === 401) {
      Alert.alert('You are not authorised to delete that review.');
    } else if (response.code === 403) {
      Alert.alert('You are not allowed to delete that review.');
    } else if (response.code === 404) {
      Alert.alert('This photo does not exist to be deleted.');
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
      <View>
        <Text> Overall Rating: </Text>
        <DropDownPicker defaultValue={this.state.review.overall_rating} placeholder="Enter Overall Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ ovrRating: item.value })} />
        <Text> Price Rating: </Text>
        <DropDownPicker defaultValue={this.state.review.price_rating} placeholder="Enter Price Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ priceRating: item.value })} />
        <Text> Quality Rating: </Text>
        <DropDownPicker defaultValue={this.state.review.quality_rating} placeholder="Enter Quality Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ qualRating: item.value })} />
        <Text> Cleanlieness Rating: </Text>
        <DropDownPicker defaultValue={this.state.review.clenliness_rating} placeholder="Enter Cleanlieness Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ clenRating: item.value })} />
        <TextInput placeholder="Enter your comments: " defaultValue={this.state.review.review_body} onChangeText={(com) => this.setState({ comment: com })} />
        <Button title="Change Review" onPress={() => this.changeReview()} />
        <Button title="Delete Review" onPress={() => this.confirmDeleteRev()} />
        <Button title="Add Picture" onPress={() => this.takePicture()} />
        <Button title="Delete Picture" onPress={() => this.confirmDeletePic()} />
      </View>
    );
  }
}

export default ChangeReview;
