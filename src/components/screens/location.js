import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ShowLocation from '../shared/showLocation';
import Review from '../shared/review'; 
import { get } from '../../api/apiRequests';
import { getLiked, isLiked } from '../shared/getLiked';
import globalStyle from '../../styles/globalStyle';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    if (response.code === 200) {
      // Add something with activity indicator
      this.setState({
        isLoading: false,
        locationID: this.props.route.params.locationID,
        location: response.data,
        liked: await getLiked(),
      });
    } else if (response.code === 404) {
      Alert.alert('This location cannot be found on the server.');
    } else {
      Alert.alert('Server Error');
    }
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={globalStyle.con}>
        <ShowLocation
            location={this.state.location}
            favourite={this.props.route.params.favourite}
          />
        <TouchableOpacity style={globalStyle.button} onPress = {() => this.props.navigation.navigate('WriteReview',{locationID: this.state.locationID})} >
                <Text style={globalStyle.buttonText}> Write a Review </Text>
        </TouchableOpacity>
        <FlatList
            style={globalStyle.flatlist}
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
