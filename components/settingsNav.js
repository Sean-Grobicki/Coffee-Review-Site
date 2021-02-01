import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
  import { createStackNavigator } from '@react-navigation/bottom-tabs';
  import Settings from './settings';
  import ChangeInfo from './changeInfo';
  
  const SettingsNav = createStackNavigator();
  
  
  class SettingsNav extends Component
  {
    constructor(props)
    {
      super(props);
    }
  
    render()
    {
      return (
        <SettingsNav.Navigator>
            <SettingsNav.Screen name = "Settings" component = {Settings}/>
            <SettingsNav.Screen name = "ChangeInfo" component = {ChangeInfo}/>
      </SettingsNav.Navigator>
      );
    }
  }
  
  export default SettingsNav;