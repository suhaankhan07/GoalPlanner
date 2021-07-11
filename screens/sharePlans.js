import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class SharePlans extends React.Component {
 constructor () {
  super();
  this.state = {
   
  }
 }

render() {
 return(
  <View>
   <Avatar 
    rounded
    size = 'medium'
    color = "orange"
    icon = {{name : 'Home', type : 'font-awesome' }}
    onPress = {() => this.props.navigation.navigate('SharePlans')}   
    activeOpacity = {0.7}
   />
   </View>
  )  
 }
}