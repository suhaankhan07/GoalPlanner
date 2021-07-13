import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import { ListItem} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatListView extends React.Component {
 constructor (props) {
  super(props);
  this.state = {
    allNotifications : this.props.allNotifications,
  }
 }

 updateMarkAsRead = (notification) => {
  db.collection('notifications').doc(notification.doc_id).update({
   "notification_status": "read"
  })
 }

 closeRow = (item, key) => {
  if (item[key]) {
    item[key].closeRow();
  }
 }

 deleteRow = (item, key) => {
  var allNotifications = this.state.allNotifications;
  this.closeRow(item, key);
  const newData = [...allNotifications];
  const prevIndex = allNotifications.findIndex(item => item.key = key )
  this.updateMarkAsRead(allNotifications[prevIndex]);
   newData.splice(prevIndex, 1)
  this.setState({
    allNotifications: newData,
  })
 }

 onRowDidOpen = key => {
  console.log("Row has opened", key)
 }

 renderItem = data => (
  <TouchableHighlight>
    <ListItem 
     leftElement = {<Image source = {require("../assets/Logo.png")} style = {{width:20, height: 20}}/>}
     title = {data.item.GoalName}
     titleStyle = {{color: "black", fontSize: 20, fontWeight: 'bold'}}
     subtitle = {data.item.GoalDescription}
     bottomDivider
    />
  </TouchableHighlight>   
 );

 renderHiddenItem = (data, item) => {
  <View style = {styles.container}>
    <Text style = {styles.rowBack}> Left </Text>
     <TouchableOpacity style = {[styles.backRightBtn, styles.backRightBtnLeft]}
      onPress = {() => this.closeRow(item, data.item.key)}
     >
     <Text style = {styles.backTextWhite}> Close </Text>   
     </TouchableOpacity>
     <TouchableOpacity 
      style = {[styles.backRightBtn, styles.backRightBtnRight]}
      onPress = {() => this.deleteRow(item, data.item.key)}
     >
      <Text style = {styles.backTextWhite}> Mark as Read </Text>
     </TouchableOpacity>
  </View>
 }

 render() {
  return(
   <View> 
    <SwipeListView 
     data = {this.state.allNotifications}
     renderItem = {this.renderItem}
     renderHiddenItem = {this.renderHiddenItem}
     leftOpenValue = {75}
     rightOpenValue = {-150}
     previewKey = {'0'}
     previewOpenValue = {-40}
     previewOpenDelay = {3000}
    />     
   </View>
  )
 }
}

const styles = StyleSheet.create({
 container:{
  backgroundColor: 'white',
  flex: 1,
 },
 backTextWhite: {
    color: '#FFF',
},
rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
},
rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
},
})