import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
} from 'react-native';
import Review from '../shared/review';
import ShowLocation from '../shared/showLocation';
import { getFavourites, isFavourite } from '../shared/getFavourites';
import { getLiked, isLiked } from '../shared/getLiked';
import { getToken, getUserID } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      favourites: [],
      liked: [],
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getInfo();
    });
    this.getInfo();
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async getInfo() {
    const id = await getUserID();
    const token = await getToken();
    const route = '/user/'.concat(id);
    const headers = { 'X-Authorization': token };
    const response = await get(route, headers);
    this.setState({
      user: response.data,
      favourites: await getFavourites(),
      liked: await getLiked(),
    });
  }

  goReview(review, locID) {
    this.props.navigation.navigate('Change Review',{review: review, locationID: locID});
  }

  updateFavourites() {
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Your Reviews</Text>
        <FlatList
          data={this.state.user.reviews}
          renderItem={({ item }) =>
            <View style = {styles.review}>
              <ShowLocation
                location={item.location}
                favourite={isFavourite(item.location.location_id,this.state.favourites)}
                update={() => this.updateFavourites()}
               />
              <Review
                locID= {item.location.location_id}
                review={item.review}
                liked={isLiked(item.review.review_id,this.state.liked)}
              />
              <Button title="Change Review" onPress = {() =>this.goReview(item.review,item.location.location_id)}/>
            </View>
          }
          keyExtractor={(item) => item.review.review_id.toString()}
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
  },
});

export default Home;
