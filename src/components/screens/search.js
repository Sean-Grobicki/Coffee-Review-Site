import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ShowLocation from '../shared/showLocation';
import { get } from '../../api/apiRequests';
import { getToken, getUserID } from '../../api/asyncStorage';
import { getFavourites, isFavourite } from '../shared/getFavourites';
import globalStyle from '../../styles/globalStyle';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locations: '',
      favourites: '',
      filterOptions: false,
      ovrFilter: 0,
      priceFilter: 0,
      clenFilter: 0,
      qualFilter: 0,
      page: 0,
      toShow: [],
      pageNumbers: [],
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  async getFavourites() {
    this.setState({ favourites: await getFavourites() });
  }

  async getLocations() {
    const route = '/find?'+ this.getParams();
    const token = await getToken();
    const headers = {'X-Authorization': token};
    const response = await get(route, headers);
    if (response.code === 200) {
      this.setState({ filterOptions: false, locations: response.data });
      this.createPages();
    } else if (response.code === 400) {
      Alert.alert('A bad request was sent to the server');
    } else if (response.code === 401) {
      Alert.alert('You are unauthorised to get this information');
    } else {
      Alert.alert('Server Error');
    }
  }

  getParams() {
    let params = '';
    let queries = 0;
    if (this.state.search !== '') {
      if (queries !== 0) {
        params += '&';
      }
      params += 'q=' + this.state.search;
      queries += 1;
    }
    if (this.state.ovrFilter !== 0) {
      if (queries !== 0) {
        params += '&';
      }
      params += 'overall_rating=' + this.state.ovrFilter;
      queries += 1;
    }
    if (this.state.priceFilter !== 0) {
      if (queries !== 0) {
        params += '&';
      }
      params += 'price_rating=' + this.state.priceFilter;
      queries += 1;
    }
    if (this.state.qualFilter !== 0) {
      if (queries !== 0) {
        params += '&';
      }
      params += 'quality_rating=' + this.state.qualFilter;
      queries += 1;
    }
    if (this.state.clenFilter !== 0) {
      if (queries !== 0) {
        params += '&';
      }
      params += 'clenliness_rating=' + this.state.clenFilter;
      queries += 1;
    }
    return params;
  }

  createPages() {
    const pages = [];
    let pageCount = 0;
    const locations = this.state.locations;
    for (let i = 1; i <= locations.length; i += 1) {
      if (i % 3 === 0) {
        pages[pageCount] = [locations[i - 3], locations[i - 2], locations[i - 1]];
        pageCount += 1;
      }
      if (i === locations.length) {
        const num = i % 3;
        if (num === 2) {
          pages[pageCount] = [locations[i - 2], locations[i - 1]];
        } else {
          pages[pageCount] = [locations[i - 1]];
        }
        pageCount += 1;
      }
    }
    const pageNumbers = [];
    for (let number = 0; number < pages.length; number += 1) {
      pageNumbers[number] = number;
    }
    this.setState({ toShow: pages, pageNumbers: pageNumbers });
  }

  render() {
    if (this.state.filterOptions) {
      const pickerList = [
        { label: 'At least 0', value: 0 },
        { label: 'At least 1', value: 1 },
        { label: 'At least 2', value: 2 },
        { label: 'At least 3', value: 3 },
        { label: 'At least 4', value: 4 },
        { label: 'At least 5', value: 5 },
      ];
      return (
        <View style={globalStyle.con}>
          <TextInput style={globalStyle.text} placeholder="Search Cafe's" onChangeText={(input) => this.setState({ search: input })} />
          <TouchableOpacity style={globalStyle.button} onPress={() => this.setState({ filterOptions: false })}>
            <Text style={globalStyle.buttonText}> Filter </Text>
          </TouchableOpacity>
          <Text style={globalStyle.text}> Average Overall Rating </Text>
          <DropDownPicker globalTextStyle={globalStyle.text} items={pickerList} containerStyle={{ height: 40 }} defaultValue={0} onChangeItem={(item) => this.setState({ ovrFilter: item.value })} />
          <Text style={globalStyle.text}> Average Price Rating </Text>
          <DropDownPicker globalTextStyle={globalStyle.text} items={pickerList} containerStyle={{ height: 40 }} defaultValue={0} onChangeItem={(item) => this.setState({ priceFilter: item.value })} />
          <Text style={globalStyle.text}> Average Quality Rating </Text>
          <DropDownPicker globalTextStyle={globalStyle.text} items={pickerList} containerStyle={{ height: 40 }} defaultValue={0} onChangeItem={(item) => this.setState({ qualFilter: item.value })} />
          <Text style={globalStyle.text}> Average Cleanlieness Rating </Text>
          <DropDownPicker globalTextStyle={globalStyle.text} items={pickerList} containerStyle={{ height: 40 }} defaultValue={0} onChangeItem={(item) => this.setState({ clenFilter: item.value })} />
          <TouchableOpacity style={globalStyle.button} onPress={() => this.getLocations()}>
            <Text style={globalStyle.buttonText}> Search</Text>
          </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={globalStyle.con}>
        <TextInput style={globalStyle.text} placeholder="Search Cafe's" onChangeText={(input) => this.setState({ search: input })} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={globalStyle.button} onPress={() => this.setState({filterOptions: true})} >
            <Text style={globalStyle.buttonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyle.button} onPress={() => this.getLocations()}>
            <Text style={globalStyle.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatList}
          data={this.state.toShow[this.state.page]}
          renderItem={({ item }) => (
            <View>
              <ShowLocation
                location={item}
                favourite={isFavourite(item.location_id,this.state.favourites)}
              />
              <TouchableOpacity style={globalStyle.button} onPress={() => this.goLocation(item.location_id)}>
                <Text style={globalStyle.buttonText}> Check Reviews </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
        <FlatList
          contentContainerStyle={globalStyle.pages}
          data={this.state.pageNumbers}
          renderItem={({ item }) => (
            <TouchableOpacity style={globalStyle.pageButtons} onPress={() => this.setState({ page: item })}>
              <Text style={globalStyle.pageText}>
                Page
                {item + 1}
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
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'ghostwhite',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'ghostwhite',
  },
});

export default Search;
