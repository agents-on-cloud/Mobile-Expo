import React,{useEffect,useState} from 'react'
import { Text, View, SafeAreaView,ScrollView,Pressable,TouchableOpacity ,Image} from 'react-native';
import { Button,HStack,StatusBar,Box,Heading,Avatar,Center,VStack} from "native-base";
import LottieView from 'lottie-react-native';
import {  FlatList, Spacer, NativeBaseProvider ,} from "native-base";
import axios from 'axios';
import requestBuilder from '../../requestRebuilder  '
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {modalVisibleHandler,AdditionalAppointmentDataHandler,fullViewAppHandler} from '../store-dashboard'


function Appointment({navigation}) {
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
    const [data,setData] =useState([])
    const [appointmentData,setAppointmentData] =useState([])
    const [test,setTest] =useState([{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'high',Consumer_Name:'Ahmad Khalil',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'},{Services_name:'اثار حب شباب'}]},{Priorty:'medium',Consumer_Name:'Sami Fathi Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'},{Services_name:'Botox 77'},{Services_name:'Filler 77'}]},{Priorty:'high',Consumer_Name:'Odai Khalifeh',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]},{Priorty:'low',Consumer_Name:'Mohammad Haroun',TimeTo:'08:30',TimeFrom:'09:00',Consumer_Image:'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png',services:[{Services_name:'استشارة اسنان اطفال'}]}  ])
    useFocusEffect(
      React.useCallback(() => {
        console.log('oooooooooooooooo');
        getAppointments()
      }, [])
    );
    useFocusEffect(
      React.useCallback(() => {
        console.log('oooooooooooooooo');
        getAppointments()
      }, [dashboardStore.FullViewAppFlag])
    );

    function AddPriorityColor(payload) {
      if (payload=="low") {
        return '#54BAB9'
      }
      if (payload=="high") {
        return '#BB6464'
      }
      if (payload=="medium") {
        return '#C6D57E'
      }
    }

async function getAppointments() {
  setAppointmentData([])
 
  try {
await axios(requestBuilder( "appointments", "/appointments/Provider/With/Date/:id/:date","get",
          {
            id: "087a5c8-7bf9-4ce9-af24-958465fa380a",
            date:"2022-06-27"
          }
        )
      ).then((results)=>{
        if (results.data.Response) {
let appointmentSortedArr=[]
for (let i = 0; i < results.data.Response.length; i++) {
 
  
}

          setAppointmentData(results.data.Response)
        }
      });
  } catch (error) {console.log('errrrore',error);}
  if (appointmentData.length>5) {
  dispatch(AdditionalAppointmentDataHandler(appointmentData.slice(5,appointmentData.length)))
  }}
function testFunction() {


}
function appontmentHandler(results) {
  if (results.data.success) {
    setALLappointmentNumber(results.data.Appointmentsforspecificprovider.length)
   let rr=[]
      for (let i = 0; i < results.data.Appointmentsforspecificprovider.length; i++) {
        if (i<5) {
         rr.push({fullName:results.data.Appointmentsforspecificprovider[i].doctorname,avatarUrl:"https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000",id:results.data.Appointmentsforspecificprovider[i].appid,timeStamp:results.data.Appointmentsforspecificprovider[i].start,recentText:results.data.Appointmentsforspecificprovider[i].patientname}) }
         
        }
        rr.sort((a, b) => a.timeStamp - b.timeStamp);
        setAppointmentData(rr)
       }else{
        setAppointmentData([])
        setALLappointmentNumber(0)
        hightStyle()
       }
    
  }

function styleAppoint(params) {
  return {
    backgroundColor:'white',
    marginTop:110,
    width:'90%',
    marginLeft:"5%",
    marginBottom:80,
    padding: 6,
  }
  
}

    return (
    <View>
        <View>
        <Box  shadow={9} style={styleAppoint()} w="90%" rounded="xl" _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
  }}>
    <View>
    <Image
      style={{position:'absolute',top:-40,left:20,width:90,height:90,resizeMode: 'cover',shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24, }}
      source={require('../../assests/app.png')} /> 
      </View>
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
      {/* {test.length} */}
      </Text>     
      </Center>
      </View>
       {appointmentData.slice(0,5).map((item,index,row)=>
   {return <Pressable onPress={()=>dispatch(fullViewAppHandler(item))}>
  <View>
  <Box style={{marginBottom:4,shadowColor: "#000",
   shadowOffset: {
   width: 0,
   height: 12,
   },
   shadowOpacity: 0.58,
   shadowRadius: 16.00,
   elevation: 5,}}  >
  <HStack style={{borderLeftWidth:5,borderColor:AddPriorityColor(item.Priorty), borderRadius:10,backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
elevation: 24,}}  h={70}  space={3} justifyContent="space-between" >
  <Avatar size="44px" style={{marginTop:15,marginLeft:3}} source={{
  uri: 'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png'
  }} />
   <VStack>
   <Heading bold style={{color:'#346751',paddingTop:4,fontSize:14}}>
   PN:{item.Consumer_Name}
   </Heading>
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


</Box>
</View>
</Pressable>
})}
        
      
       
        </Box>
        </VStack>
       
      { appointmentData.length>5 && 
  
      <Pressable onPress={()=>{dispatch(modalVisibleHandler())}} 
       style={{paddingTop:12}}>
        <View>
  <Text  style={{color:'blue',textDecorationLine: 'underline'}}>See More</Text>
  </View>
        </Pressable>

      }
      
        </Box>
        </View>
   

    </View>
    )
    
}

export default Appointment