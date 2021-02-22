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

  componentWillUnmount()
  {
    this.focusListener();
  }
  
  async getLocations() {
    const route = '/find?search_in=favourite';
    const token = await getToken();
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    const response = await get(route, headers);
    this.setState({ locations: response });
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
                id={item.location_id}
                name={item.location_name}
                town={item.location_town}
                ovrRating={item.avg_overall_rating}
                priceRating={item.avg_price_rating}
                qualityRating={item.avg_quality_rating}
                cleanlienessRating={item.avg_clenliness_rating}
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
