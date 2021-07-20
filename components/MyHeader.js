import React from 'react';
import {View} from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import db from '../config';

export default class MyHeader extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
    value: "",
   }
 }

 getNumberUnreadOfNotifications = () => {
   db.collection("notifications").where("notification_status", "==", "unread")
   .onSnapshot((snapshot) => {
     var unreadNotifications =  snapshot.docs.map((doc) => doc.data());
     this.setState({
      value: unreadNotifications,
     })
   }) 
 }
 
 componentDidMount = () => {
   this.getNumberUnreadOfNotifications();
 }

 BellIconWithBadge = () => {
   return (
     <View>
      <Icon name = "bell" type = "font-awesome" color = "gray" size = {25} 
        onPress = {() => this.props.navigation.navigate('Notifications')} />
       <Badge 
        value = {this.state.value}
        containerStyle = {{position: 'absolute', top : -4, right: -4}}
       />
     </View>
   ) 
 }

render() {
 return (
    <Header
     leftComponent = {<Icon name = "bars" type = "font-awesome" color = "gray" onPress = {() => this.props.navigation.toggleDrawer()} />}
     centerComponent = {{text: props.title, style : {color:'white',fontWeight:'bold',fontSize:20}}}
     rightComponent = {<this.BellIconWithBadge {...this.props}/>}
     backgroundColor = "lightblue"
    />
  )
 }
}