import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/screens/login';
import Signup from '../components/screens/signup';
import MainNav from './mainNav';

const LoginStack = createStackNavigator();

function LoginNav() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={Login} options={{ headerTitleStyle: { fontFamily: 'monospace' } }} />
        <LoginStack.Screen name="Signup" component={Signup} options={{ headerTitleStyle: { fontFamily: 'monospace' } }} />
        <LoginStack.Screen options={{ headerShown: false }} name="Home" component={MainNav} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

export default LoginNav;
