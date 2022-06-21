import {createSlice} from '@reduxjs/toolkit'

export const facilitiesStore=createSlice({
    name:'facilities',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =facilitiesStore.actions
export default facilitiesStore.reducer 