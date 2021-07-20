import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput,Text,Alert } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { TouchableHighlightBase } from 'react-native';

export default class Settings extends React.Component {
    constructor () {
     super();
     this.state = {
      email : "",
      firstName: "",
      lastName: "",
      contact: "",
      mailingAddress: "",
      docId: "",
      profileUpdated: false,
     }
    }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users').where("Email_Address", '==', email).get()
    .then(snapshot => {
     snapshot.forEach(doc => {
      var data = doc.data();
      this.setState({
        email: data.Email_Address,
        firstName: data.FirstName,
        lastName: data.LastName,
        contact: data.Contact,
        mailingAddress: data.Address,
        docId: doc.id,
      });
     });
    });
  }

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      FirstName : this.state.firstName,
      LastName : this.state.lastName,
      Contact : this.state.contact,
      Address : this.state.mailingAddress,
      ProfileUpdated: this.state.profileUpdated,
    })

  return Alert.alert(
      "Profile Updated Sucsessfully",
       "", 
     [
       {text: "OK", onPress : () => this.setState({ profileUpdated: true })},
     ]
    )};

  componentDidMount = () => {
      this.getUserDetails();
  }

    render() {
     return(
      <View>
         <View>
           <MyHeader title = "Settings" navigation = {this.props.navigation}/>
         </View>
          <TouchableOpacity style = {styles.editGoalButton}
            onPress = {() => {
             this.props.navigation.navigate('MyGoals')
            }}>  
              <Text> Edit Goals </Text>
          </TouchableOpacity>

        <View style = {{flex:1, alignSelf:"center", justifyContent: "center"}}>
         <TextInput
          style = {styles.settingsTextInputs}
          placeholder = "First Name"
          placeholderTextColor = "red"
          onChangeText = {(text) => {
            this.setState({
              firstName: text
            })
          }}
          value = {this.state.firstName}
         />

         <TextInput
          style = {styles.settingsTextInputs}
          placeholder = "Last Name"
          placeholderTextColor = "red"
          onChangeText = {(text) => {
            this.setState({
              lastName: text
            })
          }}
          value = {this.state.lastName}
         />

         <TextInput
          style = {styles.settingsTextInputs}
          placeholder = "Contact"
          placeholderTextColor = "red"
          onChangeText = {(text) => {
            this.setState({
              contact: text
            })
          }}
          value = {this.state.contact}
         />
    
         <TextInput
          style = {styles.settingsTextInputs}
          placeholder = "Address"
          placeholderTextColor = "red"
          onChangeText = {(text) => {
            this.setState({
              mailingAddress: text
            })
          }}
          value = {this.state.mailingAddress}
         />
         </View>

        <View style = {{alignSelf : 'center', flex:0.9}}>
         <TouchableOpacity style = {styles.updateProfileButton}
          onPress = {() => {
            this.updateUserDetails();
          }}
         >
          <Text style = {styles.updateProfileText}> Save </Text>
         </TouchableOpacity>

        </View>
      </View>
     )
    }
}

const styles = StyleSheet.create({
 settingsTextInputs:{

 },
 editGoalButton:{

 },
 updateProfileButton:{

 },
 updateProfileText:{

 },
})