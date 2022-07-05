import  React,{useState,useEffect} from 'react';
import { ImageBackground, LogBox } from 'react-native';
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
import OttpModel from './CIAM/screens/ottpModel'
import HrProvider from './HR/screens/providerLandingPage.js'
import HrManager from './HR/screens/managerProvider.js'
import Loader1 from './Loaders/loader1'
import libraryTest from './FinalLayout/libraryTest'
import AppointmentProviderLandingPage from './Appointment/Screens/AppointmentProviderLandingPage'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import createNotification from './Notification/Screens/createNotification'
import { useRef } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View,TouchableOpacity,Image } from "react-native";
import {  useDisclose, IconButton, HStack, Center, NativeBaseProvider,Avatar } from "native-base";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Collaborate from './FinalLayout/collobrate.js'
import CreateTask from "./Tasks/Screens/CreateTask.js"
import TaskFullView from "./Tasks/Screens/TaskFullView.js"
import QuickActions from './FinalLayout/QuickActions.js'
import {isQuickActionsOpenHandler,drawerHandler} from './FinalLayout/store-finalLayout.js'
import SearchSreen from './Search/SearchSreen.js'
import HeaderSearch from './FinalLayout/HeaderSearch.js'     
import MyHr from './HR/screens/MyHr.js'                                   
const Stack = createNativeStackNavigator();

