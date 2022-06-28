import  React,{useState,useEffect} from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import MarketingLandingPage from './Marketing/Screens/MarketingLandingPage';
import MainLandiingPage from './Layout/LandingPage'
import BillingLandingPage from './Billing/Screens/BillingLandingPage'
import ConsumersLandingPage from './Consumers/Screens/ConsumersLandingPage'
import FacilitiesLandingPage from './Facilities/Screens/FacilitiesLandingPage'
import IncidentLandingPage from './Incidient/Screens/IncidentLandingPage'
import InventoryLandingPage from './Inventory/Screens/InventoryLandingPage'
import KnowledgeBaseLandingPage from './Knowledge-Base/Screens/KnowledgeBaseLandingPage'
import PerformanceLandingPage from './Performance/Screens/PerformanceLandingPage'
import ProviderLandingPage from './Provider/Screens/ProviderLandingPage'
import ServicesLandingPage from './Services/Screens/ServicesLandingPage'
import SuppliersLandingPage from './Suppliers/Screens/SuppliersLandingPage'
import TasksLandingPage from './Tasks/Screens/TasksLandingPage'
import AppointmentLandingPage from './Appointment/Screens/AppointmentLandingPage'
import Increment from './Marketing/Screens/increment'
import Dashboard from './Dashboard/Dashboard.js'
import Layout  from './FinalLayout/Footer.js';
import Header from './FinalLayout/Header.js'
import Test from './Notification/Screens/test.js'
import Calendar from './calendar/screens/Calendar.js'
import SignIn from './CIAM/screens/Signin.js'
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './CIAM/screens/Signup.js'
import ForgetPassword from './CIAM/screens/forgetPassword.js'
import SettingsModal from './FinalLayout/SettingsModal.js'
import OttpModel from './CIAM/screens/ottpModel'
import HrProvider from './HR/screens/providerLandingPage.js'
import HrManager from './HR/screens/managerProvider.js'
import Loader1 from './Loaders/loader1'
import libraryTest from './FinalLayout/libraryTest'
import AppointmentProviderLandingPage from './Appointment/Screens/AppointmentProviderLandingPage'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import createNotification from './Notification/Screens/createNotification'
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRef } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View,TouchableOpacity } from "react-native";
import { Box, useDisclose, IconButton, Stagger, HStack, Center, NativeBaseProvider,Avatar } from "native-base";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Collaborate from './FinalLayout/collobrate.js'
import { useNavigation } from '@react-navigation/native';
import CreateTask from "./Tasks/Screens/CreateTask.js"
import TaskFullView from "./Tasks/Screens/TaskFullView.js"
import QuickActions from './FinalLayout/QuickActions.js'
import {isQuickActionsOpenHandler,drawerHandler} from './FinalLayout/store-finalLayout.js'
import SearchSreen from './Search/SearchSreen.js'
import HeaderSearch from './FinalLayout/HeaderSearch.js'
import * as FirebaseCore from 'expo-firebase-core';         
import MyHr from './HR/screens/MyHr.js'                                   
const Stack = createNativeStackNavigator();

