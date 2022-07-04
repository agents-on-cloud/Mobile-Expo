import React, { useState, useCallback, useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, SafeAreaView,ScrollView,Pressable,ImageBackground,BackHandler,StyleSheet,Alert } from 'react-native';
import Tasks from '../Dashboard/components/Tasks.js'
import Appointment from '../Dashboard/components/Appointments.js'
import Billing from '../Dashboard/components/Billing.js'
import AppointmentManager from '../Dashboard/components/AppointmentManager'
import {selectedHandler} from '../FinalLayout/store-finalLayout'
import { useFocusEffect } from '@react-navigation/native';
import {closeMenue,closeModalHandler,saveProviderId} from './store-dashboard'
import NotificationCarousel from './components/NotificationCarousel'
import BillingProvider from '../Dashboard/components/BillingProvider'
import AppointmentReceptionist from './components/AppointmentsReceptionist'
import AppontmentModal from './components/AdditionalAppontmentModal'
import FullViewApp from './components/FullViewApp'
import axios from 'axios'
import requestRebuilder from '../requestRebuilder  '
import {dueDateHandler} from '../HR/store-Hr'

function Dashboard({navigation}) {
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch((dueDateHandler()))
      createProviderId()
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go Exist the App?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        
        return () => backHandler.remove();
    
    }, [])
  );
 async function createProviderId() {
    console.log('dashboardStore.userToken.userId',dashboardStore.userToken.userId);
    try {
      await axios(requestRebuilder('providers','/providers','post',{userId: dashboardStore.userToken.userId})).then((results)=>dispatch(saveProviderId(results.data)) )
      console.log('inside tryyyyy');
    } catch (error) {
      console.log('inside error',error);
    }
   
  
    
  }
function closeALLmodals() {
  dispatch(closeMenue())
  dispatch(closeModalHandler())
}
    return (
        <View  >
        <ScrollView  >
        <Pressable onPress={()=>closeALLmodals() }>
        <ImageBackground imageStyle={ styles.image} style={styles.imgBackgRound}  source={require('../assests/HeaderBackground.png')} resizeMode="cover"  >
        <Tasks navigation={navigation}/>
        <NotificationCarousel navigation={navigation}/>
        </ImageBackground>
        {dashboardStore.userToken.profileType?.toLowerCase() =="manager"      &&  <AppointmentManager navigation={navigation} />}
        {dashboardStore.userToken.profileType?.toLowerCase() =="provider"     &&  <Appointment navigation={navigation} />}
        {dashboardStore.userToken.profileType?.toLowerCase() =="receptionist" &&  <AppointmentReceptionist navigation={navigation} />}
        {dashboardStore.userToken.profileType?.toLowerCase() =="manager"      &&  < Billing navigation={navigation} />}
        {dashboardStore.userToken.profileType?.toLowerCase() =="provider"     &&  < BillingProvider navigation={navigation} />}
        </Pressable>
        </ScrollView  >
       {dashboardStore.modalVisible && <AppontmentModal  />}
       {dashboardStore.FullViewAppFlag && <FullViewApp  />}
        </View>
    );};
  const styles = StyleSheet.create({
    imgBackgRound:{
      borderBottomWidth:.3,borderBottomRightRadius:20,borderBottomLeftRadius:20,borderColor:'grey', shadowColor: "#000",
      shadowOffset: {width: 5, height: 12,},shadowOpacity: 0.54,shadowRadius: 16.00,elevation: 24
    },
    image:{
      borderBottomRightRadius:20,borderBottomLeftRadius:20
    }
  
  });

export default Dashboard