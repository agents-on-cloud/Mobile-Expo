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





const App = () => {
    const [unReadNotification,setunReadNotification]=useState([])
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
          setunReadNotification(unReadNoti)
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
            return (<View>
                <Pressable onPress={()=>console.log('hhh')} onLongPress={()=>dispatch(notificationModalHandler())} delayLongPress={100} >
                <View
                  style={{  width: windowWidth * .8, height: 80,marginRight:10,marginLeft:10, borderColor:'#06919D',borderRadius:5, height: 80, padding: 20 ,backgroundColor:"#E4E4E4" }}
                  key={imageIndex}
                >
                    <Icon onPress={()=>deleteNotification(item)} name="close" style={{position:'absolute',top:4,right:4,fontSize:15}}/>
                <View style={{flexDirection:'row'}}>
                <Image     style={styles.tinyLogo}
        source={{
            uri: 'https://myupchar-banner.s3.ap-south-1.amazonaws.com/widget/avatar/doctor-avatar-female.png',
          }}
       />
 
                <Text bold style={{color:'black'}} > {" "}{item.sender_name.toUpperCase()}</Text>
                <Text style={{position:'absolute',right:0,bottom:0,color:"#11567C"}}><Icon color="#11567C" name="date" />{" "} {`${parseInt(item.createdAt.slice(11,16))+3}:${item.createdAt.slice(13,16)}` }</Text>
                </View>
                <Text style={{color:'#11567C',fontSize:12,paddingTop:5,position:'absolute',left:72,bottom:20}} >{item.notification_subject}</Text>
                </View>
                </Pressable>
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
              outputRange: [8, 16, 8],
              extrapolate: "extend"
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
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
   width:400,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;