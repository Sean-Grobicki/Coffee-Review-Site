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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@sessionKey';

class Search extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      search: '',
      locations: '',
      session: '',
    }
  }

  async getLocations()
  {
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', 
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'X-Authorization': this.state.session,
               },
    })
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        locations: responseJson,
      });
      console.log(responseJson)
    })
    .catch((error) =>{
      console.log(error);
    });
  }
  
  componentDidMount()
  {
    this.getSession();
  }

  async getSession()
  {
    try 
    {
      await AsyncStorage.getItem(SESSION_KEY).then((value) =>{
        if(value)
        {
          this.setState({session:value});
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    console.log(this.state.session);
  }

  goLocation(id)
  {
    console.log(id);
    this.props.navigation.navigate('Location',{locationID: id});
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
            <ShowLocation
            id = {item.location_id}
            name = {item.location_name} 
            town = {item.location_town} 
            ovrRating = {item.avg_overall_rating} 
            priceRating = {item.avg_price_rating}
            qualityRating = {item.avg_quality_rating}
            cleanlienessRating = {item.avg_clenliness_rating}
            goLocation = {(id) => this.goLocation(id)}/>}
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





export default Search;