import {createSlice} from '@reduxjs/toolkit'

export const appointmentStore=createSlice({
    name:'appointment',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =appointmentStore.actions
export default appointmentStore.reducer