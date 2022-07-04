import React, { useState, useCallback, useRef,useEffect } from 'react';
import { Button,HStack,StatusBar,Box,Heading,Avatar,Center,VStack,Menu} from "native-base";
import { Text, View,Pressable,ImageBackground,Image,Animated,useWindowDimensions,SafeAreaView,StyleSheet,ScrollView} from 'react-native';
import axios from 'axios'
import requestBuilder from "../../requestRebuilder  "
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {changeShowMenuFlag77} from '../store-dashboard'
import Icon from '@expo/vector-icons/FontAwesome';

function Tasks({navigation}){
const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
const scrollX = useRef(new Animated.Value(0)).current;
const { width: windowWidth } = useWindowDimensions();
const dashboardStore = useSelector(state => state.dashboard);
const dispatch = useDispatch();
const [carouselItems, setCarouselItems] = useState([""]);
const [ActiveSlide, setActiveSlide] = useState(0);
const [taskItem, setTaskItem] = useState({});
const [toodayDate, setTodayDate] = useState();
const [deleteFlag, setDeleteFlag] = useState(false);
const [priority, setPriority] = useState(['',"#FF5D5D","#FF8D29","#8CC0DE"]);

useFocusEffect(
  React.useCallback(() => {
    getUsers()
  }, [deleteFlag])
);

function menueHandler(item) {
  dispatch(changeShowMenuFlag77())
  setTaskItem(item)
}

async function deleteHadnler() {
  try {
    await axios(requestBuilder('tasks','/tasks/deleteTask/:id','delete ',{"id":taskItem.task_id}))
    setDeleteFlag(!deleteFlag)
    dispatch(changeShowMenuFlag77())
  } catch (error) {
    console.log('errorerror',error);
  }
 
}
async function ClaimHandler() {
  try {
    await axios(requestBuilder('tasks','/tasks/task/claimme/:id ','put', {id:taskItem.task_id, userId:dashboardStore.userToken.userId})).then(results=>console.log('99999999999',results.data))
    setDeleteFlag(!deleteFlag)
    dispatch(changeShowMenuFlag77())
  } catch (error) {
    console.log('errorerror',error);
  }
}

    const getUsers = async () => {
      try {
     let monthes=['01','02','03','04','05','06','07','08','09','10','11','12']
     let todayDate=new Date()
     let splitArr=todayDate.toString().split(' ')[2]
     let ddd=`${todayDate.getFullYear()}-${monthes[todayDate.getMonth()]}-${splitArr}`


        await axios(requestBuilder('tasks','/tasks/assignedToMe/:id','get',{"id":dashboardStore.userToken.userId})).then((results)=>{
          let dayTasks=[]
          for (let i = 0; i < results.data.length; i++) {
           if (results.data[i].due_date===ddd) {
            dayTasks.push(results.data[i])
           } }
           setCarouselItems([...carouselItems,...dayTasks])
           })
           } catch (error) {
             console.log((error.message));
           }};
       


const goTask = id => {
  console.log(id);
  navigation.navigate('TaskFullView', {
    task_id: id,
    type:'assigned',
  });
};
function SetReminder() {
  setTimeout(() => {
    
  }, timeout);}

      const ref = useRef(null);
      const renderItem = useCallback(({ item, index }) => (
      <View  style={{ borderRadius:20}} shadow={9}>
      {carouselItems && <Pressable   >
      {({
      isHovered,
      isFocused,
      isPressed
      }) => {
      return (  <HStack  style={{ borderRightWidth:40 ,borderRightColor:priority[item.priority], borderBottomColor:'#06919D' , borderTopColor:'#06919D', borderLeftColor:'#06919D',borderRadius:20,width:370, height: 95, padding: 30 ,backgroundColor:"green"}} >
      <VStack space={1}>
      <Text style={{ fontSize: 20,color:'#06919D' }}>{item.subject}</Text>
      <Text style={{fontSize: 12, color:'#06919D' }}>Due Time: {item.due_time} {" "}<Icon name="clock-o"/> </Text>
      </VStack>
      <Image
      style={{position:'absolute',top:0,right:20,  width: 130, height: 92}}
      source={require('../../assests/vecteezy_man-marks-work-plan_4689075-removebg-preview.png')}/> 
      </HStack>)}} 
      </Pressable>}
     </View> 
      ), []);  



    return(
      <View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" ,marginTop:80 }}>
      <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }}
            },
          ])}
          scrollEventThrottle={1}>
          {carouselItems.map((item, imageIndex) => {

          return (
          <View  >
            {/* onPress={()=>navigation.navigate} */}
          {imageIndex !==0 && <Pressable onPress={()=>goTask(item.task_id)}   onLongPress={()=>menueHandler(item)} delayLongPress={3000} >
          <HStack w={300}  style={{ borderRightWidth:40 ,borderRightColor:priority[item.priority], borderBottomColor:'#06919D' , borderTopColor:'#06919D', borderLeftColor:'#06919D',borderRadius:13, height: 80, padding: 10 ,backgroundColor:"#DEEDF0",width:320,height:70,backgroundColor:'#FFF6EA',borderRadius:10,shadowColor: "#000",
          shadowOffset: {
          width: 5,
          height: 12,
          },
      shadowOpacity: 0.8,
      shadowRadius: 16.00,
      elevation: 20,marginLeft:20,marginRight:20}} >
       <VStack space={1}>
       <Text style={{ fontSize: 20,color:'#06919D' }}>{item.subject}</Text>
       <Text style={{fontSize: 12, color:'#06919D' }}> Due Time: {item.due_time} {" "}<Icon name="clock-o"/> </Text>
       </VStack>
       </HStack>  
       </Pressable>}
            {imageIndex ==0&& <Pressable><View style={{width:320,height:70,backgroundColor:'#FFF6EA',borderRadius:10,shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 12,
      },
      shadowOpacity: 0.8,
      shadowRadius: 16.00,
      elevation: 20,marginLeft:30,marginRight:30}}>
        <Image style={{position:'absolute',top:10,left:10,width:50,height:50}} source={require('../../assests/tasksmedical.png')}/>
        <View style={{width:20,height:20,borderRadius:18, backgroundColor:'red',position:'absolute',top:10,left:48}}>
        <Heading style={{color:'white',fontSize:12,textAlign:'center',bottom:5}}>{carouselItems.length-1}</Heading>
        </View>
        <Heading style={{textAlign:'center',paddingTop:20,color:'#346751'}}>  My Daily Tasks</Heading>
        </View></Pressable> }
        </View> ); })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {carouselItems.map((image, imageIndex) => {
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
        style={[styles.normalDot, { width }]} />);})}
      </View>
      </View>
      </SafeAreaView>
      </View>
      <HStack space={3} justifyContent="center" >
      </HStack >
      {dashboardStore.ShowMenuFlag77 && <View style={{position:"absolute",top:120,left:"40%",zIndex:10}}>
      <View style={{backgroundColor:'#FAFAF6',height:108}}>
      <Box h="9" w="150" alignItems="flex-start">
      <Button onPress={()=>ClaimHandler()}  style={{borderWidth:.5,borderColor:'white'}} h="10" w="100%">Claim      </Button>
      <Button onPress={()=>deleteHadnler()} style={{borderWidth:.5,borderColor:'white'}} h="10" w="100%">Delete     </Button>
      <Button onPress={()=>SetReminder()}   style={{borderWidth:.5,borderColor:'white'}} h="10" w="100%">Set Reminder </Button>
      </Box>
      </View>
      </View>}
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 130,
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
    bottom:30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Tasks
