import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favourite from '../components/screens/favourite';
import Location from '../components/screens/location';
import WriteReview from '../components/screens/writeReview';

const FavStack = createStackNavigator();

function FavouriteNav() {
  return (
    <FavStack.Navigator>
      <FavStack.Screen name="FavouriteRoot" component={Favourite} options={{ headerShown: false }} />
      <FavStack.Screen name="Location" component={Location} options={{ headerTitleStyle: { fontFamily: 'monospace' } }} />
      <FavStack.Screen name="WriteReview" component={WriteReview} options={{ headerTitleStyle: { fontFamily: 'monospace' } }} />
    </FavStack.Navigator>
  );
}

export default FavouriteNav;
