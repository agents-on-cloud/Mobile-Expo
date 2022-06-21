import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable, Box, HStack, Spacer, Flex, Checkbox, Center, NativeBaseProvider, VStack ,Spinner,Heading,Avatar,Divider,Button ,PresenceTransition } from "native-base";
import Icon from '@expo/vector-icons/FontAwesome';
import axios from 'axios'
import requestBuilder from '../requestRebuilder  '
import {emptySearchInput,saveRecentSearches,DeleteRecentSearch,saveUniqueRecentSearches} from './search-store'
import {componentsLoaderHandler} from '../FinalLayout/store-finalLayout'
import { SwipeListView } from "react-native-swipe-list-view";




export default function searchSreen({navigation}) {
  const searchStore = useSelector(state => state.searchStore);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [NodataFlag, setNodataFlag] = useState(false);
  // const [firstRender, setFirstRender] = useState(0);
  const [groupValues, setGroupValues] = useState([]);
  const [deleteRecentSearch, setDeleteRecentSearch] = useState([]);
  const [testARR,settestARR]=useState([1,2,3,4])
  const [searchResults,setSearchResults]=useState([])
  const [FinalRecentSearches,  setFinalRecentSearches]=useState([])

  useFocusEffect(
    React.useCallback(() => {
      setNodataFlag(false)
      // console.log('77777777777777',searchStore.recentSearches);
      // setDeleteRecentSearch(searchStore.recentSearches)
    
      dispatch(emptySearchInput())
      if (searchStore.searchInput !=="") {
    
        getSearchData(searchStore.searchInput)     
                           
      }else{
        setSearchResults([])
      }
    }, [searchStore.searchInput,searchStore.searchFlag])
  );
  
function getRecentSearch() {
// Some array I got from async call

const uniqueAddresses = Array.from(new Set(searchStore.recentSearches.map(a => a.entityID)))
 .map(id => {
   return searchStore.recentSearches.find(a => a.entityID === id)
 })
//  console.log();

 dispatch(saveUniqueRecentSearches([...uniqueAddresses]))

//  setFinalRecentSearches(uniqueAddresses)
//  console.log('uniqueAddresses',FinalRecentSearches);

}

  async function getSearchData(payload) {
  console.log('sssssssssssssssss',payload);
  setSearchResults([])
  let allResults=[]
if (groupValues.length !==0 ) {
if (groupValues.includes('providers')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "providers", "/universalSearch/:test","get",{test:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
      } catch (error) {
        console.log('errrrore',error);
      }}
if (groupValues.includes('rooms')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "facilities", "/room/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        console.log('errrrore',error);
      }
}
if (groupValues.includes('consumers')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "consumers", "/consumers/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        console.log('wwwwwwwwwwwwwwwwww',error);
      }
  
}
if (groupValues.includes('services')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "services", "/services/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        console.log('errrrore',error);
      }
  
}
if (groupValues.includes('equipment')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "facilities", "/equipment/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        console.log('errrrore',error);
      }
}
if (groupValues.includes('inventory')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "inventory", "/items/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        console.log('errrrore',error);
      }
}
if (groupValues.includes('appointments')) {
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "appointments", "/appointments/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
        
      } catch (error) {
        dispatch(componentsLoaderHandler()) 
        console.log('errrrore',error);
      }
}
console.log('allResultsallResults',allResults);
setSearchResults(allResults.flat())

