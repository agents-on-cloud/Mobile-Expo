import {createSlice} from '@reduxjs/toolkit'

export const layoutStore=createSlice({
    name:'layout',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =layoutStore.actions
export default layoutStore.reducer 