import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/screens/home';
import ChangeReview from '../components/screens/changeReview';
import Camera from '../components/screens/camera';

const HomeStack = createStackNavigator();

class HomeNav extends Component { 
render() {
    return (
    <HomeStack.Navigator>
      <HomeStack.Screen name = "Home" component = {Home} options = {{headerShown: false}}/>
      <HomeStack.Screen name = "Change Review" component = {ChangeReview} options={{headerTitleStyle: {fontFamily: 'monospace'}}}/>
      <HomeStack.Screen name = "Camera" component = {Camera} options={{headerTitleStyle: {fontFamily: 'monospace'}}}/>
    </HomeStack.Navigator>
      );
    }
}
  
export default HomeNav;
