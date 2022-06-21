import  React,{useEffect,useState} from 'react';
import { View,ScrollView } from 'react-native';
import { Pressable, Text, Box, HStack, Button, Flex, Center,Avatar } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import requestRebuilder  from '../../requestRebuilder  '
import {componentsLoaderHandler} from '../../FinalLayout/store-finalLayout'
// import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';


function Hr({navigation}) {
  const [test,setTest]=useState('')
  const [provider,setProviders]=useState([{}])
  const [checkOutFlag,setCheckOutFlag]=useState(false)
  const [checkInFlag,setCheckInFlag]=useState(false)
  const [CheckInNew,setCheckInNew]=useState('')
  const [CheckOutNew,setCheckOutNew]=useState('____')
  const [today,setToday]=useState('')
  const [dueDate,setDueDate]=useState('')
  const tokenStore = useSelector(state => state.dashboard);
  const hrStore = useSelector(state => state.hrStore);
  const [coordinates,setCoordinates]=useState({})
  const dispatch = useDispatch();

  useFocusEffect(
  React.useCallback(() => {
  DateAndTimeHandler()
  getData()
  checkinhHandler()

       
  // Geolocation.getCurrentPosition(info=>setCoordinates({lat:info.coords.latitude,long:info.coords.longitude})  )

    }, []));
  //  Geolocation.watchPosition(success);
  // useEffect(() => {
    
  //   Geolocation.watchPosition(success);
  // }, [coordinates])
  
  function success(pos) {
    console.log('qqqq  qqqqq',pos);
    setCoordinates({lat:pos.coords.latitude,long:pos.coords.longitude})

    
  }

function error(payload) {
  console.log('payloadpayload',payload);
  
}
    function DateAndTimeHandler() {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d=new Date()
    var dayName = days[d.getDay()].toLocaleLowerCase();
    setToday(dayName)
    return `${d.getHours()}:${d.getMinutes()}`
   }

  async function getData() {


    dispatch(componentsLoaderHandler())
    await axios(requestRebuilder('hr','/getAllWorkingHours','post',{
      "providerUuid": tokenStore.userToken.userId,
      "status": "latest"
     })).then(results=>setProviders( results.data))
     dispatch(componentsLoaderHandler())
  }



  async function checkinhHandler() {
  
    await axios(requestRebuilder('hr','/getAllTimeAttendance','post',{
      "providerUuid": tokenStore.userToken.userId,
      "date":hrStore.dueDate
      // tokenStore.userToken.profileId
      // dueDate
     
  })).then(results=>enableDisableHandler(results))
  }





 function enableDisableHandler(results) {
  setTest(results.data)
    if (results.data.length !==0) {
     let fullTime =results.data[results.data.length-1].checkIn.split(':')
     let hours= parseInt(fullTime[0]) 
     let fullTimeOut =results.data[results.data.length-1].checkOut.split(':')
     let hoursOut= parseInt(fullTimeOut[0]) 
      setCheckInNew(`${hours}:${fullTime[1]}`)
      setCheckOutNew(`${hoursOut}:${fullTimeOut[1]}` )
 if (results.data[results.data.length-1].checkOut !=='null') {
  setCheckOutFlag(true)
 }

      setCheckInFlag(true)
    }else{
      setCheckInFlag(false)
    }
 
    
  



  
}


  async function checkOutHandler() {
    setCheckOutNew(DateAndTimeHandler())
    setCheckOutFlag(true)
    await axios(requestRebuilder('hr','/checkOutClicked','put',{
      "providerUuid": tokenStore.userToken.userId,
      "status":"out"})).then(()=>{
       setCheckOutNew(DateAndTimeHandler())
       setCheckOutFlag(true)
      })}


 async function checkInHandler() {
      await axios(requestRebuilder('hr','/checkInClicked','post',{
      "providerUuid": tokenStore.userToken.userId,
      "providerName": tokenStore.userToken.name,
      "ProviderId": tokenStore.userToken.userId})).then((results)=>{
    
        setCheckInNew(DateAndTimeHandler())
        setCheckInFlag(true)
      })
    
    }
  
    return (
      <ScrollView>

    <Center  flex={1} px="3">
      <Pressable>
      {({
      isHovered,
      isFocused,
      }) => {
      return ( <View>
      <Box mt="4" maxW="96"  shadow={5}  pt="5"  pl="5"  pr="5" rounded="8" >
      <HStack space={10}  w="300"  justifyContent="center" alignItems="center">
      <Text style={{textAlign:'center'}}  color="coolGray.800" fontWeight="medium" fontSize="xl"> 
       DR <Text>{tokenStore.userToken.firstName.toUpperCase() +" "+ tokenStore.userToken.lastName.toUpperCase()}</Text> 
      </Text> 
      <Avatar  bg="cyan.500" source={{
      uri: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg"
       }}>
      </Avatar>
    
            </HStack>
           <HStack alignContent={'center'} justifyContent={'center'}>
             <Center>
             <Text italic style={{textAlign:'center'}}  mt="5" fontSize="sm" color="coolGray.700"> Working Hours</Text>
             
             </Center>
            </HStack>
         { provider.length !==0 && <View>
        
          {Object.entries(provider[0]).map(ee=>   <HStack pb="2" style={{backgroundColor:today== ee[0].toLocaleLowerCase()?'#B8F1B0' :'transparent',paddingBottom:today== ee[0].toLocaleLowerCase()? 15 :2, borderRadius:today== ee[0].toLocaleLowerCase()? 10 :2 }} >
               {ee[1].from && <HStack >
            <Text  pl="5"  mt="5" fontSize="sm" color="coolGray.700">{ee[0].toUpperCase()}</Text>
            <Text style={{position:'absolute',left:120}}  pl="5"  mt="5" fontSize="sm" color="coolGray.700">{ee[1].from}</Text>
            <Text style={{position:'absolute',left:170}} pl="5" mt="5" fontSize="sm" color="coolGray.700">  to</Text>
            <Text style={{position:'absolute',left:220}} pl="5"  mt="5" fontSize="sm" color="coolGray.700">{ee[1].to}</Text>
            </HStack>}
           </HStack>  )}
           </View>}
         
         
            <HStack mt="6" >
            <Text italic  mt="2" fontSize="sm" bold style={{color:'teal'}}> Check in/out:  </Text>
            {!checkInFlag &&    <HStack >
          
              <Text pl="7" mt="2" fontSize="sm" color="coolGray.700">_____</Text>
              <Text pl="5" mt="2" fontSize="sm" color="coolGray.700">to</Text>
              <Text pl="7" mt="2" fontSize="sm" color="coolGray.700">_____</Text>
          
            </HStack>}
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
            
            {checkInFlag &&   <HStack>
            <Text bold style={{color:'teal'}} pl="6" mt="2" fontSize="sm" color="coolGray.700">{CheckInNew}</Text>
            <Text pl="5" mt="2" fontSize="sm" color="coolGray.700">to</Text>
            {CheckOutNew !=="NaN:undefined" &&<Text bold style={{color:'teal'}} pl="6" mt="2" fontSize="sm" color="coolGray.700">{CheckOutNew}</Text>}
            {CheckOutNew=="NaN:undefined"   &&<Text bold style={{color:'teal'}} pl="6" mt="2" fontSize="sm" color="coolGray.700">_____</Text>}
            </HStack>}
            
           
             </HStack>
             <HStack space={6} pt="10"  w="300"  justifyContent="center" alignItems="center">
           
           {<Button  disabled={checkInFlag}  colorScheme={checkInFlag?'light' :"primary"}   onPress={ ()=> checkInHandler()} > Check in </Button>}
           {<Button disabled={checkOutFlag} colorScheme={checkOutFlag?'light' :"primary"}  onPress={ ()=> checkOutHandler()} >Check out</Button>}
         
            </HStack>
            <Flex>
              {isFocused ? <Text mt="2" fontSize={12} fontWeight="medium" textDecorationLine="underline" color="darkBlue.600" alignSelf="flex-start">
                  
                </Text> : <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                 
                </Text>}
            </Flex> 
          </Box>
          </View>)
    }}
    </Pressable>

    </Center>
    <View style={{marginTop:50}}>

    </View>
    <Text >Last gggggggggggg</Text>
    <Text>longitude: {coordinates.long}</Text>
    <Text style={{marginBottom:150}}>latitude: {coordinates.lat}</Text>
    </ScrollView>
    );
  }
  export default Hr
  ///  ////