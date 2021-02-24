import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { getToken} from '../../api/asyncStorage';
import { remove, post, getImage} from '../../api/apiRequests';

class Review extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      liked: false,
      iconName: 'like2',
      token: '',
      image: [],
      isImage: false,
    };
  }

  componentDidMount() {
    this.setState({ liked: this.props.liked });
    if (this.props.liked) {
      this.setState({ iconName: 'like1' });
    }
    this.getImage();
  }

  async likeUnlike() {
    const route = '/location/'+ this.props.locID + '/review/'+ this.props.review.review_id + '/like';
    const body = {};
    const headers = { 'X-Authorization': this.state.token, 'Content-Type': 'application/json' };
    if (!this.state.liked) {
      const response = await post(route, headers, body);
      this.setState({ iconName: 'like1' });
    } else {
      const response = await remove(route, headers);
      this.setState({ iconName: 'like2' });
    }
    this.setState({ liked: !this.state.liked });
  }

  async getImage() {
    const route = '/location/' + this.props.locID + '/review/' + this.props.review.review_id + '/photo';
    const token = await getToken();
    this.setState({token: token});
    const headers = { 'X-Authorization': token};
    const response = await getImage(route, headers);
    if (response.code === 200) {
      this.setState({ image: response.data, isImage: true });
    }
  }

  render() {
    if (!this.state.isImage) {
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
    } else {
      console.log(this.state.image);
    return(
      <View>
          <Image style={styles.image}/>
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
}
const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    image:
    {
      width: 100,
      height: 100,
    },
  })

export default Review;
