import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ListItem, Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import SwipeableFlatListView from '../components/SwipeableFlatListView';
import firebase from 'firebase';
import db from '../config';


export default class Notification extends React.Component {
 constructor (props) {
  super(props);
  this.state = {
   userId : firebase.auth().currentUser.email,
   allNotifications: [],
  }
  this.notificationRef = null;
 }

 getNotifications = (userId) => {
  this.notificationRef = db.collection('notifications')
  .where("notification_status", "==", "unread")
  .where("Email_Address", "==", userId)
  .onSnapshot((snapshot) => {
   var allNotifications = []
    snapshot.docs.map((doc) => {
     var notification = doc.data();
     notification["doc_id"] = doc.id;
     allNotifications.push(notification);

     this.setState({
      allNotifications: allNotifications
     });
    });
  });
 };

 componentDidMount = () => {
  this.getNotifications(this.state.userId);
 }

 componentWillUnmount = () => {
  this.notificationRef();
 }

 keyExtractor = (index) => index.toString();

 renderItem = ({item, index}) => {
  return(
   <ListItem 
    key = {index}
    leftElement = {<Icon name = "book" type = "font-awesome" color = "#696969" />}
    title = {item.GoalName}
    titleStyle = {{color: "black", fontWeight: "bold"}}
    subtitle = {item.GoalDescription}
    bottomDivider
   />
  )
 }

 render() {
  return(
   <View style = {styles.container}>
    <View style = {{flex:1}}>
     <MyHeader title = "Notifications" navigation = {this.props.navigation}/>
    </View>
    {
     this.allNotifications.length === 0 
   ?(
    <View style = {styles.container}>
     <Text style = {styles.notificationsText}> You have no notifications  </Text>
    </View>
   )
   :(
    <SwipeableFlatListView allNotifications = {this.state.allNotifications}/>
   )  
  }
   </View>
  )
 }
}

const styles = StyleSheet.create({
 container: {
  flex:1,
  alignSelf: "center",
  justifyContent: "center",
 },
 notificationsText:{

 },
})