if (allResults.flat()==0) {
  setNodataFlag(true)
}
} 
else {
  setSearchResults([])
  let allSearchResults=[]
  try {
    dispatch(componentsLoaderHandler()) 
        await axios(requestBuilder( "appointments", "/appointments/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler()) 
  } catch (error) {
    dispatch(componentsLoaderHandler()) 
    console.log('appointmentsappointments',error)
  }
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "inventory", "/items/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allSearchResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
  } catch (error) {
    dispatch(componentsLoaderHandler()) 
    console.log('erroinventoryinventoryrerror',error)
  }
try {
  dispatch(componentsLoaderHandler()) 
  await axios(requestBuilder( "providers", "/universalSearch/:test","get",{test:payload})).then((results)=>allSearchResults.push(results.data));
  dispatch(componentsLoaderHandler()) 
} catch (error) {
  dispatch(componentsLoaderHandler()) 
  console.log('providersproviders',error);
}

  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "services", "/services/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allSearchResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
    
  } catch (error) {
    dispatch(componentsLoaderHandler()) 
    console.log('servicesservices',error)
  }
  try {
    dispatch(componentsLoaderHandler()) 
    await axios(requestBuilder( "facilities", "/room/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allSearchResults.push(results.data));
    dispatch(componentsLoaderHandler()) 
    
  } catch (error) {
    dispatch(componentsLoaderHandler()) 
    console.log('roomroomroom',error)
  }
  try {
  dispatch(componentsLoaderHandler()) 
  await axios(requestBuilder( "facilities", "/equipment/universalSearch/:keyword","get",{keyword:payload})).then((results)=>allSearchResults.push(results.data));
  dispatch(componentsLoaderHandler()) 
  } catch (error) {
    dispatch(componentsLoaderHandler()) 
  console.log('equipmentequipment',error)
  }
    setSearchResults(allSearchResults.flat())
    if (allSearchResults.flat()==0) {
      setNodataFlag(true)
    }
}
  
}

function handleRecentSearches(item) {
  // getRecentSearch()
  dispatch(saveRecentSearches(item))
}
function DeleteSearchItem(payload) {
  console.log('payloadpayload',payload);
  let finalArr=[]
 let afterDelete= searchStore.recentSearches
 for (let i = 0; i < afterDelete.length; i++) {
  if (afterDelete[i].entityID !==payload.entityID) {
    finalArr.push(afterDelete[i])
  }
  
 }
 
console.log('finalArrfinalArrfinalArr',finalArr);
  dispatch(DeleteRecentSearch(finalArr))
}

  const renderItem = ({
    item,
    index
  }) => 
  <Box  alignItems="center" >
  <Pressable onPress={()=>handleRecentSearches(item)}>
    {({
    isHovered,
    isFocused,
    isPressed
  }) => {
    return <Box  w="400" mt="10" borderWidth="1" borderColor={'grey'} shadow="3" bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} p="5" rounded="8" style={{

      transform: [{
        scale: isPressed ? 0.96 : 1
      }],
      }}>
        <Text bold style={{position:'absolute',top:5,left:"50%",color:'black'}}>{item.type.toUpperCase()}</Text>
          <HStack alignItems="center">
          <Avatar size="48px" source={{
      uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
      }} />
      
            <Flex direction="row" h="7" p="1"mt="2" ml="3" >
    <Text>{item.label1} : {item.value1}</Text>
    <Divider h="6" bg="emerald.500" thickness="2" mx="2" orientation="vertical" ml="6" mr="6" />
    <Text>{item.label2} : {item.value2}  </Text>
    
  </Flex>
          </HStack>
          <HStack w="300" mt="2">
          <HStack w="180"  >
          <Text mt="2"  style={{fontSize:12}} color="coolGray.700">
          {item.label3} :  {item.value3}
          </Text>
          </HStack>
          <HStack  w="150">
          <Text mt="2" style={{fontSize:12}}  color="coolGray.700">
          {item.label4} :  {item.value4}
          </Text>
          </HStack>
          </HStack>
          <Flex>
          <HStack  mt="2">
          <Text  style={{fontSize:12}} color="coolGray.800" mt="2" fontWeight="medium"   alignSelf="flex-start">
             {/* <Icon name="clock-o" mr="5" /> */}
             {item.label5} :  {item.value5}
               
              </Text> 
              <Text  style={{fontSize:12,position:'absolute',left:'50%'}} color="coolGray.800" ml="10" mt="2" fontWeight="medium"   alignSelf="flex-start">
                {/* <Icon name="clock-o"/> */}
                {item.label6} :  {item.value6}
              </Text>
              </HStack>
          </Flex>
        </Box>;
  }}
  </Pressable>
