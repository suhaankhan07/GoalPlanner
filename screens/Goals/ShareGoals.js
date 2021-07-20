import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ListItem, FlatList} from 'react-native';
import { Avatar } from 'react-native-elements';
import MyHeader from '../../components/MyHeader';
import db from '../../config';
import firebase from 'firebase';

export default class SharePlans extends React.Component {
 constructor () {
  super();
  this.state = {
   userId: firebase.auth().currentUser.email,
   allGoalsList: []
  }
  this.goalsRef = null;
 }

 getAllGoals = () => {
  this.goalsRef = db.collection("GoalsMade")
  .onSnapshot((snapshot) => {
    var allGoalsList = snapshot.docs.map((doc) => doc.data())
    this.setState({
      allGoalsList: allGoalsList
    });
  })
 }

componentDidMount = () => {
 this.getAllGoals();
}

componentWillUnmount = () => { 
  this.goalsRef();
}

keyExtractor = (index) => index.toString();

renderItem = (item, index) => {
  return (
    <ListItem 
     key = {index}
     title = {item.GoalName}
     titleStyle = {{color: "black", fontWeight: "500", fontSize: 21}}
     subtitle = {item.GoalDescription}
     subtitleStyle = {{color: "black", fontSize: 15}}
     rightElement = {
      <TouchableOpacity style = {styles.renderItemButton} 
      onPress = {() => {
        this.props.navigation.navigate("GoalsScreen", {"details": item})
      }}>
        <Text style = {{color: "#fff"}}> View </Text>
      </TouchableOpacity>
     }
     bottomDivider  
   />
   )
}
 
render() {
 return(
  <View>
   <Avatar 
    rounded
    size = 'medium'
    color = "orange"
    icon = {{name : 'Home', type : 'font-awesome' }}
    activeOpacity = {0.7}
   />
     <View style = {{flex:0.8}}> 
      <MyHeader title = "Share your goals!" navigation = {this.props.navigation}/>
     </View>
      <View style = {{flex: 1}}>
       {
         this.state.allGoalsList.length === 0?
         (
           <View> 
            <Text> There are no shared goals </Text>
           </View>
         )
         :(
          <FlatList 
          renderItem = {this.renderItem}
          data = {this.state.allGoalsList}
          keyExtractor = {this.keyExtractor}
         />
         )
       }
      </View>
    </View>
  )  
 }
}

const styles = StyleSheet.create({
  renderItemButton: {
   width: 70,
   height: 30,
   backgroundColor: "orange",
   borderColor: "black",
   borderWidth: 1,
   alignSelf: "flex-end"
  },
})