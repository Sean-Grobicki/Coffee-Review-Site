import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

class Review extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      liked: false,
      iconName: 'like2',
    };
  }

  async likeUnlike(){

  }

  componentDidMount(){
    this.setState({liked: this.props.liked})
    if (this.state.liked){
      this.setState({iconName: 'like1'});
    }
  }

  render()
  {
    return(
      <View>
          <Text>Likes: {this.props.likes}</Text>
          <Text>Comment: {this.props.comment}</Text>
          <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
          <Text>Quality Rating: {this.props.qualityRating} Cleanlieness Rating: {this.props.cleanlienessRating}</Text>
          <TouchableOpacity onPress={() => this.likeUnlike()}>
            <Icon name={this.state.iconName} color="red" size={30}/>
          </TouchableOpacity>
      </View>
    );
  }

}


export default Review;