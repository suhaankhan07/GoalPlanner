import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSlideBarMenu from './CustomSlideBarMenu';
import MyGoals from '../screens/Goals/MyGoals';
import Notification from '../screens/NotificationScreen';
import Settings from '../screens/Settings';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
      screen:AppTabNavigator
    },
    MyGoals:{
      screen: MyGoals
    },
    Notifications:{
     screen:Notification
    },
    Settings:{
      screen:Settings
    }
   },
    {
     contentComponent: CustomSlideBarMenu
    },
   {
     initialRouteName : 'Home',
   })
   