</Box>
  // <Box shadow={5} style={{borderWidth:.4,borderColor:'teal'}}>
  // //     <Pressable onPress={() => console.log("You touched me")} _dark={{
  //     bg: "coolGray.800"
  //   }} _light={{
  //     bg: "white"
  //   }}>
  //       {({
  //       isHovered,
  //       isFocused,
  //       isPressed
  //     }) => { return  <Box pl="4" pr="5" py="2"  bg={item.is_unread ? "coolGray.300" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
  //       transform: [{
  //         scale: isPressed ? 1.08 : 1
  //       }],

  //     }} >
  //         <HStack alignItems="center" space={3}>
  //           <Avatar size="48px" source={{
  //           uri: "https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png"
  //         }} />
  //           <VStack>
  //             <Text color="coolGray.800" _dark={{
  //             color: "warmGray.50"
  //           }} bold>
  //               Sender Name: {item.sender_name}
  //             </Text>
  //             <Text color="coolGray.600" _dark={{
  //             color: "warmGray.200"
  //           }}>
  //               {item.notification_subject}
  //             </Text>
  //           </VStack>
  //           <Spacer />
  //           <Text style={{position:'absolute',right:2}} fontSize="xs" color="coolGray.800" _dark={{
  //           color: "warmGray.50"
  //         }} alignSelf="flex-start">
  //             {`${parseInt(item.createdAt.slice(11,16)) +3}: ${item.createdAt.slice(13,16)}` }
  //           </Text>
  //         </HStack>
  //       </Box>}}
  //     </Pressable>
  //   </Box>;
  const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2" >
    


      <Pressable style={{position:"absolute",right:14,top:45,borderRadius:10}} w="70" h="130" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => console.log('ooo')} _pressed={{
      opacity: 0.5
    }}>
        <VStack alignItems="center" space={2}>
          <Icon name="trash-o"  style={{color:"white" ,fontSize:28}} />
          <Heading style={{color:"white",fontSize:15}}  fontSize="xs" fontWeight="medium">
            Delete
          </Heading>
        </VStack>
      </Pressable>

      <Pressable style={{position:"absolute",right:86,top:45,borderRadius:10}} w="70" h="130" cursor="pointer" bg="yellow.500" justifyContent="center" onPress={() => console.log('ooo')} _pressed={{
      opacity: 0.5
    }}>
        <VStack alignItems="center" space={2}>
          <Icon name="eye-slash"  style={{color:"white" ,fontSize:28}}  />       
          <Heading style={{color:"white",fontSize:15}}   fontWeight="medium">
            Watch
          </Heading>
        </VStack>
      </Pressable>

      <Pressable style={{position:"absolute",right:159,top:45,borderRadius:10}} w="70" h="130" cursor="pointer" bg="blue.500" justifyContent="center" onPress={() => console.log('ooo')} _pressed={{
      opacity: 0.5
    }}>
        <VStack alignItems="center" space={2}>
          <Icon name="edit"  style={{color:"white" ,fontSize:28}}/>
          <Heading style={{color:"white",fontSize:15}}  fontSize="xs" fontWeight="medium">
            Edit
          </Heading>
        </VStack>
      </Pressable>
      {/* //////////////////////////////////// */}
 
      {/* ////////////////////////////////////////////////// */}

    </HStack>;


  return (
   
  
         <ScrollView  >
          {/* <Button onPress={()=>console.log('groupValues',groupValues)}>test</Button> */}
           <TouchableOpacity style={{width:80,height:40,backgroundColor:'#DDDDDD',borderRadius:10,paddingTop:8,marginLeft:10,marginTop:5}} onPress={() => setIsOpen(!isOpen)}>
     <Text>  {isOpen ? "Show Less" : "Catagories"}</Text>  
     </TouchableOpacity>
     {isOpen && <View style={{position:'absolute',right:10,top:-20}} flex={1} px="3">
    <PresenceTransition visible={isOpen} initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        duration: 500
      }
    }}>
        <View style={{ marginTop:30,backgroundColor:'#DDDDDD',borderRadius:10,width:300,height:150}} >
                 
      <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
      <View style={{flexDirection:'column',padding:10}}>
      <View style={{paddingBottom:7}}>
      <Checkbox size="md"  value="consumers" >Consumers</Checkbox>
      </View>
      <View style={{paddingBottom:7}}>
      <Checkbox size="md" value="rooms">Rooms</Checkbox>
      </View>
      <Checkbox size="md" value="services">Services</Checkbox>
      </View>
      <View style={{flexDirection:'column',position:'absolute',left:'50%',padding:10}}>
      <View style={{paddingBottom:7}}>
      <Checkbox size="md" value="providers" >Providers</Checkbox>
    </View>
    <View style={{paddingBottom:7}}>
      <Checkbox size="md" value="inventory">Inventory</Checkbox>
      </View>
      <Checkbox size="md" value="equipment">Equipments</Checkbox>
      </View>
      <View style={{marginLeft:'26%'}}>
      <Checkbox size="md" value="appointments">Appointments</Checkbox>
      </View>
    </Checkbox.Group>
  
        </View>
      </PresenceTransition>
            </View>}
         
<View style={{ marginTop:isOpen?120:0,marginBottom:50}}>
<SwipeListView data={searchResults} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-224} leftOpenValue={130} previewRowKey={"0"} previewOpenValue={-40} previewOpenDelay={3000}  />



</View>
{searchResults.length ==0 &&<View>
{ NodataFlag && <Text style={{position:'absolute',left:'30%',marginBottom:50,fontSize:25}}>No Data Found</Text>}
  <ScrollView>
  <Heading bold style={{color:'black',marginLeft:10,marginTop:NodataFlag ?60:0}}>Recent searches</Heading>

{searchStore.recentSearches.length !==0 && searchStore.recentSearches.map(item=>
<Pressable>
{({
        isHovered,
        isFocused,
        isPressed
      }) => {
 return <View style={{width:'100%',height:70,backgroundColor:isPressed?'#DDDDDD':'white',marginBottom:5,flexDirection:'row'}}>
 <Avatar mt='3' ml="2" size="48px" source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
          }} />
          <View>
         <Text style={{marginLeft:10,marginTop:15}}>Category: {item.type}</Text> 
         <Text   style={{marginLeft:10,marginTop:3}}>{item.value1}</Text> 
      
         </View>
         <TouchableOpacity onPress={()=> DeleteSearchItem(item)} style={{position:'absolute',right:20,top:'30%',backgroundColor:'#DDDDDD',width:30,height:30}}>
         <Icon  name="close" style={{fontSize:30,paddingLeft:3}}  />
         </TouchableOpacity>
</View>}}
</Pressable>


  
  ) }
  </ScrollView>

</View>}
{/* <View style={{marginTop:100}}>
  
</View> */}
        </ScrollView>
 
   
   

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
