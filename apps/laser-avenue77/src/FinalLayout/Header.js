import  React,{useState,useEffect,useRef} from 'react';
import { View } from 'react-native';
import { NativeBaseProvider, Box, Text, Heading,  HStack, Center, Pressable,IconButton,Avatar } from "native-base";
import Icon from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DrawerLayoutAndroid, StyleSheet ,ImageBackground} from "react-native";
import {HeaderSearchHandler} from '../FinalLayout/store-finalLayout'



 function Header({drawHandler}) {
  const layoutSore = useSelector(state => state.finalLayoutStore);
  const dispatch = useDispatch();

 const drawer = useRef(null);
 const [selected, setSelected] = useState(0);
 const navigation = useNavigation();

 
function searchHandler() {
dispatch(HeaderSearchHandler())
  navigation.navigate('searchSreen')
}

  return (
        <View >
        <ImageBackground  style={{borderBottomWidth:1,borderColor:'white',zIndex:-1}}  source={require('../assests/HeaderBackground.png')} resizeMode="cover" >
        <Box style={{borderWidth:.7,borderColor:"#247881"}}  safeAreaTop width="100%"  alignSelf="center">
        <Center flex={1}></Center>
        <HStack h="60" bg="grey.200" alignItems="center" safeAreaBottom shadow={6} spaceBetween={2}>
        <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => console.log('llll') }>
        <Center>
        <Heading style={{color:"white",width:250,position:"absolute",left:130}} bold fontSize="19">
                Laser Avenue
        </Heading>
        </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => console.log('llll') }>
        <Center>
        </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() =>  console.log('llll')}>
        <Center>
        <IconButton  onPress={()=>searchHandler() } bg="#EEEEEE" style={{borderRadius:20,position:'absolute',left:-170}}>
        <Icon mb="1"   style={{fontSize:20,color:"black",paddingLeft:2 }}    name="search" />
        </IconButton>
        </Center>
        </Pressable>
        <Pressable cursor="pointer" py="2" flex={1} onPress={() => drawHandler.current.openDrawer()}>
        <Center>
        <Icon mb="1"   style={{fontSize:28,color:"white",paddingLeft:20 }}    name="bars" />
        </Center>
        </Pressable>
        </HStack>
        </Box>
        </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default Header