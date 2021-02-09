import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';


class Review extends Component
{
  constructor(props)
  {
    super(props);
  }


  render()
  {
    return(
      <View>
          <Text>Likes: {this.props.likes}</Text>
          <Text>Comment: {this.props.comment}</Text>
          <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
          <Text>Quality Rating: {this.props.qualityRating} Cleanlieness Rating: {this.props.cleanlienessRating}</Text>
      </View>
    );
  }

}


export default Review;