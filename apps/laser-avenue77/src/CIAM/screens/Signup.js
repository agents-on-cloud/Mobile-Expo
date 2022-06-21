import  React,{useState,useEffect} from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import axios from 'axios'
import {Text} from 'react-native'

import {ottpFlagHandler,ottpPhoneHandler} from '../store-CIAM'
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

const Example = () => {
  
  function requestBuilder(serviceName, path, method, data) {
    try {
        let json = {
            method: "POST",
            url: "https://api.development.agentsoncloud.com/external/public",
            headers: {
                'requsted-service': serviceName,
                "requsted-path": path,
                "requsted-method": method
            },
            data: data,
        }
        return json
    } catch (error) {
        return error
    }
  }


  const dispatch = useDispatch();
  const [userObj,setUserObj]=useState({
    "role":"admin",
    "email": "",
    "password": "",
    "name": "",
    "mobile": ""
})




const signUpHandler = async () => {

  try {
    dispatch(ottpPhoneHandler(userObj.mobile.slice(1,userObj.mobile.length)))
   await axios(requestBuilder('ciam','/users/signup','post',userObj))
    dispatch(ottpFlagHandler())

    
  }catch (error){
console.log('gggggggg',error);
  } 

  }


  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input   onChangeText={value => setUserObj({ ...userObj,
        name: value
      })}  />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={value => setUserObj({ ...userObj,
        email: value
      })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input placeholder=" " width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Text >+962</Text>} onChangeText={value => setUserObj({ ...userObj,
        mobile:`+962${value}`
      })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input onChangeText={value => setUserObj({ ...userObj,
        password: value
      })} type="password" />
          </FormControl>
         
      
          <Center>
          <Button onPress={()=>signUpHandler()} w="130" mt="2" colorScheme="teal">
            Sign up
          </Button>
          </Center>
        </VStack>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };