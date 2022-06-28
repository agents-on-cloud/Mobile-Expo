import React, { useState, useCallback, useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, SafeAreaView,ScrollView,Pressable,ImageBackground,TouchableHighlight } from 'react-native';
import {Button} from 'native-base'
import Tasks from '../Dashboard/components/Tasks.js'
import Appointment from '../Dashboard/components/Appointments.js'
import Billing from '../Dashboard/components/Billing.js'
import HR from '../Dashboard/components/HR'
import {saveToken  } from "./store-dashboard";
import jwt_decode from "jwt-decode";
import AppointmentManager from '../Dashboard/components/AppointmentManager'
import {selectedHandler} from '../FinalLayout/store-finalLayout'
import Icon from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import {closeMenue,closeModalHandler} from './store-dashboard'
import NotificationCarousel from './components/NotificationCarousel'
import { Box, useDisclose, IconButton, Stagger, HStack, Center, NativeBaseProvider } from "native-base";
import BillingProvider from '../Dashboard/components/BillingProvider'
import AppointmentReceptionist from './components/AppointmentsReceptionist'
import AppontmentModal from './components/AdditionalAppontmentModal'
import FullViewApp from './components/FullViewApp'



function Dashboard({navigation}) {
  const {
    isOpen,
    onToggle
  } = useDisclose();
  
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();



  useFocusEffect(
    React.useCallback(() => {
      dispatch(selectedHandler(0))
  
    }, [])
  );
  

function closeALLmodals() {
  dispatch(closeMenue())
  dispatch(closeModalHandler())
}

   
  
    return (
        <View  >
        <ScrollView  >
        <Pressable onPress={()=>closeALLmodals() }>
        {/*//////////////////////////Tasks //////////////////////////////////////////////////////*/}
        <ImageBackground imageStyle={{ borderBottomRightRadius:20,borderBottomLeftRadius:20}} style={{borderBottomWidth:.3,borderBottomRightRadius:20,borderBottomLeftRadius:20,borderColor:'grey', shadowColor: "#000",
        shadowOffset: {width: 5, height: 12,},shadowOpacity: 0.54,shadowRadius: 16.00,elevation: 24}}  source={require('../assests/HeaderBackground.png')} resizeMode="cover"  >
        <Tasks navigation={navigation}/>
        {/*///////////////////////////Appontment Manager/////////////////////////////////////// /*/}
        <NotificationCarousel navigation={navigation}/>
        </ImageBackground>
        {/*///////////////////////////Appontment Manager/////////////////////////////////////// /*/}
        {dashboardStore.userToken.profileType?.toLowerCase() =="manager" &&        <AppointmentManager navigation={navigation} />}
        {/*///////////////////////////Appontment Provider/////////////////////////////////////// */}
        {dashboardStore.userToken.profileType?.toLowerCase() =="provider"    &&     <Appointment navigation={navigation} />}
        {dashboardStore.userToken.profileType?.toLowerCase() =="receptionist"   && <AppointmentReceptionist navigation={navigation} />}
        {/*///////////////////////////Billing/////////////////////////////////////////////////// */}
        {dashboardStore.userToken.profileType?.toLowerCase() =="manager" &&         < Billing navigation={navigation} />}
        {/*///////////////////////////HR//////////////////////////////////////////////////////// */}
        {dashboardStore.userToken.profileType?.toLowerCase() =="provider" &&        < BillingProvider navigation={navigation} />}
        {/*///////////////////////////HR//////////////////////////////////////////////////////// */}
        {/* <HR navigation={navigation}/> */}
         {/*//////////////////////////////////////////////////////////////////////////////////// */}
        </Pressable>
        </ScrollView  >

       {dashboardStore.modalVisible && <AppontmentModal  />}
       {dashboardStore.FullViewAppFlag && <FullViewApp  />}
  
        </View>
    );

    
  };
export default Dashboard