/////////////////////////////////////////////////////
  function App() {  

    const searchStore = useSelector(state => state.searchStore);
    const layoutSore = useSelector(state => state.finalLayoutStore);
    useEffect(() => {
      console.log('ppppppppp',layoutSore.searchFlag);
     
    }, [layoutSore.searchFlag])
    const dispatch = useDispatch();
    const [drawerState,setDrawerState] =useState('locked-closed')
    const navigationRef = useNavigationContainerRef(); 
    const drawer = useRef(null);
    const dashboardStore = useSelector(state => state.dashboard);
    const ciamStore = useSelector(state => state.ciamStore);
    const navigationView = () => {
    return(
    <View style={[styles.container, styles.navigationContainer]}>

   
    <View style={{width:'100%',height:'30%',position:'absolute', top:20,  flex: 1,
      alignItems: "center",
      justifyContent: "center",}}>
           <ImageBackground imageStyle={ styles.image} style={styles.imgBackgRound}  source={require('./assests/HeaderBackground.png')} resizeMode="cover">
    <Center mt={50}>
      
    <Avatar  size="80px" source={{
      uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
    }} />
   </Center>
   <Center>
   <View style={{width:'90%',height:1,backgroundColor:'white',marginTop:10}}></View>
   <Text style={{fontSize:20,color:'white',marginTop:10}}> {dashboardStore.userToken.firstName} {' '}{dashboardStore.userToken.middleName} {dashboardStore.userToken.lastName}</Text>
   </Center>
   {/* <Text style={{fontSize:14,color:'grey',justifyContent:'center',alignItems:'center',alignContent:'center',textAlign:'center'}}> {dashboardStore.userToken.email}</Text> */}
   </ImageBackground>
   </View>



   <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginTop:200}}>
   <View >
   <TouchableOpacity onPress={() => { console.log('yyy')
   
   drawer.current.closeDrawer()
  }} style={styles.DrawerWidgets} >

<Image style={{width:50,height:50}}  source={require('./assests/ssssssssssss.png')} />
  <Text > My Activity</Text>
  </TouchableOpacity>
  </View>
  <View >
{ dashboardStore.userToken.profileType?.toLowerCase() =="manager" && <TouchableOpacity style={styles.DrawerWidgets} >
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="kodi"/>
 <Text >Clinic HR</Text>
 </TouchableOpacity>}
 </View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('MyHr') ; drawer.current.closeDrawer()}} style={styles.DrawerWidgets}>
 <Image style={{width:50,height:50}}  source={require('./assests/tasksmedical.png')} />
 <Text >My HR</Text>
 </TouchableOpacity >
 </View>
 <View style={{width:'80%',height:.8,backgroundColor:'grey',margin:15}}></View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('TasksLandingPage')
 drawer.current.closeDrawer()}}  style={styles.DrawerWidgets} >
 <Image style={{width:50,height:50}}  source={require('./assests/tasksss.png')} />
 <Text >Tasks</Text>
 </TouchableOpacity> 
 </View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('test')
 drawer.current.closeDrawer()}}  style={styles.DrawerWidgets} >
  <Image style={{width:50,height:50}}  source={require('./assests/hytergtrry.png')} />
 <Text >Notifications</Text>
 </TouchableOpacity>
 </View>
 <View style={{width:'80%',height:.8,backgroundColor:'grey',margin:15}}></View>
 <View >
 <TouchableOpacity onPress={() => {console.log('ppppp');
 
 drawer.current.closeDrawer()}}  style={styles.DrawerWidgets} >
     <Image style={{width:50,height:50}}  source={require('./assests/blue-settings-icon-12.jpg')} />
 <Text >Settings</Text>
 </TouchableOpacity> 
 </View>
 <View >
 <TouchableOpacity onPress={() => {console.log('ppppp');
 drawer.current.closeDrawer()}}  style={styles.DrawerWidgets} >
  <Image style={{width:50,height:50}}  source={require('./assests/warning-icon-png-13.png')} />
 <Text >Incident</Text>
 </TouchableOpacity> 
 </View>
 </View>
 <View style={{width:'80%',height:.5,backgroundColor:'grey',margin:15,}}></View>
 <View >
 <TouchableOpacity onPress={() => {navigationRef.navigate('SignIn')
 drawer.current.closeDrawer()}}  style={styles.logoutBtn} >
 <Icon style={{fontSize:35,color:'#1EA0BD'}} name="logout"/>
 <Text >Logout</Text>
 </TouchableOpacity> 
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
          drawerLockMode = {layoutSore.drawerFlag}>
          <NavigationContainer ref={navigationRef}>
          <QuickActions />
          <Collaborate/>
          {layoutSore.searchFlag==false &&layoutSore.loginFlag && <Header  drawHandler={drawer} />}
          {/* <Header  drawHandler={drawer} /> */}
          {layoutSore.searchFlag==true && <HeaderSearch   />}
          {layoutSore.componentsLoader  && <Loader1 />}
          <Stack.Navigator  screenOptions={{headerShown: false }}>
          {<Stack.Screen name="SignIn" component={SignIn}/>}
          {<Stack.Screen name="Dashboard" component={Dashboard}/>}
          <Stack.Screen name="MyHr" component={MyHr} />
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
          { ciamStore.ottpFlag && < OttpModel/>}</>}
          <View style={{width:10,  height:100,
           position: 'absolute',

  bottom: 0,
  left: 0,
  right: 0,
  opacity: .9,
}}></View>
          {layoutSore.searchFlag==false && layoutSore.loginFlag &&<Layout/>}
          {/* {<Layout/>} */}
          {layoutSore.searchFlag==false &&  layoutSore.loginFlag &&  
         <IconButton bg={'#97C4B8'} shadow={9} w="50" h="50" style={styles.QuickActionsBtn} variant="solid" borderRadius="full"          size="sm" onPress={()=>dispatch(isQuickActionsOpenHandler())}  icon={<Icon  style={{fontSize:30,color:'#FF5B00'}}  name="fire"  />} /> }
         </NavigationContainer>
         </DrawerLayoutAndroid>
         </>
    );
  }

  const styles = StyleSheet.create({
    DrawerWidgets:{
      width:130,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10,  shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
    },
    logoutBtn:{
      width:210,height:70,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10, 
      position:'absolute',
      bottom:-75,
      left:-110,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,

    },
    QuickActionsBtn:{
      position:'absolute',right:20,bottom:70,width:50,height:50
    },

    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // padding: 16
    },
    navigationContainer: {
    backgroundColor: "#ecf0f1"
    },
    imgBackgRound:{
      width:'100%',
      height:'100%',
      borderBottomWidth:.3,
      borderBottomRightRadius:20,
      borderBottomLeftRadius:20,
      borderColor:'grey'
      , shadowColor: "#000",
      shadowOffset: {width: 5, height: 12,},shadowOpacity: 0.54,shadowRadius: 16.00,elevation: 24
    },
    image:{
      borderBottomRightRadius:20,
      borderBottomLeftRadius:20
    }
    });
  export default App


