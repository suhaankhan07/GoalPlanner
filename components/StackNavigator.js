import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import SeePlans from '../screens/Plans/SeePlans';
import CreatePlans from '../screens/Plans/CreatePlans';
import Plan1Details from '../screens/Plans/Plan1Details';
import Plan2Details from '../screens/Plans/Plan2Details';

export const StackNavigator = createStackNavigator({
 PlanOptions : {
  screen: SeePlans,
  navigationOptions: {
   headerShown: false,
    }
   },
 CreatePlans :{
  screen:CreatePlans,
   navigationOptions: {
   headerShown: false,
   }
  },
 Plan1Details :{
  screen:Plan1Details,
   navigationOptions: {
   headerShown: false,
   }
  }, 
 Plan2Details :{
  screen:Plan2Details,
   navigationOptions: {
   headerShown: false,
   }
  },
},
  {
   initialRouteName: "PlanOptions"
  }
);