/////////////////////////////////////////////////////
  function App() {  
    
    // const deviceId = Expo.Constants.deviceId;
    const layoutSore = useSelector(state => state.finalLayoutStore);
    const dispatch = useDispatch();
    const [drawerState,setDrawerState] =useState('locked-closed')
    const navigationRef = useNavigationContainerRef(); 
    const drawer = useRef(null);
    const {
      isOpen,
      onToggle
    } = useDisclose();
    const dashboardStore = useSelector(state => state.dashboard);
    const ciamStore = useSelector(state => state.ciamStore);
    const navigationView = () => {
    return(
    <View style={[styles.container, styles.navigationContainer]}>
    <View style={{position:'absolute' ,top:100}}>
      <Center>
    <Avatar  size="80px" source={{
      uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
    }} />
    </Center>
   <Text style={{fontSize:20,color:'black'}}> {dashboardStore.userToken.firstName} {' '}{dashboardStore.userToken.middleName} {dashboardStore.userToken.lastName}</Text>
   <Text style={{fontSize:14,color:'grey',justifyContent:'center',alignItems:'center',alignContent:'center',textAlign:'center'}}> {dashboardStore.userToken.email}</Text>
   </View>
   <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginTop:190}}>
   <View >
   <TouchableOpacity onPress={() => {navigationRef.navigate('MyHr')
   drawer.current.closeDrawer()
  }} style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10, shadowColor: "#000",
   shadowOffset: {
   width: 0,
   height: 12,
   },
   shadowOpacity: 0.58,
   shadowRadius: 16.00,
   elevation: 24,}} >
  <Icon style={{fontSize:35,color:'#1EA0BD'}} name="badge-account-horizontal"/>
  <Text > My HR .</Text>
  </TouchableOpacity>
  </View>
  <View >
{ dashboardStore.userToken.profileType?.toLowerCase() =="manager" && <TouchableOpacity style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10,  shadowColor: "#000",
shadowOffset: {
width: 0,
height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
elevation: 24,}} >
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="kodi"/>
 <Text >Clinic HR</Text>
 </TouchableOpacity>}
 </View>
 <View >
 <TouchableOpacity style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',alignItems:'center',margin:10,  shadowColor: "#000",
