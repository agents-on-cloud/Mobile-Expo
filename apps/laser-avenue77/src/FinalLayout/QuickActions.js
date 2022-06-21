import React from "react";
import { Box, useDisclose, IconButton, Stagger, HStack, Center, NativeBaseProvider, PresenceTransition} from "native-base";

import {Text,TouchableOpacity,StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {isQuickActionsOpenHandler} from '../FinalLayout/store-finalLayout'

function QuickActions() {
    const layoutSore = useSelector(state => state.finalLayoutStore);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    


return(

<Box alignItems="center" style={{position:'absolute',bottom:120,left:20,zIndex:layoutSore.isQuickActionsOpen?10:0}}>
{/* <Stagger visible={layoutSore.isQuickActionsOpen} initial={{
opacity: 0,
scale: 0,
translateY: 20
}} animate={{
translateY: 0,
scale: 1.1,
opacity: 1,
transition: {
// type: "spring",
mass: 5,
stagger: {
offset: 30,
reverse: true
}
}
}} exit={{
// translateY: 34,
scale: 0.5,
opacity: 0,
transition: {
  duration: 100,
  stagger: {
    offset: 30,
    reverse: true
  }
}
}}> */}

<PresenceTransition visible={layoutSore.isQuickActionsOpen} initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        duration: 500
      }
    }}>
  <IconButton onPress={ ()=> {navigation.navigate('HrProvider')
dispatch(isQuickActionsOpenHandler())  
}} w="50" h="50" mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon   name="check-circle-outline" 
  style={{fontSize:25}}
  _dark={{
  color: "warmGray.50"
}} color="warmGray.50" />} />
  <IconButton onPress={ ()=> {navigation.navigate('createTask')
dispatch(isQuickActionsOpenHandler())  
}}  w="50" h="50" mb="4" variant="solid" bg="yellow.400" colorScheme="yellow" borderRadius="full" icon={<Icon  style={{fontSize:20}} _dark={{
  color: "warmGray.50"
}}  name="add-task" color="warmGray.50" />} />
  <IconButton onPress={ ()=> {navigation.navigate('calendar')
dispatch(isQuickActionsOpenHandler())  
}}  w="50" h="50" mb="4" variant="solid" bg="red.400" colorScheme="yellow" borderRadius="full" icon={<Icon  style={{fontSize:20}} _dark={{
  color: "warmGray.50"
}}  name="event-note" color="warmGray.50" />} />
  {/* <IconButton w="50" h="50" mb="4" variant="solid" bg="teal.400" colorScheme="teal" borderRadius="full" icon={<Icon    _dark={{
  color: "warmGray.50"
}}  name="video" color="warmGray.50" />} />
  <IconButton w="50" h="50" mb="4" variant="solid" bg="red.500" colorScheme="red" borderRadius="full" icon={<Icon   name="photo-library" _dark={{
  color: "warmGray.50"
}} color="warmGray.50" />} /> */}
</PresenceTransition>
{/* </Stagger> */}
</Box>




    )
    
}



export default QuickActions