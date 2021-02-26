import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { Rating } from 'react-native-ratings';
import { getToken} from '../../api/asyncStorage';
import { remove, post, getImage} from '../../api/apiRequests';
import globalStyle from '../../styles/globalStyle';

class Review extends Component {
  constructor(props) {
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

  async getImage() {
    const route = '/location/' + this.props.locID + '/review/' + this.props.review.review_id + '/photo';
    const token = await getToken();
    this.setState({ token: token });
    const headers = { 'X-Authorization': token};
    const response = await getImage(route, headers);
    if (response.code === 200) {
      this.setState({ image: response.data, isImage: true });
    } else if (response.code === 404) {}
    else {
      Alert.alert('Server error');
    }
    /* Can't get the image from the server but the image is stored on the server and there is a gap
    left where it should be so you can tell when an image has been deleted */
  }

  async likeUnlike() {
    const route = '/location/'+ this.props.locID + '/review/'+ this.props.review.review_id + '/like';
    const body = {};
    const headers = { 'X-Authorization': this.state.token, 'Content-Type': 'application/json' };
    if (!this.state.liked) {
      const response = await post(route, headers, body);
      if (response.code === 200) {
        this.setState({ iconName: 'like1' });
      } else if (response.code === 400) {
        Alert.alert('A bad request was sent to the server');
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to like this review');
      } else if (response.code === 404) {
        Alert.alert('This review cannot be found on the server.');
      } else {
        Alert.alert('Server Error');
      }
    } else {
      const response = await remove(route, headers);
      if (response.code === 200) {
        this.setState({ iconName: 'like2' });
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to delete this review');
      } else if (response.code === 403) {
        Alert.alert('You are forbidden to delete this review');
      } else if (response.code === 404) {
        Alert.alert('This review cannot be found to delete.');
      } else {
        Alert.alert('Server Error');
      }
    }
    this.setState({ liked: !this.state.liked });
  }

  render() {
    if (!this.state.isImage) {
      return (
        <View style={styles.container}>
          <View style={styles.ratingsCon}>
            <Text style={globalStyle.text}> Overall Rating </Text>
            <Rating startingValue={this.props.review.overall_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
          </View>
          <View style={styles.ratingsCon}>
            <Text style={globalStyle.text}> Price Rating </Text>
            <Rating startingValue={this.props.review.price_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
          </View>
          <View style={styles.ratingsCon}>
            <Text style={globalStyle.text}> Quality Rating </Text>
            <Rating startingValue={this.props.review.quality_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
          </View>
          <View style={styles.ratingsCon}>
            <Text style={globalStyle.text}> Cleanlieness Rating </Text>
            <Rating startingValue={this.props.review.clenliness_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
          </View>
          <View style={styles.likeContainer}>
            <Text style={styles.comment}>{this.props.review.review_body}</Text>
            <TouchableOpacity onPress={() => this.likeUnlike()}>
              <Icon name={this.state.iconName} color="red" size={30} />
            </TouchableOpacity>
            <Text style={globalStyle.text}>{this.props.review.likes}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.state.image.toString()}}/>
        <View style={styles.ratingsCon}>
          <Text style={globalStyle.text}> Overall Rating </Text>
          <Rating startingValue={this.props.review.overall_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
        </View>
        <View style={styles.ratingsCon}>
          <Text style={globalStyle.text}> Price Rating </Text>
          <Rating startingValue={this.props.review.price_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
        </View>
        <View style={styles.ratingsCon}>
          <Text style={globalStyle.text}> Quality Rating </Text>
          <Rating startingValue={this.props.review.quality_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
        </View>
        <View style={styles.ratingsCon}>
          <Text style={globalStyle.text}> Cleanlieness Rating </Text>
          <Rating startingValue={this.props.review.clenliness_rating} ratingCount={5} imageSize={20} type="custom" ratingColor="red" tintColor="ghostwhite" readonly />
        </View>
        <View style={styles.likeContainer}>
          <Text style ={styles.comment}>{this.props.review.review_body}</Text>
          <TouchableOpacity onPress={() => this.likeUnlike()}>
            <Icon name={this.state.iconName} color="red" size={30} />
          </TouchableOpacity>
          <Text style={globalStyle.text}>{this.props.review.likes}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      backgroundColor: 'ghostwhite',
    },
    image:
    {
      width: 100,
      height: 100,
    },
    likeContainer:
    {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    ratingsCon:
    {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '1%',
    },
    comment:
    {
      marginRight: 'auto',
      marginLeft: '1%',
      fontFamily: 'monospace',
      maxWidth: '80%',
    },
  })

export default Review;
