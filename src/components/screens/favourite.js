import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getToken } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';
import ShowLocation from '../shared/showLocation';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    if (response.code === 200) {
      // Add something with activity indicator
      this.setState({ isLoading: false,locations: response.data });
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to get these locations');
    } else {
      Alert.alert('Server Error');
    }
  }

  goLocation(id) {
    this.props.navigation.navigate('Location', { locationID: id, favourite: true });
  }

  render() {
    if(this.state.isLoading) {
      return <ActivityIndicator />;
    }
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
