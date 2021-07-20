import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text,TextInput, Alert, FlatList, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import MyHeader from '../../components/MyHeader';
import db from '../../config';
import firebase from 'firebase';

export default class MyGoals extends React.Component {
 constructor () {
  super();
  this.state = {
    fullName: "",
    email: "",
    docId: "",
    allGoals : [],
    editable:false,
  }
  this.goalsRef = null;
 }


getGoalsDetails = (email) => {
 this.setState({
  email: firebase.auth().currentUser.email,
 });

 db.collection('users').where("Email_Address", "==", email).get()
 .then(snapshot => {
   snapshot.forEach(doc => {
     var data = doc.data();
     this.setState({
       fullName: data.FirstName + "" + data.LastName,
       docId: doc.id,
     })
   })
 })
}

getAllGoals = () => {
 this.goalsRef = db.collection('GoalsMade').where("Email_Address", "==", this.state.email)
  .onSnapshot((snapshot) => {
    var allGoals = [];
    snapshot.docs.map((doc) => {
     var goal = doc.data()
     goal["doc_id"] = doc.id
     allGoals.push(goal);
    })
    this.setState({
      allGoals: allGoals
    })
  })
}

removeGoal = () => {
  var goal1 = this.state.goal1;

  Alert.alert("Are you sure you want to delete this goal?", "", [{text: "OK", onPress  : (
    db.collection("users").doc(this.state.docId).where("goal-1", "==", goal1).delete()
  ) }]);
}

keyExtractor = (index) => index.toString();

renderItem = ({item, i}) => {
  <ListItem 
   key = {i}
   title = {item.GoalName}
   titleStyle = {{color:"black", fontSize:25, fontWeight: "bold"}}
   subtitle = {item.GoalDescription}
   subtitleStyle = {{color:"gray", fontSize:15}}
   leftComponent = {<Icon name = "books" type = "font-awesome" color = "#696969"/>}
   rightComponent = {
    <TouchableOpacity style = {[
      styles.rightButton,
      {
        backgroundColor: item.GoalA === true ? "green" : "red"
      }
    ]} 
     onPress = {() => {
       this.props.navigation.navigate("GoalsScreen")
     }}
    >
     <Text style = {styles.rightButtonText}>  
       {item.GoalAcheived === true ? "Goal Acheived" : "Working on goal" }
     </Text>
    </TouchableOpacity>}
   
   bottomDivider
  />
}

componentDidMount = () => {
  this.getGoalsDetails(this.state.email);
  this.getAllGoals(this.state.email);
}

componentWillUnmount = () => {
  this.goalsRef();
}

 

    render() {
        return(
         <View>
          <ScrollView style = {{width:"100%"}}>
           <MyHeader title  = "My Goals!" navigation = {this.props.navigation} />

           <Text style = {{fontSize: 25, color: "red", fontWeight: "bold"}}> {this.state.fullName} </Text>

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

          <View style = {{alignSelf:"center,"}}>
            {
            this.state.allGoals.length === 0 
            ?(
              <View style = {{flex:0.9}}>
                 <Text style = {{fontSize:20, fontWeight: "300", color: "red"}}> 
                   There are no goals made in this account
                </Text> 
              </View>
             )
             :(
               <FlatList
                keyExtractor = {this.keyExtractor}
                data = {this.state.allGoals}
                renderItem = {this.renderItem}
               />
             )
            }
          </View>
          </ScrollView> 
         </View>
        )
    }
}

const styles = StyleSheet.create({
 addGoalButton:{

 },
 addGoalText:{

 },
 removeGoalButton:{

 },
 removeGoalText:{

 },
 rightButton:{

 },
 rightButtonText:{

 },
});