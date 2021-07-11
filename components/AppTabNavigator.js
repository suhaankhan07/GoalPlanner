import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MyGoals from '../screens/Goals/MyGoals'
import SharePlans from '../screens/SharePlans';
import { StackNavigator } from './StackNavigator'; 

export const AppTabNavigator = createBottomTabNavigator({
  MyGoals:{
    screen:MyGoals,
    navigationOptions:{
      tabBarIcon : <Image/>,
      tabBarLabel : "Customize your goals"
    }
 },
  plans:{
   screen: StackNavigator,
    navigationOptions: {
     tabBarIcon: <Image />,
     tabBarLabel: "Create your own plans"   
   }
  },
  SharePlans:{
    screen:SharePlans,
    navigationOptions: {
     tabBarIcon: <Image  />,
     tabBarLabel: "Share your plans"
    }
  }
})