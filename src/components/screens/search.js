import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ShowLocation from '../shared/showLocation';
import { get } from '../../api/apiRequests';
import { getToken, getUserID } from '../../api/asyncStorage'; 


class Search extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      search: '',
      locations: '',
      favourites: '',
      token: '',
    }
  }

  async getLocations()
  {
    const route = '/find?q='+this.state.search;
    const token = await getToken();
    const headers = {'X-Authorization': token};
    const response = await get(route,headers);
    this.setState({locations: response, token: token});
  }

  async getFavourites() {
    const uid = await getUserID();
    const route = '/user/'+ uid;
    const headers = { 'X-Authorization': this.state.token };
    const response = await get(route, headers);
    let locationIDs = [];
    for (const location in response.favourite_locations) {
      locationIDs.push(location.location_id);
    }
    this.setState({ favourites: response.favourite_locations });
  }

  componentDidMount() {
    this.getFavourites();
    console.log(this.state.favourites);
  }

  goLocation(id)
  {
    this.props.navigation.navigate('Location', {locationID: id});
  }

  render()
  {
    return (
      <View>
        <TextInput style = {styles.input} placeholder = "Search Cafe's" onChangeText = {(input) => this.setState({search: input})}></TextInput>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.getLocations()}>
          <Text> Search</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.locations}
            renderItem={({item}) =>
            <View>
              <ShowLocation
              id = {item.location_id}
              name = {item.location_name} 
              town = {item.location_town} 
              ovrRating = {item.avg_overall_rating} 
              priceRating = {item.avg_price_rating}
              qualityRating = {item.avg_quality_rating}
              cleanlienessRating = {item.avg_clenliness_rating}
              />
              <Button title = "Look at Reviews" onPress = {() => this.goLocation(item.location_id)}></Button>
            </View>  
          }
          keyExtractor={(item, index) => item.location_id.toString()}
          />
        
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
  input: 
  {
  },
  button:
  {

  },
  buttons:
  {
    borderWidth: 2,
    borderColor: 'black',
    padding: '2%',
    borderRadius: 5,
    margin: '5%',
    width: '20%',
    alignSelf: 'flex-end',
  },
})

export default Search;