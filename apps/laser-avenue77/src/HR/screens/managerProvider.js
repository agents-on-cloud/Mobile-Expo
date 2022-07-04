import  React,{useEffect,useState} from 'react';
import { View,ScrollView } from 'react-native';
import { Pressable, Text, Box, HStack, Button, Flex, Center,Avatar } from "native-base";
import {increment} from '../store-Hr'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import requestRebuilder  from '../../requestRebuilder  '
import {componentsLoaderHandler} from '../../FinalLayout/store-finalLayout'


function Hr({navigation}) {
    const [provider,setProviders]=useState([])
    const [today,setToday]=useState('')
  const HumanResourcesStore = useSelector(state => state.hrStore);
  const finalLayoutStore = useSelector(state => state.finalLayoutStore);
  const dispatch = useDispatch();
  useEffect(() => {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let d=new Date()
    var dayName = days[d.getDay()].toLocaleLowerCase();
  setToday(dayName)
    getData()
    

  }, [])

  async function getData() {
    dispatch(componentsLoaderHandler())

    await axios(requestRebuilder('hr','/getAllTimeAttendance','post')).then(results=>providersHandler(results))
    dispatch(componentsLoaderHandler())

  }

  async function providersHandler(results) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let providerInfo=results.data
   
  
      for (let i = 0; i < providerInfo.length; i++) {
        let whatIsDate=new Date(providerInfo[i].date)
        await axios(requestRebuilder('hr','/getAllWorkingHours','post',{
            providerUuid :providerInfo[i].providerUuid ,
            status :'latest'
        
          })).then((ele)=>{
            providerInfo[i].workingHours=ele.data
            providerInfo[i].day=days[whatIsDate.getDay()].toLowerCase()
          
          }) }
      setProviders(providerInfo)
  }
  
    return (
      <ScrollView>
     {provider.map(item=> <Center  flex={1} px="3">
      <Pressable>
      {({
      isHovered,
      isFocused,
      }) => {
        return ( <View>
               <Text style={{position:'absolute',right:14,top:30,fontSize:12}}>{item.date}</Text>
               <Text style={{position:'absolute',right:14,top:50,fontSize:11}}>{item.day.toUpperCase()}</Text>
            <Box mt="4" maxW="96"  shadow={5}  pt="5"  pl="5"  pr="5" rounded="8" >
            <HStack space={10}  w="300"  justifyContent="center" alignItems="center">
            <Text style={{textAlign:'center'}}  color="coolGray.800" fontWeight="medium" fontSize="xl">
            DR <Text>{item.providerName}</Text>
            </Text>
              <Avatar  bg="cyan.500" source={{
      uri: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg"
    }}>
             </Avatar>
             </HStack>
             <HStack >
             <Text italic  mt="5" fontSize="sm" color="coolGray.700"> Working Hours:</Text>
           {item.workingHours.length !==0 &&   <Text pl="5"  mt="5" fontSize="sm" color="coolGray.700">{item.workingHours[0][item.day].from}</Text>}
             <Text pl="5" mt="5" fontSize="sm" color="coolGray.700">  to</Text>
            {item.workingHours.length !==0 &&   <Text pl="5"  mt="5" fontSize="sm" color="coolGray.700">{item.workingHours[0][item.day].to}</Text>}
            </HStack>
            <HStack >
              <Text italic  mt="2" fontSize="sm" color="coolGray.700"> Check in/out:  </Text>
              <Text pl="7" mt="2" fontSize="sm" color="coolGray.700">{item.checkIn} </Text>
              <Text pl="5" mt="2" fontSize="sm" color="coolGray.700">to</Text>
              {item.checkOut=='null' && <Text pl="6" mt="2" fontSize="sm" color="coolGray.700">____</Text>}
              {item.checkOut !=='null' && <Text pl="6" mt="2" fontSize="sm" color="coolGray.700">{item.checkOut}</Text>}
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

    </Center>)}
    <View style={{marginTop:50}}>

    </View>
    </ScrollView>
    );
  }
  export default Hr
  ///  //