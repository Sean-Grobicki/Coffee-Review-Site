import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getToken } from '../../api/asyncStorage';
import { post, remove, get} from '../../api/apiRequests';


class ShowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: false,
      favouriteText: 'staro',
    };
  }

  componentDidMount() {
    this.setState({favourite: this.props.favourite});
    if (this.state.favourite) {
      this.setState({ favouriteText: 'star' });
    }
    else {
      this.setState({ favouriteText: 'staro' });
    }
  }

  async favouriteLocation() {
    const route = '/location/'+ this.props.id + '/favourite';
    const token = await getToken();
    const body = {};
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    if (!this.state.favourite) {
      const response = await post(route, headers, body);
    }
    else {
      const response = await remove(route, headers);
    }
    this.state.favourite = !this.state.favourite;
    if (this.state.favourite) {
      this.setState({ favouriteText: 'Unfavourite' });
    }
    else {
      this.setState({ favouriteText: 'Favourite' });
    }
  }

  render() {
    return (
      <View>
        <Text>Name: {this.props.name}</Text>
        <Text>Place: {this.props.town}</Text>
        <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
        <Text>Quality Rating: {this.props.qualityRating} Cleanlieness Rating: {this.props.cleanlienessRating}</Text>
        <Icon name={this.state.favouriteText} size={25} color="red" />

      </View>
    );
  }
}

export default ShowLocation;
