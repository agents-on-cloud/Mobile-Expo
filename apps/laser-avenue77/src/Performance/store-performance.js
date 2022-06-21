import {createSlice} from '@reduxjs/toolkit'

export const performanceStore=createSlice({
    name:'performance',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =performanceStore.actions
export default performanceStore.reducer 