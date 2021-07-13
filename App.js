import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from'./components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import Welcome from './screens/Welcome';
import CreateGoals from './screens/Goals/CreateGoals';

export default class App extends React.Component {
  render() {
   return (
    <AppContainer/>
   );
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:Welcome},
  BottomTab: {screen: AppTabNavigator},
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

