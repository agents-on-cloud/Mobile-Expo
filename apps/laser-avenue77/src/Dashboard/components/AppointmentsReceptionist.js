import React,{useEffect,useState} from 'react'
import { Text, View, SafeAreaView,ScrollView,Pressable,TouchableOpacity } from 'react-native';
import { Button,HStack,StatusBar,Box,Heading,Avatar,Center,VStack} from "native-base";
import LottieView from 'lottie-react-native';
import {  FlatList, Spacer, NativeBaseProvider } from "native-base";
import axios from 'axios';
import requestBuilder from '../../requestRebuilder  '
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppontmentModal from './AdditionalAppontmentModal'


function Appointment({navigation}) {
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
     useFocusEffect(
      React.useCallback(() => {
        getAppointments()
      }, [])
    );
    const [data,setData] =useState([])
    const [appointmentData,setAppointmentData] =useState([])
    const [ALLappointmentNumber,setALLappointmentNumber] =useState(0)

async function getAppointments() {
  try {
await axios(requestBuilder( "appointments", "/appointments","get"
        )
      ).then((results)=>appontmentHandler(results));
    
  } catch (error) {
  }


//  await axios('https://625fbc0892df0bc0f3397ad0.mockapi.io/Appointments').then(results=>   appontmentHandler(results))

}
function appontmentHandler(results) {
  
    
  }
function hightStyle() {
  if (appointmentData.length >=5) {
    return 760
  }
  if (appointmentData.length ==0) {
    return 350
  }
  if (appointmentData.length <5 && appointmentData.length>0) {
  return  parseInt( appointmentData.length)*94 
  }

  
}
function styleAppoint(params) {
  return {
    backgroundColor:'#EEEEEE',
    marginTop:110,
    width:'90%',
    marginLeft:"5%",
    marginBottom:80,
    padding: 6,
    height:hightStyle()
  }
  
}

  // 
    return (
        <View>
        <View>
        <Box h="120%" shadow={9} style={styleAppoint()} w="90%" rounded="xl" _text={{
        fontSize: "md",
        fontWeight: "medium" }}>
      <Pressable variant="ghost"  onPress={()=>navigation.navigate('AppointmentProviderLandingPage')}>
      <Avatar   shadow={9} bg="teal"  alignSelf="center" size="xl" style={{position:'absolute',top:-40,left:40}}  >
      <LottieView   style={{height:130}}  source={require('../../animation/appointments.json')}   />
      </Avatar>
      </Pressable>
      <VStack space={3}  mt="100">
      <Box>
      <View style={{position:'absolute',top:-80,right:10}}>
      <Center fontSize="xl"   >
      <Text style={{fontSize:14,color:'gray.200'}}>  TODAY APPOINTMENTS
      </Text>    
      </Center>
      <Center    pb="20">
      <Text style={{fontSize:30,color:'teal'}}>  
      {appointmentData.length}
      </Text>     
      </Center>
      </View>
      {appointmentData.map(item=>
      <Box style={{borderBottomWidth:1.5, borderColor: "#7C99AC",marginBottom:2}}  >
               <HStack style={{borderRadius:10,backgroundColor:'#CDF0EA'}}  h={60} shadow={1} space={3} justifyContent="space-between" >
               <Avatar size="44px" style={{marginTop:10,marginLeft:3}} source={{
               uri: item.Consumer_Image
               }} />
                <VStack>
                <Text style={{color:'#191A19',paddingTop:10}}>
                PT:{item.Consumer_Name}
                </Text>
               {item.services.length>2 &&<Text>
                Services: {item.services.slice(0,2).map((item,index,row)=>
                    <Text style={{fontSize:12}}>
                    {item.Services_name} 
                    {index +1 !==row.length && <Text style={{color:'red',fontSize:15}}> , </Text>}
                  </Text>
              
                  )}
                     {" "} <Text>...More</Text>
               </Text>}
{item.services.length <=2 && <Text >
                Services: {item.services.map((item,index,row)=>
                  <Text style={{fontSize:12}}>
                    {item.Services_name} 
                    {index +1 !==row.length && <Text style={{color:'red',fontSize:15}}> , </Text>}
                  </Text>
                  )}
               </Text>}
              </VStack>
              <Spacer />
     
              <Text style={{fontSize:10 ,position:'absolute',right:0,top:10}} _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" >
          <Icon name="md-time-outline" style={{ position:'absolute',right:"27%"}}/>
          {" "}{item.TimeTo} To
               {" "}<Icon name="md-time-outline" style={{ position:'absolute',right:"27%"}}/> {item.TimeFrom}{" "}{" "}{" "}
        </Text>
        </HStack>
        </Box>)}
        </Box>
        </VStack>
        </Box>
        </View>


    </View>
    )
    
}

export default Appointment