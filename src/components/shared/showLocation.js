import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { getToken } from '../../api/asyncStorage';
import { post, remove} from '../../api/apiRequests';
import globalStyle from '../../styles/globalStyle';

class ShowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: this.props.favourite,
      favouriteText: 'staro',
    };
  }

  componentDidMount() {
    if (this.state.favourite) {
      this.setState({ favouriteText: 'star' });
    }
  }

  async favouriteLocation() {
    const route = '/location/'+ this.props.location.location_id + '/favourite';
    const token = await getToken();
    const body = {};
    const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
    if (!this.state.favourite) {
      const response = await post(route, headers, body);
      if (response.code === 200) {
        this.setState({ favouriteText: 'star' });
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to favourite this location');
      } else if (response.code === 403) {
        Alert.alert('You are forbidden to favourite this location');
      } else if (response.code === 404) {
        Alert.alert('This location cannot be found to favourite');
      } else {
        Alert.alert('Server Error');
      }
    } else {
      const response = await remove(route, headers);
      if (response.code === 200) {
        this.setState({ favouriteText: 'staro' });
      } else if (response.code === 401) {
        Alert.alert('You are unauthorised to unfavourite this location');
      } else if (response.code === 403) {
        Alert.alert('You are forbidden to unfavourite this location');
      } else if (response.code === 404) {
        Alert.alert('This Location cannot be found to unfavourite.');
      } else {
        Alert.alert('Server Error');
      }
    }
    this.setState({ favourite: !this.state.favourite });
  }

  render() {
    console.log(this.props.location.photo_path);
    return (
      <View style={styles.container}>
        <View style={styles.allRatingsCon}>
          <Text style={globalStyle.text}>Name: {this.props.location.location_name}</Text>
          <Text style={globalStyle.text}>Place: {this.props.location.location_town}</Text>
          <View style={styles.ratingCon}>
            <Text style={globalStyle.text}>Overall Rating </Text>
            <Rating startingValue={this.props.location.avg_overall_rating} ratingCount={5} imageSize={20} type='custom' ratingColor='red' tintColor='ghostwhite' readonly={true} />
          </View>
          <View style={styles.ratingCon}>
            <Text style={globalStyle.text}>Price Rating </Text>
            <Rating startingValue={this.props.location.avg_overall_rating} ratingCount={5} imageSize={20} type='custom' ratingColor='red' tintColor='ghostwhite' readonly={true} />
          </View>
          <View style={styles.ratingCon}>
            <Text style={globalStyle.text}>Quality Rating </Text>
            <Rating startingValue={this.props.location.avg_overall_rating} ratingCount={5} imageSize={20} type='custom' ratingColor='red' tintColor='ghostwhite' readonly={true} />
          </View>
          <View style={styles.ratingCon}>
            <Text style={globalStyle.text}>Cleanlieness Rating </Text>
            <Rating startingValue={this.props.location.avg_overall_rating} ratingCount={5} imageSize={20} type='custom' ratingColor='red' tintColor='ghostwhite' readonly={true} />
          </View>
        </View>
        <View style={styles.imageCon}>
          <TouchableOpacity onPress={() => this.favouriteLocation()}>
            <Icon name={this.state.favouriteText} size={25} color="red" />
          </TouchableOpacity>
          <Image style={styles.image} source={{ uri: this.props.location.photo_path }}/>
        </View>

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
      justifyContent: 'center',
      backgroundColor: 'ghostwhite',
      minHeight: 170,
      margin: '3%',
    },
    text:
    {
      maxWidth: '40%',
      fontFamily: 'monospace',
    },
    allRatingsCon:
    {
      width: '50%',
    },
    imageCon:
    {
      width: '50%',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    ratingCon:
    {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    image:
    {
      width: '100%',
      height: '100%',
      alignSelf: 'flex-end',
      marginBottom: 'auto',
    },
  })

export default ShowLocation;