shadowOffset: {
width: 0,
height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
elevation: 24,borderRadius:10}}>
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="clipboard-text-multiple-outline"/>
 <Text >Activity</Text>
 </TouchableOpacity >
 </View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('SignIn')
 drawer.current.closeDrawer()}}  style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',alignItems:'center',margin:10,borderRadius:10,shadowColor: "#000",
 shadowOffset: {
 width: 0,
 height: 12,
 },
 shadowOpacity: 0.58,
 shadowRadius: 16.00,
 elevation: 24,}} >
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="logout"/>
 <Text >Logout</Text>
 </TouchableOpacity> 
 </View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('SignIn')
 drawer.current.closeDrawer()}}  style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',alignItems:'center',margin:10,borderRadius:10,shadowColor: "#000",
 shadowOffset: {
 width: 0,
 height: 12,
 },
 shadowOpacity: 0.58,
 shadowRadius: 16.00,
 elevation: 24,}} >
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="cog-outline"/>
 <Text >Settings</Text>
 </TouchableOpacity>
 </View>
 </View>
 </View>
     )}
      ;
         return (
          <>
          <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition={"right"}
          renderNavigationView={navigationView}
          drawerLockMode = {layoutSore.drawerFlag}
          >
          <NavigationContainer ref={navigationRef}>
          <QuickActions />
          <Collaborate/>
          {layoutSore.searchFlag==false &&layoutSore.loginFlag && <Header  drawHandler={drawer} />}
          { <Header  drawHandler={drawer} />}
          {layoutSore.searchFlag==true && <HeaderSearch   />}
          {layoutSore.componentsLoader  && <Loader1  />}
           <Stack.Navigator  screenOptions={{headerShown: false }}>
           <Stack.Screen name="MyHr" component={MyHr} />
          {<Stack.Screen name="Dashboard" component={Dashboard}/>}
          {<Stack.Screen name="SignIn" component={SignIn}/>}
          {<Stack.Screen name="libraryTest" component={libraryTest}/>}
          <Stack.Screen name="MainLandingPAge" component={MainLandiingPage} />
          <Stack.Screen name="HrManager" component={HrManager}   />
          <Stack.Screen name="HrProvider" component={HrProvider}   />
          <Stack.Screen name="SignUp" component={SignUp}   />
          <Stack.Screen name="forgetPassword" component={ForgetPassword}   />
          <Stack.Screen name="MarketingLandingPage" component={MarketingLandingPage} />
          <Stack.Screen name="BillingLandingPage" component={BillingLandingPage} />
          <Stack.Screen name="ConsumersLandingPage" component={ConsumersLandingPage} />
          <Stack.Screen name="FacilitiesLandingPage" component={FacilitiesLandingPage} />
          <Stack.Screen name="IncidentLandingPage" component={IncidentLandingPage} />
          <Stack.Screen name="InventoryLandingPage" component={InventoryLandingPage} />
          <Stack.Screen name="KnowledgeBaseLandingPage" component={KnowledgeBaseLandingPage} />
          <Stack.Screen name="PerformanceLandingPage" component={PerformanceLandingPage} /> 
          <Stack.Screen name="ProviderLandingPage" component={ProviderLandingPage} />
          <Stack.Screen name="ServicesLandingPage" component={ServicesLandingPage} />
          <Stack.Screen name="SuppliersLandingPage" component={SuppliersLandingPage} />
          <Stack.Screen name="TasksLandingPage" component={TasksLandingPage}  options={{title:'Tasks'}} />
          <Stack.Screen name="AppointmentLandingPage" component={AppointmentLandingPage} options={{title:'Appointments'}} />
          <Stack.Screen name="calendar" component={Calendar}   />
          <Stack.Screen name="searchSreen" component={SearchSreen}   />
          <Stack.Screen name="AppointmentProviderLandingPage" component={AppointmentProviderLandingPage}   />
         {/* /* /////////////////////Billing/////////////////////////////////////// */ }
       






         {/* //////////////////////////////////////////////////////////////////// */}
         {/* /////////////////////Tasks////////////////////////////////////////// */}
         <Stack.Screen name="createTask" component={CreateTask} options={{title:'Tasks'}} />
         <Stack.Screen name="TaskFullView" component={TaskFullView} />







         {/* /////////////////////////////////////////////////////////////////////// */}
         {/* /////////////////////Appointment/////////////////////////////////////// */}







         {/* //////////////////////////////////////////////////////////////////// */}
         {/* /////////////////////Provider/////////////////////////////////////// */}







         {/* //////////////////////////////////////////////////////////////////// ////*/}
         {/* /////////////////////Notification/////////////////////////////////////// */}
         <Stack.Screen name="test" component={Test} options={{title:'Notifications'}} />
         <Stack.Screen name="createNotification" component={createNotification} />






         {/* //////////////////////////////////////////////////////////////////// /*/}
         {/* /////////////////////Marketing/////////////////////////////////////// */}
         <Stack.Screen name="increment" component={Increment} />


     


         {/* ////////////////////////////////////////////////////////////////////// */}
         {/* /////////////////////Human resources/////////////////////////////////////// */}
      


     


         {/* ////////////////////////////////////////////////////////////////////// */}
          </Stack.Navigator> 
          { layoutSore.componentsLoader==false &&<>
          { layoutSore.settingsFlag && < SettingsModal/>}
          { ciamStore.ottpFlag && < OttpModel/>}
       {/* <View style={{marginBottom:50}}></View> */}
          {layoutSore.searchFlag==false && layoutSore.loginFlag &&<Layout/>}
          {/* {<Layout/>} */}
          </>}
  {layoutSore.searchFlag==false &&  layoutSore.loginFlag  &&     <HStack  justifyContent="center">
<IconButton bg={'#7F8487'} shadow={9} w="50" h="50" style={{position:'absolute',left:20,bottom:70}} variant="solid" borderRadius="full" size="lg" onPress={()=>dispatch(isQuickActionsOpenHandler())}  icon={<Icon  style={{fontSize:30,color:'#23C1E4'}}  name="flash-outline" color="warmGray.50" _dark={{
color: "warmGray.50"
}} />} />
</HStack>}
</NavigationContainer>
</DrawerLayoutAndroid>
          </>
    );
  }

  const styles = StyleSheet.create({
    collaborateBtns:{
   width:100,
   height:50,
   backgroundColor:"#ecf0f1",
   justifyContent:'center',
   alignItems: "center",
   marginBottom:10,
   borderColor:'black',
   borderWidth:0.5

    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    navigationContainer: {
      backgroundColor: "#ecf0f1"
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: "center"
    }
  });

  export default App


