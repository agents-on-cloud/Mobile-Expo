import React,{useState,useEffect} from 'react' 
import {Button,View,Text} from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import {incrementt} from '../store-marketing'


function increment() {
    const marketingStore = useSelector(state => state.marketing);
    const dispatch = useDispatch();

 

    return(
        <View>
            <Button title='Increment' onPress={()=>dispatch(incrementt(5))}  />
            <Text>{marketingStore.value}</Text>
            <Text>{marketingStore.x}</Text>
        </View>
    )
}
export default increment