/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LoginNav from './src/navigation/loginNav';


class App extends Component
{

  render()
  {
    return (
      <LoginNav/>
    );
  }

}

export default App;
