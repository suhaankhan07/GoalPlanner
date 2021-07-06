import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class Welcome extends React.Component {
    constructor () {
     super();
     this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        isModalVisible : false,
    }
}

 handleEmail = (text) => {
     this.setState({
         password:text
     });
 }

 handlePassword = (text) => {
     this.setState({
         email:text
     });
 }

 handleFirstName = (text) => {
   this.setState({
     firstName:text
   });
 }
 
 handleLastName = (text) => {
  this.setState({
    lastName:text
  });
} 

handlePhoneNumber = (text) => {
  this.setState({
    phoneNumber:text
  });
} 

handleAddress = (text) => {
  this.setState({
    address:text
  });
} 

handleConfirmPassword = (text) => {
  this.setState({
    confirmPassword:text
  });
}

  userSignup = (email,password,confirmPassword) => {
    if(password !== confirmPassword) {
     return Alert.alert("Your confirmed password does not match with the password you entered")
    } else {
      firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()  => {
      db.collection('users').add({
        "FirstName":this.state.firstName,
        "LastName":this.state.lastName,
        "Contact":this.state.phoneNumber.trim(),
        "Address":this.state.address,
        "Email_Address":this.state.email,
        "ProfileUpdated": false,
})
    return Alert.alert(
     'User Added Sucsessfully',
     "The user has sucsessfully registered.",
     [
       {text: 'OK', onPress : () => this.setState({isModalVisible:false})},
    ]
    );
  })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    });
   }
  }

  userLogin = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => {
     this.props.navigation.navigate("MyGoals")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(errorMessage)
    })
  }

  showModal = () => {
    return(
      <Modal
       animationType = "fade"
       transparent = {true}
       visible = {this.state.isModalVisible}
       >
       
        <View style = {{alignSelf:'center',justifyContent:'center',flex:1,backgroundColor:'lightblue'}}>
          <ScrollView style = {{width:'100%'}}>
            <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
               <Text style = {styles.modalTitle}> Signup now! </Text>
              <TextInput 
               style = {styles.modalTextInput}
               placeholder = "First Name"
               placeholderTextColor = "purple"
               multiline = {false}
               keyboardType = {"default"}
               keyboardAppearance = "light"
               onChangeText = {this.handleFirstName}
              />
               <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Last Name"
               placeholderTextColor = "purple"
               multiline = {false}
               keyboardType = "default"
               keyboardAppearance = "light"
               onChangeText = {this.handleLastName}
              />
               <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Phone-Number"
               placeholderTextColor = "purple"
               multiline = {false}
               maxLength = {10}
               keyboardType = {'numeric'}
               keyboardAppearance = "light"
               onChangeText = {this.handlePhoneNumber}
              />
               <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Mailing Address"
               placeholderTextColor = "purple"
               multiline = {false}
               keyboardType = "default"
               keyboardAppearance = "light"
               onChangeText = {this.handleAddress}
              />
              <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Email"
               placeholderTextColor = "purple"
               multiline = {false}
               keyboardType = {"email-address"}
               keyboardAppearance = "light"
               onChangeText = {this.handleEmail}
              />
              <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Enter Password"
               placeholderTextColor = "purple"
               multiline = {false}
               secureTextEntry = {true}
               keyboardAppearance = "dark"
               onChangeText = {this.handlePassword}
              />
            
              <TextInput 
               style = {styles.modalTextInput}
               placeholder = "Confirm Password"
               placeholderTextColor = "purple"
               multinline = {false}
               secureTextEntry = {true}
               keyboardAppearance = "dark"
               onChangeText = {this.handleConfirmPassword}
              />
        
            <View style = {styles.modalContainer}>
              <TouchableOpacity style = {styles.modalRegisterButton} 
               onPress = {() => {
                 this.userSignup(this.state.email,this.state.password,this.state.confirmPassword)
              }}>
                <Text style = {styles.modalRegisterText}> Register </Text>
              </TouchableOpacity>
            </View>
 
            <View style = {styles.modalContainer}>
             <TouchableOpacity style = {styles.modalCancelButton} onPress = {() => {
               this.setState({
                 modalVisible: false,
               })
             }}>
              <Text style = {styles.modalCancelText}> Back </Text>
             </TouchableOpacity>
            </View>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

    render() {
        return(
            <View style = {styles.container}> 

            {this.showModal()}

             <View>
              <Text style = {{fontSize:35, alignSelf:'center',fontWeight:'bold',textShadowColor:'red',textShadowRadius:3,color:'black',marginTop:19}}>
                GoalAimer
               </Text> 
               
                 <Image source = {require("../assets/Logo.png")} style = {{width: 50, height: 50,marginTop:-48,marginLeft:235}}  />
               </View>

              <View style = {{alignSelf:'cetner',flex:1,}}>
              <Text style = {{fontSize:25, alignSelf:'center',fontWeight:'bold',color:'red'}}>
                You can acheive anyting
               </Text> 
               </View> 

          

            <View style = {styles.container}>
              <TextInput
               style = {styles.emailInput}
               placeholder = "abc@example.com"
               placeholderTextColor =  'purple'
               keyboardType = "email-address"
               keyboardAppearance = 'light'
               onChangeText = {this.handleEmail}
             /> 
             <TextInput 
              style = {styles.passwordInput}
              placeholder = "Password"
              placeholderTextColor = 'purple'
              keyboardType = 'email-address'
              keyboardAppearance = 'light'
              secureTextEntry = {true}
              onChangeText = {this.handlePassword}
             />
  
             <TouchableOpacity style = {styles.loginButton} 
              onPress = {() => {
              this.userLogin(this.state.email,this.state.password)
             }}>
              <Text style = {styles.welcomeText}>
                Login
              </Text>
             </TouchableOpacity>

             <Text style = {{margin:10, fontSize:18, fontWeight:'bold',color:'black',alignSelf:'center'}}> OR </Text>

             <TouchableOpacity style = {styles.signupButton}
              onPress = {() =>
               this.setState({
                 isModalVisible:true
               })
               }>
              <Text style = {styles.welcomeText}>
                Signup
              </Text>
             </TouchableOpacity>
             </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    alignSelf:"center",
    justifyContent:"center",
    backgroundColor:'white',
    margin:29,
   },
    emailInput:{
     width:180,
     height:30,
     alignSelf:'center',
     fontSize:15,
     textShadowRadius: 3,
     textShadowColor:'white',
     borderColor:'#FF8C00',
     borderBottomWidth:2
    },
    passwordInput:{
     width:180,
     height:30,
     alignSelf:'center',
     fontSize:15,
     textShadowRadius: 3,
     textShadowColor:'white',
     borderColor:'#FF8C00',
     borderBottomWidth:2,
     marginTop:15,
    },
    loginButton:{
     backgroundColor:'#ffd700',
     marginTop:15,
     width:150,
     height:35,
     alignSelf:'center',
     justifyContent:'center',
     borderRadius: 15,
     borderColor:'red',
     borderWidth:2,
     shadowColor: '#000',
     shadowOffset: {
       width:0,
       height:4,
     },
    },
    signupButton:{
     backgroundColor:'#ffd700',
     marginTop:10,
     width:150,
     height:35,
     alignSelf:'center',
     justifyContent:'center',
     borderRadius: 15,
     borderColor:'red',
     borderWidth:2,  
     shadowColor: '#000',
     shadowOffset: {
       width:0,
       height:4,
     },
    },
    welcomeText:{
     color:'white',   
     fontSize:16,
     fontWeight:'bold',
     alignSelf:'center',
     textShadowColor:'black',
     textShadowRadius:4,
    },
    keyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignSelf:'center',
    },
    modalTitle:{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:30,
      fontWeight:'bold',
      color:'#ff5722',
      textShadowColor:'black',
      textShadowRadius:1,
      margin:38
    },
    modalTextInput:{
      width:'75%',
      height:35,
      alignSelf:'center',
      justifyContent:'center',
      borderColor:'red',
      borderWidth:1,
      borderRadius:15,
      marginTop:19,
      padding:10,
      backgroundColor:'white'
    },
    modalContainer:{
     justifyContent:'center',
     alignSelf:'center',
     flex:1,
     marginTop:10,
    },
    modalRegisterButton:{
     backgroundColor:'white',
     alignSelf:'center',
     justifyContent:'center',
     width:150,
     height:40,
     borderColor:'black',
     borderWidth:2,
     borderRadius:15,
     margin:10,
    },
    modalRegisterText:{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:20,
      fontWeight:'bold',
      color:'#ff5722',
      margin:10
    },
    modalCancelButton:{
      backgroundColor:'white',
      alignSelf:'center',
      justifyContent:'center',
      width:150,
      height:40,
      borderColor:'black',
      borderWidth:2,
      borderRadius:15
    },
    modalCancelText:{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:20,
      fontWeight:'bold',
      color:'#ff5722',
      margin:10
    },
})