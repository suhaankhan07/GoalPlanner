import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text,TextInput, Alert, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class MyGoals extends React.Component {
 constructor () {
  super();
  this.state = {
    email: "",
    goal1: "",
    goal2: "", 
    goal3: "",
    goal4: "", 
    goal5: "",
    editable:false,
    docId: "",
  }
 }

handleAddedGoal = (text) => {
  this.setState({
    goal1:text,
  })
}

handleEditedGoal = (text) => {
    this.setState({
      savedGoal:text,
    })
  }  

getGoal = () => {
 this.setState({
  email: firebase.auth().currentUser.email,
 });

 var email = this.state.email;

 db.collection('users').where("Email_Address", "==", email).get()
 .then(snapshot => {
   snapshot.forEach(doc => {
     var data = doc.data();
     this.setState({
       goal1: data.Goal-1,
       goal2: data.Goal-2,
       goal3: data.Goal-3,
       goal4: data.Goal-4,
       goal5: data.Goal-5,
       docId: doc.id,
     })
   })
 })
}

removeGoal = () => {
  var email = this.state.email; 
  var goal1 = this.state.goal1;

  Alert.alert("Are you sure you want to delete this goal?", "", [{text: "OK", onPress  : (
    db.collection("users").doc(this.state.docId).where("Goal-1", "==", goal1).delete()
  ) }]);
}

componentDidMount = () => {
  this.getGoal();
}

    render() {
        return(
         <View>
          <ScrollView style = {{width:"100%"}}>
           <MyHeader title  = "Set your own goal" navigation = {this.props.navigation} />
          <TouchableOpacity style = {styles.addGoalButton} onPress = {() => {
            this.props.navigation.navigate('CreateGoals')
          }}> 
            <Text style = {styles.addGoalText}> Add Goal </Text>    
          </TouchableOpacity>    

          <TouchableOpacity style = {styles.removeGoalButton} onPress = {() => {
           this.removeGoal();
          }}> 
            <Text style = {styles.removeGoalText}> Remove Goal </Text>    
          </TouchableOpacity>  

          <TouchableOpacity style = {styles.changeGoalButton} onPress = {() => {
             this.setState({editable:true});
          }}> 
            <Text style = {styles.changeGoalText}> Edit Goal </Text>    
          </TouchableOpacity>  
        
          <TextInput 
           placeholder = "Change Goal"
           placeholderTextColor = "red"
           keyboardType = {"default"}
           editable = {this.state.editable}
           onChangeText = {this.handleEditedGoal}
           value = {this.state.savedGoal}
          />
          </ScrollView> 
         </View>
        )
    }
}

const styles = StyleSheet.create({
 addInput:{

 },
 addGoalButton:{

 },
 addGoalText:{

 },
 removeGoalButton:{

 },
 removeGoalText:{

 },
});