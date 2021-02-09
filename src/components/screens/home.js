import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import Review from '../shared/review';
import ShowLocation from '../shared/showLocation';
import { getToken, getUserID } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';



class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.state ={
      user: '',
    }
  }

  componentDidMount()
  {
    this.getInfo();
    
  }

  async getInfo()
  {
    const id = await getUserID();
    const token = await getToken();
    const route = '/user/'+ id;
    const headers = {'X-Authorization': token};
    const response = await get(route,headers);
    this.setState({user: response});
    console.log(this.state.user.reviews.review);
  }


  render()
  {
    return (
      <View>
        <Text style = {styles.title}>Your Reviews</Text>
          <FlatList
            data={this.state.user.reviews}
            renderItem={({item}) =>
            <View style = {styles.review}>
              <ShowLocation
              name = {item.location.location_name} 
              town = {item.location.location_town} 
              ovrRating = {item.location.avg_overall_rating} 
              priceRating = {item.location.avg_price_rating}
              qualityRating = {item.location.avg_quality_rating}
              cleanlienessRating = {item.location.avg_clenliness_rating}
              />
              <Review
                likes = {item.review.likes}
                comment = {item.review.review_body}
                ovrRating = {item.review.overall_rating} 
                priceRating = {item.review.price_rating}
                qualityRating = {item.review.quality_rating}
                cleanlienessRating = {item.review.clenliness_rating}
              />
            </View>  
          }
          keyExtractor={(item, index) => item.review.review_id.toString()}
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
  title:
  {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',

  }
});

export default Home;

