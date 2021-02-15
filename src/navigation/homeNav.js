import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/screens/home';
import ChangeReview from '../components/screens/changeReview';
  
const HomeStack = createStackNavigator();

class HomeNav extends Component { 
render() {
    return (
    <HomeStack.Navigator>
        <HomeStack.Screen name = "Home" component = {Home} options = {{headerShown: false}}/>
        <HomeStack.Screen name = "Change Review" component = {ChangeReview}/>
    </HomeStack.Navigator>
      );
    }
}
  
export default HomeNav;
