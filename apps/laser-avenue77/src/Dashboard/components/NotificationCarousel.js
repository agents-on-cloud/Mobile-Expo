import { useFocusEffect } from "@react-navigation/native";
import React, { useRef,useEffect,useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Pressable,
  Image
  
} from "react-native";
import Icon from '@expo/vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import requestBuilder from '../../requestRebuilder  '
import {notificationModalHandler} from "../store-dashboard"
import {Heading} from 'native-base'





const App = () => {
    const [unReadNotification,setunReadNotification]=useState([{notification_subject:'',createdAt:'',sender_name:''}])
    const [deleteFlag,setDeleteFlag]=useState(false)
  const dispatch = useDispatch();
  const dashboardStore = useSelector(state => state.dashboard);
  const scrollX = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
     getNotifications()
  
    }, [deleteFlag])
  );
  async function deleteNotification(item) {
    await axios(requestBuilder('notifications','/notifications/delete/:id','delete',{id:item.id})).then(results=>{
        let notificationAfterDelete=unReadNotification.filter(item=>item.is_deleted !==true)
        setunReadNotification(notificationAfterDelete)
        setDeleteFlag(!deleteFlag)

    })
 
  }

 async function getNotifications() {
    const notificationData= await axios(requestBuilder('notifications','/notifications/receivers/:id','get',{id:dashboardStore.userToken.userId})).then(results=>{
let unReadNoti=[]
        for (let i = 0; i < results.data.length; i++) {
          if (results.data[i].is_unread) {
            unReadNoti.push(results.data[i])
          }}
          // setunReadNotification([{notification_subject:'',createdAt:'',sender_name:''}])
          setunReadNotification([...unReadNotification,...unReadNoti])
          })
    
          console.log('====================================');
          console.log('wwwwwwwwww',unReadNotification);
          console.log('====================================');
    
  }

  const { width: windowWidth } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
        //   pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {unReadNotification.map((item, imageIndex) => {
            return (
            <View >
               {imageIndex !==0 && <Pressable   >
                <View
                  style={{  width: windowWidth * .8, marginRight:10,marginLeft:10, borderColor:'#06919D',borderRadius:10, height: 70, padding: 10 ,backgroundColor:"#FFF6EA" }}
                  key={imageIndex}
                >
                    <Icon onPress={()=>deleteNotification(item)} name="close" style={{position:'absolute',top:4,right:4,fontSize:15}}/>
                <View style={{flexDirection:'row'}}>
                <Image     style={styles.tinyLogo}
        source={{
            uri: 'https://myupchar-banner.s3.ap-south-1.amazonaws.com/widget/avatar/doctor-avatar-female.png',
          }}
       />
              {  <Text bold style={{color:'black'}} > {" "}{item.sender_name.toUpperCase()}</Text>}
                <Text style={{position:'absolute',right:0,bottom:0,color:"#11567C"}}><Icon color="#11567C" name="date" />{" "} {`${parseInt(item.createdAt.slice(11,16))+3}${item.createdAt.slice(13,16)}` }</Text>
                </View>
                <Text style={{color:'#11567C',fontSize:12,paddingTop:5,position:'absolute',left:62,bottom:20}} >{item.notification_subject}</Text>
                </View>
                </Pressable>}
                {imageIndex ==0 && <Pressable onPress={()=>console.log('hhh')}  >
                <View style={{width:320,height:70,backgroundColor:'#FFF6EA',borderRadius:10,shadowColor: "#000",
        shadowOffset: {
        width: 5,
        height: 12,
      },
      shadowOpacity: 0.8,
      shadowRadius: 16.00,
      elevation: 20,marginLeft:30,marginRight:30}}>
        <Image style={{position:'absolute',top:10,left:10,width:50,height:50}} source={require('../../assests/notification-bell.png')}/>
        <View style={{width:20,height:20,borderRadius:18, backgroundColor:'red',position:'absolute',top:10,left:48}}>
        <Heading style={{color:'white',fontSize:12,textAlign:'center',bottom:5}}> {unReadNotification.length-1} </Heading>
        </View>
        <Heading style={{textAlign:'center',paddingTop:20,color:'#346751'}}> Notifications</Heading>
        </View>
        </Pressable>}
        </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {unReadNotification.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [12, 24, 12],
              extrapolate: "clamp"
            });
            return (
              
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
                
            );
          })}
      </View>
      </View>
      {dashboardStore.notificationModal &&<View shadow={9} style={{width:180,height:150,backgroundColor:"#EEEEEE",position:'absolute',top:-40,borderRadius:20,borderColor:"grey",borderWidth:1}}>
      </View>}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    tinyLogo:{
width:45,
height:45,
borderRadius:10
    },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 110,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 10,
    width:10,
    borderRadius:15,
 
    backgroundColor: "white",
    marginHorizontal: 10
  },
  indicatorContainer: {
    position:"absolute",
    bottom:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;