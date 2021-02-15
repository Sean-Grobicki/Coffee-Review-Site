import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

class ShowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: '',
    };
  }

  favouriteLocation(fav) {

  }

  render() {
    return (
      <View>
        <Text>Name: {this.props.name}</Text> 
        <Text>Place: {this.props.town}</Text>
        <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
        <Text>
          Quality Rating: {this.props.qualityRating} 
          Cleanlieness Rating: {this.props.cleanlienessRating}
        </Text>
        <CheckBox
          value={this.props.favourite}
          onValueChange={(fav) => this.favouriteLocation(fav)}
        />
      </View>
    );
  }
}

export default ShowLocation;
