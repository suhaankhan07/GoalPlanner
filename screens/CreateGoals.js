import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class CreateGoals extends React.Component {
 constructor () {
  super();
  this.state  = {
    uerId: firebase.auth().currentUser.email,
    goalName: "",
    goalDescription: "",
    timeSpendedOnGoalPerWeek: "",
    
  }
 }

 createUniqueId = () => {
   return Math.random().toString(7).substring(36)
 }

 submitGoal = (goalName, goalDescription, goalTime) => {
  var userId = this.state.userId;
  var randomRequestId = this.createUniqueId();
  db.collection('GoalsMade').where('Email_Address', "==", userId).add({
   GoalName: goalName,
   GoalDescription: goalDescription,
   GoalTime: goalTime,
   GoalsViewed: false,
   RequestID: randomRequestId,
  }),
  db.collection('GoalsMade').where('Email_Address', "==", userId).update({
   "GoalsMade": firebase.firestore.FieldValue.increment(1)
  })
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

       <View style = {{alignSelf: "center", flex:1, justifyContent: "center"}}>
        <TouchableOpacity style = {styles.submitButton} onPress = {() => {
          this.submitGoal(this.state.goalName, this.state.goalDescription, this.state.timeSpendedOnGoalPerWeek);
        }}>
          <Text style = {styles.submitText}> Submit </Text>
        </TouchableOpacity>
       </View>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  goalTextInputs:{

  },
  submitButton:{

  },
  submitText:{

  },
})