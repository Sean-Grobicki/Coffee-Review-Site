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
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ShowLocation from '../shared/showLocation';
import { get } from '../../api/apiRequests';
import { getToken, getUserID } from '../../api/asyncStorage';
import { getFavourites, isFavourite } from '../shared/getFavourites'; 

class Search extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      search: '',
      locations: '',
      favourites: '',
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  async getLocations() {
    const route = '/find?q='+this.state.search;
    const token = await getToken();
    const headers = {'X-Authorization': token};
    const response = await get(route, headers);
    if (response.code === 200) {
      this.setState({ locations: response.data });
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to get this information');
    } else {
      Alert.alert('Server Error');
    }
  }

  async getFavourites() {
    this.setState({ favourites: await getFavourites() });
  }

  goLocation(id) {
    const fav = isFavourite(id, this.state.favourites);
    this.props.navigation.navigate('Location', { locationID: id, favourite: fav});
  }

  render() {
    return (
      <View>
        <TextInput style = {styles.input} placeholder = "Search Cafe's" onChangeText = {(input) => this.setState({search: input})}></TextInput>
        <TouchableOpacity style={styles.buttons} onPress={() => this.getLocations()}>
          <Text> Search</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.locations}
            renderItem={({item}) =>
            <View>
              <ShowLocation
              location={item}
              favourite = {isFavourite(item.location_id,this.state.favourites)}
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