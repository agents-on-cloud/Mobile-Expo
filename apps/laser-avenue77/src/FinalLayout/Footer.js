
import  React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {settingsHandler,componentsLoaderHandler,selectedHandler } from './store-finalLayout'
import { useDispatch, useSelector } from 'react-redux';
import {openCollaborateHandler} from '../FinalLayout/store-finalLayout'


 function Layout() {
  const layoutSore = useSelector(state => state.finalLayoutStore);
  const dispatch = useDispatch();


    const navigation = useNavigation();

    function homeHandler() {
        dispatch( selectedHandler(0))
        dispatch(componentsLoaderHandler())
        setTimeout(() => {
          navigation.navigate('Dashboard')
          dispatch(componentsLoaderHandler())
        }, 200);
     
    }

    function notificationHandler(){
      dispatch( selectedHandler(2))
        dispatch(componentsLoaderHandler())
        setTimeout(() => {
          navigation.navigate('test')
          dispatch(componentsLoaderHandler())
        }, 200);
      

    }

    function tasksHandler(){
      dispatch( selectedHandler(1))
      dispatch(componentsLoaderHandler())

      setTimeout(() => {
    navigation.navigate('TasksLandingPage')
        dispatch(componentsLoaderHandler())
      }, 200);
 

  }
  function settingHandler() {
    dispatch( selectedHandler(3))
    dispatch(componentsLoaderHandler())
    setTimeout(() => {
      dispatch(settingsHandler())
      dispatch(componentsLoaderHandler())
    }, 200);
 
  }

  function CollaborateHandler() {
    dispatch(openCollaborateHandler())
  }
  return (
<View >
  <View >


<TouchableOpacity
        style={styles.Homebutton}
        onPress={homeHandler}
      >
      <Icon name="home"  style={styles.qrcodeIcon} />
        {/* <Text bold>Home</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.QrButton}
      >
      <Icon name="qrcode"  style={styles.qrcodeIcon} />
      <Text bold style={styles.cameraIcon} >QR</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.Collabratebutton}
      onPress={()=>CollaborateHandler()}
      >
        
      <Icon name="window-restore"  style={styles.qrcodeIcon} />
      </TouchableOpacity>
  
      </View>

</View>
  );
}

const styles= StyleSheet.create({
  cameraIcon:{
fontSize:15,
paddingLeft:48,

// paddingTop:'20%'
  },
  qrcodeIcon:{
    fontSize:35,
    paddingLeft:45,
    paddingTop:10
      },
  container:{
width:'100%',
flexDirection:'row',
backgroundColor:'transparent'
  },



  

  QrButton:{
    width:'30%',
    height:70,
    borderTopLeftRadius:60,
    borderTopRightRadius:60,
    backgroundColor:'red',
    position:'absolute',
    bottom:0,
    left:'35%',
    backgroundColor:'#DBD8E3',
    // borderWidth:1,
    borderColor:'#11567C'

  },

  Collabratebutton:{
    width:'35%',
    height:50,
    position:'absolute',
    borderTopLeftRadius:100,
    right:0,
    bottom:0,
    backgroundColor:'#E4E4E4',
    // borderWidth:.5,
    borderColor:'#11567C'

  },
  Homebutton:{
    borderTopRightRadius:100,
    width:'35%',
    height:50,
    position:'absolute',
    left:0,    bottom:0,
    backgroundColor:'#E4E4E4',
    // borderWidth:.5,
    borderColor:'#11567C',
    shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24, 

  }


})
  //  ////

export default Layout