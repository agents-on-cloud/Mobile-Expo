import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View,ScrollView,Button,TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {FullViewCloseHandler} from '../store-dashboard'
import Icon from '@expo/vector-icons/Ionicons';
import { HStack,StatusBar,Box,Heading,Avatar,Center,VStack} from "native-base";
import axios from 'axios'
import requestBuilder from '../../requestRebuilder  '
import { useFocusEffect } from '@react-navigation/native';

const App = () => {
    const dashboardStore = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    const [isChecked,setIsChecked]=useState(false)
    const [isCanceled,setIsCanceled]=useState(false)
    const [inputRequired,setInputRequired]=useState(false)
    const [cancelAppSection,setCancelAppSection]=useState(false)
    const [AppStatus,setAppStatus]=useState(dashboardStore.FullViewAppData.Status)
    const [RequestedBy, onChangeRequestedBy] = useState('');
    const [Reason, onChangeReason] = useState('');

    useFocusEffect(
      React.useCallback(() => {
       if (dashboardStore.FullViewAppData.Status =='Checked-in') {
        setIsChecked(true)
        onChangeRequestedBy('')
        onChangeReason('')
        setInputRequired(false)
       }
      }, [])
    );
async function CheckIn() {
  setIsChecked(true)
  setAppStatus('Checked-in')
}
async function CancelHandler() {
  if (RequestedBy !=='' && Reason!=='' ) {
    setIsCanceled(true)
    setAppStatus('Canceled')
    setInputRequired(false)
  }else{
    setInputRequired(true)
  }
}
async function closeHandler() {
  try {
    await axios(requestBuilder( "appointments", "/appointments/Update/Status/:id","patch",
              {
                id:dashboardStore.FullViewAppData.Appointment_id ,
                Status:AppStatus,
                Reason:Reason,
                requestedBy:RequestedBy
              }
            )
          )
      } catch (error) {
        console.log('errrrore',error);
      }
      dispatch(FullViewCloseHandler())}
  return (
        <View >
        <Modal
        animationType="slide"
        transparent={true}
        visible={dashboardStore.FullViewAppFlag}
        >
            <View style={styles.modalView} >
            <Pressable  style={{position:'absolute',right:0,top:10,width:50,height:40,zIndex:100}}
            onPress={() =>closeHandler() }>
            <Icon style={{fontSize:25}} name="close" />
            </Pressable>
            <ScrollView style={{width:'100%',marginBottom:25}}>
            <Heading style={{textAlign:'center',fontSize:18,color:"#1E5128",marginBottom:10,paddingTop:10}}>DR. {dashboardStore.userToken.firstName+" "+dashboardStore.userToken.lastName}</Heading>
            <View style={{width:'80%',height:1,backgroundColor:'grey',marginLeft:'10%'}}>
            </View>
            <View style={{flexDirection:'row'}}>
            <Avatar size="56px" style={{marginTop:25,marginLeft:12}} source={{
  uri: 'https://rajansood.in/wp-content/uploads/2017/06/Sakshi-Enterprises-1.png'
  }} />
  <View style={{flexDirection:'column'}}>

  <Heading style={{color:'#1E5128',fontSize:16,marginLeft:15,marginTop:15}}>Patient Name : <Text style={{color:'blue'}}>{dashboardStore.FullViewAppData.Consumer_Name.toUpperCase()}</Text> 
  </Heading>
  
  <Heading style={{color:'#1E5128',fontSize:16,marginLeft:10}}> Time: From <Text style={{color:'#332FD0'}}>{ dashboardStore.FullViewAppData.TimeFrom}</Text> <Icon style={{color:'#332FD0'}} name ="md-time-outline"/>  TO   <Text style={{color:'#332FD0'}}>{ dashboardStore.FullViewAppData.TimeTo}</Text> <Icon  name ="md-time-outline" style={{color:'#332FD0'}}/> </Heading>
  </View>
  </View>
  <View style={{width:'50%',marginLeft:'25%',height:1,backgroundColor:'grey',marginTop:20}}>
  </View>
  <View style={{flexDirection:'row',marginTop:20}}>
<Heading style={{marginLeft:15,color:'#1E5128',marginRight:25,fontSize:18}}>Services :</Heading>
<View style={{flexDirection:'column'}}>
  {dashboardStore.FullViewAppData.services.map((item,index)=><Text ><Text >{index +1}.<Text style={{fontSize:.1}}>a</Text></Text>  {item.Services_name}</Text>)}
</View>
</View>
<View style={{width:'80%',marginLeft:'10%',height:1,backgroundColor:'grey',marginTop:20}}>
  </View>
       <View style={{flexDirection:'row',marginTop:8,marginBottom:20}}>
        <Heading style={{marginLeft:15,color:'#1E5128',marginRight:25,fontSize:16}}><Icon style={{color:'#4E9F3D',fontSize:16}} name ="md-grid-outline"/> Status : <Text  style={{color:'#332FD0',fontSize:14 }}>{AppStatus}</Text></Heading>
        <Heading style={{marginLeft:15,color:'#1E5128',marginRight:25,fontSize:16}}><Icon style={{color:'#4E9F3D',fontSize:16}} name ="md-git-compare"/> Type : <Text  style={{color:'#332FD0',fontSize:14 }}>{dashboardStore.FullViewAppData.Appointments_Type} </Text></Heading>
       </View>
{  cancelAppSection &&     <View style={{borderColor:'#F55353',width:'90%',borderWidth:1,marginLeft:'5%',marginBottom:20}}>
        <View style={{flexDirection:'row'}}>
    <Text style={{margin:10,marginTop:15}}>Requested By *</Text>
    <TextInput
        multiline
        numberOfLines={1}
        onChangeText={text => onChangeRequestedBy(text)}
        value={RequestedBy}
        style={{borderColor:'#F55353',borderWidth:1,width:'60%',marginTop:10,borderRadius:5,padding:5}}
      />
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={{margin:10,marginTop:15,marginRight:50}}>Reason *</Text>
    <TextInput
        multiline
        numberOfLines={1}
        onChangeText={text => onChangeReason(text)}
        value={Reason}
        style={{borderColor:'#F55353',borderWidth:1,width:'60%',marginTop:10,borderRadius:5}}
      />
    </View>
    <View style={{margin:15}}>
      {inputRequired &&<Text style={{textAlign:'center',color:'red',marginBottom:5}}>Please fill the required fields</Text>}
    <Button  onPress={()=> CancelHandler()}
    title="Cancel Appointment"
    disabled={isCanceled} color='#F55353' />
    </View>
  </View>}
<View style={{flexDirection:'row',}}>

<View style={{width:70,marginTop:30}}></View>
<Button  onPress={()=> CheckIn()}
        title="Check In"
        disabled={isChecked}
      />
<View style={{width:40}}></View>
    <Button 
    onPress={()=> setCancelAppSection(!cancelAppSection)}
    title="Cancel"
      >
      </Button>
</View>
      </ScrollView>
      </View>
      </Modal>  
      </View>
  );
};

const styles = StyleSheet.create({

  modalView: {
    marginTop:200,
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

});

export default App;