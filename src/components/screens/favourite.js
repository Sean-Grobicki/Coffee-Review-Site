import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

class Favourite extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View>
        <Text>Favourite</Text>
        <Button title = "Location" onPress = {() => this.props.navigation.navigate('Location')}></Button>
      </View>
    );

  }

}

export default Favourite;
