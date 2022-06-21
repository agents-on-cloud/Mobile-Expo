import {createSlice} from '@reduxjs/toolkit'

export const inventoryStore=createSlice({
    name:'inventory',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =inventoryStore.actions
export default inventoryStore.reducer 