import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from'./components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SignupLogin from './screens/SignupLogin';
import CreateGoals from './screens/Goals/CreateGoals';
import GoalsScreen from './screens/Goals/GoalsScreen';

export default class App extends React.Component {
  render() {
   return (
    <AppContainer/>
   );
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLogin: {screen: SignupLogin},
  BottomTab: {screen: AppTabNavigator},
  DrawerNavigator:{screen:AppDrawerNavigator},
  CreateGoalsScreen:{screen:CreateGoals},
  GoalsScreen: {screen:GoalsScreen},
});

const AppContainer = createAppContainer(switchNavigator);

