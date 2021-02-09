import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ShadowPropTypesIOS,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { post } from '../../api/apiRequests';
import { getToken } from '../../api/asyncStorage';

class WriteReview extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      locationID: '',
      comment: '',
      ovrRating: '',
      priceRating: '',
      qualRating: '',
      clenRating: '',
    }
  }

  componentDidMount()
  {
    this.setState({locationID: this.props.route.params.locationID});
  }


  async sendReview()
  {
    const route = '/location/'+ this.state.locationID + '/review';
    const token = await getToken();
    const headers = {'X-Authorization': token , 'Content-Type': 'application/json'};
    const body = JSON.stringify({
      overall_rating: parseInt(this.state.ovrRating),
      price_rating: parseInt(this.state.priceRating),
      quality_rating: parseInt(this.state.qualRating),
      clenliness_rating: parseInt(this.state.clenRating),
      review_body: this.state.comment,
    });
    const response = await post(route,headers,body);
    this.props.navigation.goBack();
  }


  render()
  {
    return (
      <View>
          <TextInput placeholder = "Enter your Overall Rating: " onChangeText = {(ovrRating) => this.setState({ovrRating: ovrRating})}/>
          <TextInput placeholder = "Enter your Price Rating: " onChangeText = {(priRating) => this.setState({priceRating: priRating})}/>
          <TextInput placeholder = "Enter your Quality Rating: : " onChangeText = {(qualRating) => this.setState({qualRating: qualRating})}/>
          <TextInput placeholder = "Enter your Cleanliness Rating: " onChangeText = {(clenRating) => this.setState({clenRating: clenRating})}/>
          <TextInput placeholder = "Enter your comments: " onChangeText = {(comment) => this.setState({comment: comment})}/>
          <Button title = "Finish Review" onPress = {() => this.sendReview()}/>
      </View>
    );

  }

}

export default WriteReview;