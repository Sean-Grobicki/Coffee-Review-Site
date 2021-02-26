import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Touchable,
} from 'react-native';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';
import Review from '../shared/review';
import ShowLocation from '../shared/showLocation';
import { getFavourites, isFavourite } from '../shared/getFavourites';
import { getLiked, isLiked } from '../shared/getLiked';
import { getToken, getUserID } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';
import globalStyle from '../../styles/globalStyle';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: [],
      favourites: [],
      liked: [],
      page: 0,
      toShow: [],
      pageNumbers: [],
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
    if (response.code === 200) {
      this.setState({
        isLoading: false,
        user: response.data,
        favourites: await getFavourites(),
        liked: await getLiked(),
      });
      this.createPages();
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to get this information.');
    } else if (response.code === 404) {
      Alert.alert('This users information wasn\'t found');
    } else {
      Alert.alert('Server Error');
    }
  }

  createPages() {
    let pages = [];
    let pageCount = 0;
    const reviews = this.state.user.reviews;
    for (let i = 0; i < reviews.length; i += 3) {
      pages[pageCount] = [ reviews[i + 2], reviews[i + 1], reviews[i]] ;
      pageCount = pageCount + 1;
    }
    let pageNumbers = [];
    for (let number = 0; number < pages.length; number++) {
      pageNumbers[number] = number;
    }
    this.setState({toShow: pages, pageNumbers: pageNumbers});
  }

  goReview(review, locID) {
    this.props.navigation.navigate('Change Review',{review: review, locationID: locID});
  }

  updateFavourites() {
    this.forceUpdate();
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={globalStyle.con}>
        <Text style={globalStyle.title}>Your Reviews</Text>
        <FlatList
          data={this.state.toShow[this.state.page]}
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
              <TouchableOpacity style={globalStyle.button} onPress = {() => this.goReview(item.review,item.location.location_id)} >
                <Text style={globalStyle.buttonText}> Change Review </Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item) => item.review.review_id.toString()}
        />
          <FlatList
            contentContainerStyle={globalStyle.pages}
            data={this.state.pageNumbers}
            renderItem={({ item }) => (
              <TouchableOpacity style={globalStyle.pageButtons} onPress={() => this.setState({page: item})}>
                <Text style={globalStyle.pageText}>
                  Page {item + 1}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
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

export default Home;
