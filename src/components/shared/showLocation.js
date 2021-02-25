import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getToken } from '../../api/asyncStorage';
import { post, remove} from '../../api/apiRequests';

class ShowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: this.props.favourite,
      favouriteText: 'staro',
    };
  }

  componentDidMount() {
    if (this.state.favourite) {
      this.setState({ favouriteText: 'star' });
    }
  }

  async favouriteLocation() {
    const route = '/location/'+ this.props.id + '/favourite';
    const token = await getToken();
    const body = {};
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    if (!this.state.favourite) {
      const response = await post(route, headers, body);
      if (response.code === 200) {
        this.setState({ favouriteText: 'star' });
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to delete this review');
      } else if (response.code === 403) {
        Alert.alert('You are forbidden to delete this review');
      } else if (response.code === 404) {
        Alert.alert('This review cannot be found to delete.');
      } else {
        Alert.alert('Server Error');
      }
    } else {
      const response = await remove(route, headers);
      if (response.code === 200) {
        this.setState({ favouriteText: 'staro' });
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
    this.setState({ favourite: !this.state.favourite });
  }

  render() {
    console.log(this.props.location.photo_path);
    return (
      <View>
        <Text>Name: {this.props.location.location_name}</Text>
        <Text>Place: {this.props.location.location_town}</Text>
        <Text>Overall Rating: {this.props.location.avg_overall_rating} Price Rating: {this.props.location.avg_price_rating}</Text>
        <Text>Quality Rating: {this.props.location.avg_quality_rating} Cleanlieness Rating: {this.props.location.avg_clenliness_rating}</Text>
        <Image style={styles.image} source={{ uri: this.props.location.photo_path }}/>
        <TouchableOpacity onPress={() => this.favouriteLocation()}>
          <Icon name={this.state.favouriteText} size={25} color="red" />
        </TouchableOpacity>

      </View>
    );
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
      width: 200,
      height: 200,
    },
  })

export default ShowLocation;
