import { useDispatch, useSelector } from 'react-redux';
import  React,{useEffect,useState} from 'react';
import { View,ScrollView ,Text} from 'react-native';


function MyHr(params) {
    
    const tokenStore = useSelector(state => state.dashboard);
    const hrStore = useSelector(state => state.hrStore);
    
    return(
        <View>
<Text style={{marginTop:100,marginLeft:100}}>Besher start Write code here ..</Text>
        </View>
    )

}

export default MyHr