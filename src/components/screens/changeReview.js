import React, { Component } from 'react';
import {
  Text, View, Button,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { get } from '../../api/apiRequests';
class ChangeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      comment: '',
      ovrRating: '',
      priceRating: '',
      qualRating: '',
      clenRating: '',
    };
  }

  componentDidMount() {
    this.setState({review: this.props.route.params.review});
  }

  async changeReview(){
    
  }

  async deleteReview(){

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
        <DropDownPicker defaultValue = {this.state.review.overall_rating} placeholder="Enter Overall Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ ovrRating: item.value })} />
        <Text> Price Rating: </Text>
        <DropDownPicker defaultValue = {this.state.review.price_rating} placeholder="Enter Price Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ priceRating: item.value })} />
        <Text> Quality Rating: </Text>
        <DropDownPicker defaultValue = {this.state.review.quality_rating} placeholder="Enter Quality Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ qualRating: item.value })} />
        <Text> Cleanlieness Rating: </Text>
        <DropDownPicker defaultValue = {this.state.review.clenliness_rating} placeholder="Enter Cleanlieness Rating: " containerStyle={{ height: 40 }} items={pickerList} onChangeItem={(item) => this.setState({ clenRating: item.value })} />
        <TextInput placeholder="Enter your comments: " defaultValue = {this.state.review.review_body} onChangeText={(com) => this.setState({ comment: com })} />
        <Button title="Change Review" onPress={() => this.changeReview()} />
        <Button title="Delete Review" onPress={() => this.deleteReview()} />
      </View>
    );
  }

}

export default ChangeReview;