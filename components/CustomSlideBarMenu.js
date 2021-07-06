import React from 'react';
import { View, TouchableOpacity,Text, StyleSheet } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomSlideBarMenu extends React.Component {
    render() {
        return(
        <VIew style = {{flex:1}}>
            <DrawerItems {...this.props}/> 
         <View style = {{flex:0.8}}> 
           <TouchableOpacity style = {styles.logoutButton} 
            onPress = {() => {
             this.props.navigation.navigate('WelcomeScreen')
            }}
           >
             <Text style = {styles.logoutText}> Log out </Text>
           </TouchableOpacity>
         </View>
        </VIew>
        )
    }
}

const styles = StyleSheet.create({
  logoutButton:{

  },
  logoutText:{

  },
})