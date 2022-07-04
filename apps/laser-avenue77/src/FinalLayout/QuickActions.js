import React from "react";
import { Box, IconButton,  PresenceTransition} from "native-base";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {isQuickActionsOpenHandler} from '../FinalLayout/store-finalLayout'

function QuickActions() {
    const layoutSore = useSelector(state => state.finalLayoutStore);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
return(

<Box alignItems="center" style={{position:'absolute',bottom:120,right:20,zIndex:layoutSore.isQuickActionsOpen?10:0}}>
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
}} w="50" h="50" mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon   name="account-multiple-check" 
  style={{fontSize:30}}
  color="warmGray.50" />} />
  <IconButton onPress={ ()=> {navigation.navigate('createTask')
dispatch(isQuickActionsOpenHandler())  
}}  w="50" h="50" mb="4" variant="solid" bg="yellow.400" colorScheme="yellow" borderRadius="full" icon={<Icon  style={{fontSize:30}}   name="table-large-plus" color="warmGray.50" />} />
  <IconButton onPress={ ()=> {navigation.navigate('calendar')
dispatch(isQuickActionsOpenHandler())  
}}  w="50" h="50" mb="4" variant="solid" bg="red.400" colorScheme="yellow" borderRadius="full" icon={<Icon  style={{fontSize:30}}   name="calendar-plus" color="warmGray.50" />} />
  <IconButton onPress={ ()=> {navigation.navigate('createNotification')
dispatch(isQuickActionsOpenHandler())  
}}  w="50" h="50" mb="4" variant="solid" bg="orange.400" colorScheme="yellow" borderRadius="full" icon={<Icon  style={{fontSize:30}}   name="bell-plus" color="warmGray.50" />} />
</PresenceTransition>
</Box>
 )
}


export default QuickActions