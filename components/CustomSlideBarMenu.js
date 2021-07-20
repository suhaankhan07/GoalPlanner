import React from 'react';
import { View, TouchableOpacity,Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import {DrawerItems} from 'react-navigation-drawer';


export default class CustomSlideBarMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      fullName: "",
      docId: ""
    }
  }

   getUserProfile = (userId) => {
    db.collection('users').where('Email_Address', '==', userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        var data = doc.data();
        this.setState({
          fullName: data.FirstName + "" + data.LastName,
          docId: doc.id,
          image: data.Image
        })
      })
    })
   }

   selectPicture = async () => {
    const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.ALL,
       allowEditing: true,
       aspect: [4,3],
       quality: 2,
      })
      if(!cancelled) this.updateProfilePicture(uri)
    }

    updateProfilePicture = (uri) => {
     db.collection('users').doc(this.state.docId).update({
       Image: uri
     })
    }

   componentDidMount = () => {
     this.getUserProfile(this.state.userId);
   }

    render() {
        return(
        <View style = {{flex:1}}>
          <View style = {{flex: 0.5, borderColor: 'red', backgroundColor: "white", borderWidth: 2, alignSelf: 'center', justifyContent: "center"}}>
           <Avatar 
            rounded
            icon = {{name = "user", type = "font-awesome"}}
            source = {{
             uri: this.state.image
            }}
            size = "small"
            overlayContainerStyle = {{backgroundColor: "white"}}
            onPress = {() => this.selectPicture()}
            activeOpacity = {0.8}
            containerStyle = {{flex:0.75,width:'60%',height:'30%'}}
           />
           <Text style = {{marginTop: 20, fontWeight: "900", fontSize: 23, alignSelf: "center"}}> {this.state.fullName} </Text>
          </View>

          <View style = {{flex:0.8}}>
            <DrawerItems {...this.props}/> 
          </View>
          
         <View style = {{flex:0.7}}> 
           <TouchableOpacity style = {styles.logoutButton} 
            onPress = {() => {
             this.props.navigation.navigate('WelcomeScreen')
             firebase.auth().signOut();
            }}
           >
             <Text style = {styles.logoutText}> Log out </Text>
           </TouchableOpacity>
         </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  logoutButton:{

  },
  logoutText:{

  },
})