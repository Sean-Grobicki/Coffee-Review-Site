import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    if (this.props.favourite) {
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
      this.setState({ favouriteText: 'star' });
    } else {
      const response = await remove(route, headers);
      this.setState({ favouriteText: 'staro' });
    }
    this.setState({ favourite: !this.state.favourite });
    this.forceUpdate();
    this.props.update();
  }

  render() {
    return (
      <View>
        <Text>Name: {this.props.name}</Text>
        <Text>Place: {this.props.town}</Text>
        <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
        <Text>Quality Rating: {this.props.qualityRating} Cleanlieness Rating: {this.props.cleanlienessRating}</Text>
        <TouchableOpacity onPress={() => this.favouriteLocation()}>
          <Icon name={this.state.favouriteText} size={25} color="red" />
        </TouchableOpacity>

      </View>
    );
  }
}

export default ShowLocation;
