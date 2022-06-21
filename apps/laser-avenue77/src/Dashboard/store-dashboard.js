import {createSlice} from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";


export const dashboard=createSlice({
    name:'layout',
    initialState:{
        value:66,
        userToken:{
        email: "Mohammad@gmail.com",
        exp: 1654506398,
        firstName: "Mohammad",
        iat: 1654505498,
        isActive: true,
        lastName: "Haroun",
        middleName: "Fathi",
        phoneNumber: 785854588,
        photo: null,
        profileId: "5fd5d2f1-f63e-450b-b012-dd6d6bd64353",
        profileType: "PROVIDER",
        userId: "5fd5d2f1-f63e-450b-b012-dd6d6bd64353"},
        
        ShowMenuFlag77:false,
        notificationModal:false
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    },
    saveToken:(state,action)=>{
        let decoded = jwt_decode(action.payload);
        console.log('decodeddecodeddecoded',decoded);
        state.userToken=decoded
        },
    changeShowMenuFlag77:(state,action)=>{
            state.ShowMenuFlag77=!state.ShowMenuFlag77
            },
    closeMenue:(state,action)=>{
                state.ShowMenuFlag77=false
                },
    notificationModalHandler:(state,action)=>{
                    state.notificationModal=!state.notificationModal
                    },
    closeModalHandler:(state,action)=>{
                        state.notificationModal=false
                        },
    }
})



export const {increment,saveToken,changeShowMenuFlag77,closeMenue,notificationModalHandler,closeModalHandler} =dashboard.actions
export default dashboard.reducer 