import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MyGoals from '../screens/MyGoals'
import SharePlans from '../screens/sharePlans';
import { StackNavigator } from './StackNavigator'; 

export const AppTabNavigator = createBottomTabNavigator({
  plans:{
   screen: StackNavigator,
    navigationOptions: {
     tabBarIcon: <Image />,
     tabBarLabel: "Schedule plans"   
   }
  },
  MyGoals:{
      screen:MyGoals,
      navigationOptions:{
        tabBarIcon : <Image/>,
        tabBarLabel : "Customize your goals"
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