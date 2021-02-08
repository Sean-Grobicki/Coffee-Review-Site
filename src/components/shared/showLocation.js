import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';


class ShowLocation extends Component
{
  constructor(props)
  {
    super(props);
  }


  render()
  {
    return(
      <View>
          <Text>Name: {this.props.name}</Text>
          <Text>Place: {this.props.town}</Text>
          <Text>Overall Rating: {this.props.ovrRating} Price Rating: {this.props.priceRating}</Text>
          <Text>Quality Rating: {this.props.qualityRating} Cleanlieness Rating: {this.props.cleanlienessRating}</Text>
          <Button title = "Look at Reviews" onPress = {() => this.props.goLocation(this.props.id)}></Button> 
      </View>
    );
  }

}


export default ShowLocation;