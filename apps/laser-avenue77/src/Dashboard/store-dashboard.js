import {createSlice} from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";


export const dashboard=createSlice({
    name:'layout',
    initialState:{
        value:66,
        userToken:{
            
    
},
        ShowMenuFlag77:false,
        notificationModal:false,
        modalVisible:false,
        AdditionalAppointmentData:[],
        FullViewAppData:{},
        FullViewAppFlag:false,
        providerId:'',
        employeeId:''
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    },
    saveToken:(state,action)=>{
        let decoded = jwt_decode(action.payload);
    
        state.userToken=decoded
        console.log('state.userTokenstate.userToken',state.userToken);
        
        
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
    modalVisibleHandler:(state,action)=>{
            state.modalVisible= !state.modalVisible
                            },
    AdditionalAppointmentDataHandler:(state,action)=>{
            state.AdditionalAppointmentData= action.payload
                                },  
    fullViewAppHandler:(state,action)=>{

            state.FullViewAppData= action.payload
            state.FullViewAppFlag= true
                                    },
    FullViewCloseHandler:(state,action)=>{
            state.FullViewAppFlag= false
             },
             saveProviderId:(state,action)=>{
                state.providerId= action.payload.providerUuid
                console.log(' state.providerId state.providerId', state.providerId);
             }
    }
})
export const {increment,saveToken,changeShowMenuFlag77,closeMenue,notificationModalHandler,closeModalHandler,modalVisibleHandler,AdditionalAppointmentDataHandler,fullViewAppHandler,FullViewCloseHandler,saveProviderId} =dashboard.actions
export default dashboard.reducer 