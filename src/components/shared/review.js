import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { getToken} from '../../api/asyncStorage';
import { remove, post } from '../../api/apiRequests';

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

  componentDidMount() {
    this.setState({ liked: this.props.liked });
    if (this.props.liked) {
      this.setState({ iconName: 'like1' });
    }
  }

  async likeUnlike() {
    const route = '/location/'+ this.props.locID + '/review/'+ this.props.review.review_id + '/like';
    const token = await getToken();
    const body = {};
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    if (!this.state.liked) {
      const response = await post(route, headers, body);
      this.setState({ iconName: 'like1' });
    } else {
      const response = await remove(route, headers);
      this.setState({ iconName: 'like2' });
    }
    this.setState({ liked: !this.state.liked });
  }

  render()
  {
    return(
      <View>
          <Text>Likes: {this.props.review.likes}</Text>
          <Text>Comment: {this.props.review.review_body}</Text>
          <Text>Overall Rating: {this.props.review.overall_rating} Price Rating: {this.props.review.price_rating}</Text>
          <Text>Quality Rating: {this.props.review.quality_rating} Cleanlieness Rating: {this.props.review.clenliness_rating}</Text>
          <TouchableOpacity onPress={() => this.likeUnlike()}>
            <Icon name={this.state.iconName} color="red" size={30} />
          </TouchableOpacity>
      </View>
    );
  }
}

export default Review;
