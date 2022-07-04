import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {modalVisibleHandler,fullViewAppHandler} from '../store-dashboard'
import Icon from '@expo/vector-icons/Ionicons';
import { Button,HStack,StatusBar,Box,Heading,Avatar,Center,VStack} from "native-base";
import { useFocusEffect } from '@react-navigation/native';
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

const App = () => {
    const dashboardStore = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    useFocusEffect(
      React.useCallback(() => {
        console.log(' dashboardStore.AdditionalAppointmentData', dashboardStore.AdditionalAppointmentData);
       
      }, [])
    );

  return (
<View >
<Modal
animationType="slide"
transparent={true}
visible={dashboardStore.modalVisible} >
<View style={styles.modalView} >
<Pressable  style={{position:'absolute',right:0,top:10,width:50,height:40,zIndex:100}}
onPress={() => dispatch(modalVisibleHandler())}>
<Icon style={{fontSize:25}} name="close" />
</Pressable>
<ScrollView style={{width:'100%',marginBottom:25}}>
<Heading style={{textAlign:'center',fontSize:16,color:"#4E9F3D",marginBottom:30}}>DR. {dashboardStore.userToken.firstName+" "+dashboardStore.userToken.lastName}</Heading>
{dashboardStore.AdditionalAppointmentData.length&& dashboardStore.AdditionalAppointmentData.map((item,index,row)=>
<Pressable onPress={()=>dispatch(fullViewAppHandler(item))}>
 <Box space={3} style={{marginBottom:5,width:"100%",borderRadius:25,shadowColor: "#000",borderColor:AddPriorityColor(item.Priorty),borderLeftWidth:10,
 shadowOffset: {
   width: 0,
   height: 12,
 },
 shadowOpacity: 0.58,
 shadowRadius: 16.00,marginLeft:10,paddingTop:5
}}  >
<HStack style={{borderRadius:10,backgroundColor:'white',width:"95%",shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
elevation: 24}}  h={70} shadow={1} space={3}  >
<Avatar size="44px" style={{marginTop:10,marginLeft:3}} source={{
uri: 'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png'
}} />
<VStack>
<Heading bold style={{color:'#346751',paddingTop:3,fontSize:12}}>
PT:{item.Consumer_Name}
</Heading>
{item.services.length>2 && 
<View>
  <Text style={{position:'absolute',left:'25%',bottom:-10,fontSize:10,color:'red'}}>...More</Text>
<Text>
Services:  {item.services.slice(0,2).map((item,index,row)=>
<Text style={{fontSize:12}}>
{item.Services_name} 
{index +1 !==row.length && <Text style={{color:'red',fontSize:15}}> , </Text>}
</Text>
  )}
     {" "} 
</Text>

</View>
}
{item.services.length <=2 && <Text >
Services: {item.services.map((item,index,row)=>
  <Text style={{fontSize:12}}>
    {item.Services_name} 
    {index +1 !==row.length && <Text style={{color:'red',fontSize:15}}> , </Text>}
  </Text>
  )}
</Text>}
</VStack>
<Text style={{fontSize:10 ,position:'absolute',right:0,top:10}} _dark={{
color: "warmGray.50"
}} color="coolGray.800" >
<Icon name="md-time-outline" style={{ position:'absolute',right:"27%"}}/>
{" "}{item.TimeFrom} To
{" "}<Icon name="md-time-outline" style={{ position:'absolute',right:"27%"}}/> {item.TimeTo}{" "}{" "}{" "}
</Text>
</HStack>
</Box>
</Pressable>)}
      </ScrollView>
      </View>
      </Modal>  
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop:200,
    height:560,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 24,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

});

export default App;