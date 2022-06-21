// import React from "react"
// import {  Text, View,TouchableOpacity } from "react-native";


// const navigationView = () => (
//     <View style={[styles.container, styles.navigationContainer]}>
//       <View style={{position:'absolute' ,top:100}}>
// <Avatar style={{marginLeft:80,marginBottom:20}} size="80px" source={{
//       uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
//     }} />
   
//    <Text style={{fontSize:20,color:'black'}}> {dashboardStore.userToken.firstName} {' '}{dashboardStore.userToken.middleName} {dashboardStore.userToken.lastName}</Text>
//    <Text style={{fontSize:14,color:'grey',justifyContent:'center',alignItems:'center',alignContent:'center',textAlign:'center'}}> {dashboardStore.userToken.email}</Text>
//    </View>
//    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginTop:190}}>
//     <View >
//    <TouchableOpacity style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10, shadowColor: "#000",
// shadowOffset: {
// width: 0,
// height: 12,
// },
// shadowOpacity: 0.58,
// shadowRadius: 16.00,

// elevation: 24,
//       }} >
//         <Icon style={{fontSize:35,color:'#1EA0BD'}} name="home-circle"/>
   
//     <Text > Home</Text>
//   </TouchableOpacity>
//   </View>
//   <View >
//   <TouchableOpacity style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',borderRadius:10,alignItems:'center',margin:10,  shadowColor: "#000",
// shadowOffset: {
// width: 0,
// height: 12,
// },
// shadowOpacity: 0.58,
// shadowRadius: 16.00,

// elevation: 24,}} >
//     <Icon style={{fontSize:35,color:'#1EA0BD'}} name="kodi"/>
//    <Text >Incident</Text>
//  </TouchableOpacity>
//  </View>
//  <View >
//  <TouchableOpacity style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',alignItems:'center',margin:10,  shadowColor: "#000",
// shadowOffset: {
// width: 0,
// height: 12,
// },
// shadowOpacity: 0.58,
// shadowRadius: 16.00,

// elevation: 24,borderRadius:10}}>
//       <Icon style={{fontSize:35,color:'#1EA0BD'}} name="clipboard-text-multiple-outline"/>
//    <Text >Activity</Text>
//  </TouchableOpacity >
//  </View>
//  <View >
//  <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={{width:100,height:100,backgroundColor:'#F9F9F9',justifyContent:'center',alignItems:'center',margin:10,borderRadius:10,shadowColor: "#000",
// shadowOffset: {
// width: 0,
// height: 12,
// },
// shadowOpacity: 0.58,
// shadowRadius: 16.00,

// elevation: 24,}} >
//             <Icon style={{fontSize:35,color:'#1EA0BD'}} name="logout"/>
//    <Text >Logout</Text>
//  </TouchableOpacity>
//  </View>

//    </View>
//      </View>
//      );

//      export default navigationView