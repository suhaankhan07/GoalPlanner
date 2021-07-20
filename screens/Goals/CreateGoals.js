import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MyHeader from '../../components/MyHeader';
import firebase from 'firebase';
import db from '../../config';

export default class CreateGoals extends React.Component {
 constructor () {
  super();
  this.state  = {
    userId: firebase.auth().currentUser.email,
    goalName: "",
    goalDescription: "",
    timeSpendedOnGoalPerWeek: "",
    
  }
 }

 createUniqueId = () => {
   return Math.random().toString(7).substring(36)
 }

 submitGoal = (goalName, goalDescription, goalTime) => {
  var randomRequestId = this.createUniqueId();
  var userId = this.state.userId;

  db.collection('GoalsMade').add({
   GoalName: goalName,
   GoalDescription: goalDescription,
   GoalTime: goalTime,
   GoalAcheived: false, 
   RequestID: randomRequestId,
  }),
  db.collection('GoalsMade').where("Email_Address", "==", userId).update({
   GoalsMade: firebase.firestore.FieldValue.increment(1)
  })
 }

 render() {
  return(
    <View style = {{flex:1, alignSelf: "cetner", justifyContent: "center"}}>
      <View style = {{flex: 1}}>
        <MyHeader title = "Create a goal" navigation = {this.props.navigation}/>
      </View>
      <TextInput
       style = {styles.goalTextInputs, {width:250, height: 20}}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />
      
      <TextInput
       style = {styles.goalTextInputs, {width:250, height: 50}}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />
      
      <TextInput
       style = {styles.goalTextInputs, {width:150, height:15}}
       placeholder = "What's your goal?"
       placeholderTextColor = "red"
       onChangeText = {(text) => {
         this.setState({
           GoalName: text
         })
       }}
      />

       <View style = {{alignSelf: "center", flex:1, justifyContent: "center"}}>
        <TouchableOpacity style = {styles.submitButton} 
        onPress = {() => {
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
   marginTop: 20,
   padding: 2,
   borderColor: 'red',
   borderWidth: 2,
   alignSelf: "center",
   justifyContent: "center",
  },
  submitButton:{
   width:80,
   height:30,
   backgroundColor: 'orange',
   alignSelf: "center",
   justifyContent: "center", 
   borderColor:"black",
   borderWidth:2,
  },
  submitText:{
   fontWeight: 'bold',
   fontSize:23,
   color: "white",
   textShadowColor: "black",
   textShadowRadius: 2,
  },
})