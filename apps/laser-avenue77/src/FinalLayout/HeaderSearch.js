import React,{useState} from 'react'
import {View,TouchableOpacity,TextInput,StyleSheet,Text} from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons';
import {HeaderSearchHandler} from '../FinalLayout/store-finalLayout'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {searchInputHandler} from '../Search/search-store'
function HeaderSearch() {
    const navigation = useNavigation();
    const layoutSore = useSelector(state => state.finalLayoutStore);
    const dispatch = useDispatch();
    const [text, onChangeText] = useState("");

    function searchSubmit() {
        dispatch(searchInputHandler(text))
        console.log('Hello!');
      }
    return (
<View>
<View style={{flexDirection:'row',height:70,width:'100%',backgroundColor:'#F6FBF4',borderBottomWidth:.3,borderColor:'black',marginTop:30}}>
<TouchableOpacity onPress={()=>{
navigation.goBack()
dispatch(HeaderSearchHandler())

}} style={{marginTop:15,marginLeft:10,backgroundColor:'#EEEEEE',borderRadius:100,height:40,width:40}}> 
<Icon style={{fontSize:30,paddingTop:5,paddingLeft:5}} name="arrow-back"/>
</TouchableOpacity>
<TextInput
style={styles.input}
onChangeText={onChangeText}
value={text}
onSubmitEditing={searchSubmit}/>
</View>
</View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width:'80%',
      margin: 12,
      padding: 10,
      borderRadius:20,
      backgroundColor:'#DDDDDD'
    },
  });

export default HeaderSearch  
