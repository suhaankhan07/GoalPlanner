import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default class CreateGoals extends React.Component {
 constructor () {
  super();
  this.state  = {
    GoalName: "",
    GoalDescription: "",
    TimeSpendedOnGoalPerWeek: "",
  }
 }

 render() {
  return(
    <View style = {{flex:1, alignSelf: "cetner", justifyContent: "center"}}>
      <TextInput
       style = {styles.goalTextInputs}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />
      
      <TextInput
       style = {styles.goalTextInputs}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />
      
      <TextInput
       style = {styles.goalTextInputs}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />
    </View>
  )
 }
}

const styles = StyleSheet.create({
  goalTextInputs:{

  },
})