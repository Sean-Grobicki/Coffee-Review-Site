import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
} from 'react-native';
import { getToken } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';
import ShowLocation from '../shared/showLocation';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getLocations();
    });
    this.getLocations();
  }

  componentWillUnmount() {
    this.focusListener();
  }
  
  async getLocations() {
    const route = '/find?search_in=favourite';
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    const response = await get(route, headers);
    this.setState({ locations: response });
  }

  goLocation(id) {
    this.props.navigation.navigate('Location', {locationID: id, favourite: true});
  }

  render() {
    return (
      <View>
        <Text> Your Favourites </Text>
        <FlatList
          data={this.state.locations}
          renderItem={({ item }) => (
            <View>
              <ShowLocation
                location={item}
                favourite={true}
              />
              <Button title="Look at Reviews" onPress={() => this.goLocation(item.location_id)} />
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    );
  }
}

export default Favourite;
