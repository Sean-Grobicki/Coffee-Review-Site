import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../components/screens/settings';
import ChangeInfo from '../components/screens/changeInfo';

const SettingsNav = createStackNavigator();

function SettingNav() {
  return (
    <SettingsNav.Navigator>
      <SettingsNav.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <SettingsNav.Screen name="Change Information" component={ChangeInfo} options={{ headerTitleStyle: { fontFamily: 'monospace' } }} />
    </SettingsNav.Navigator>
  );
}

export default SettingNav;
