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
import { getLiked, isLiked } from '../shared/getLiked';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationID: '',
      location: [],
      liked: [],
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  async getLocation() {
    const route = '/location/' + this.props.route.params.locationID;
    const headers = { 'Content-Type': 'application/json' };
    const response = await get(route, headers);
    this.setState({
      locationID: this.props.route.params.locationID,
      location: response.data,
      liked: await getLiked(),
    });
  }

  render() {
    return (
      <View>
        <ShowLocation
            location={this.state.location}
            favourite={this.props.route.params.favourite}
          />
        <Button title = "Write a review" onPress = {() => this.props.navigation.navigate('WriteReview',{locationID: this.state.locationID})}></Button>
        <FlatList
            data={this.state.location.location_reviews}
            renderItem={({item}) =>
            <View style = {styles.review}>
              <Review
                locID={this.state.locationID}
                review={item}
                liked={ isLiked(item.review_id,this.state.liked )}
              />
            </View>  
          }
          keyExtractor={(item, index) => item.review_id.toString()} />
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
