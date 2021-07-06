import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from'./components/AppTabNavigator';
import Welcome from './screens/Welcome';
import CreateGoals from './screens/CreateGoals';
import Settings from './screens/Settings';

import CustomSlideBarMenu from './components/CustomSlideBarMenu';

export default class App extends React.Component {
  render() {
  return (
    <View style={styles.container}>
     <AppContainer/>
    </View>
  );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
 Home:{
   screen:AppTabNavigator
 },
 Settings:{
   screen:Settings
 },
},
 {
  contentComponent: CustomSlideBarMenu
 },
{
  initialRouteName : 'Home',
});

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:Welcome},
  CreateGoalsScreen:{screen:CreateGoals},
  DrawerNavigator:{screen:AppDrawerNavigator},
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center',
  }
})

