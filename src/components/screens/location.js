import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';
import ShowLocation from '../shared/showLocation';
import Review from '../shared/review'; 
import { get } from '../../api/apiRequests';

class Location extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      locationID: '',
      location: [],
    }
  }

  async getLocation()
  {    
    const route = '/location/' + this.props.route.params.locationID;
    const headers = { 'Content-Type': 'application/json' };
    const response = await get(route,headers);
    this.setState(
      {
      locationID: this.props.route.params.locationID,
      location: response,
    });
  }


  componentDidMount()
  {
    this.getLocation();
  }

  render()
  {
    return (
      <View>
        <ShowLocation
            id = {this.state.location.location_id}
            name = {this.state.location.location_name} 
            town = {this.state.location.location_town} 
            ovrRating = {this.state.location.avg_overall_rating} 
            priceRating = {this.state.location.avg_price_rating}
            qualityRating = {this.state.location.avg_quality_rating}
            cleanlienessRating = {this.state.location.avg_clenliness_rating}
          />
        <Button title = "Write a review" onPress = {() => this.props.navigation.navigate('WriteReview',{locationID: this.state.locationID})}></Button>
        <FlatList
            data={this.state.location.location_reviews}
            renderItem={({item}) =>
            <View style = {styles.review}>
              <Review
                likes = {item.likes}
                comment = {item.review_body}
                ovrRating = {item.overall_rating} 
                priceRating = {item.price_rating}
                qualityRating = {item.quality_rating}
                cleanlienessRating = {item.clenliness_rating}
              />

            </View>  
          }
          keyExtractor={(item, index) => item.review_id.toString()}
          />
      </View>
    );

  }

}
const styles = StyleSheet.create({
  review:
  {
    borderColor: 'black',
    borderWidth: 2,
  },

});
export default Location;