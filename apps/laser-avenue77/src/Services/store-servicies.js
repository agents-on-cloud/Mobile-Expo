import {createSlice} from '@reduxjs/toolkit'

export const serviciesStore=createSlice({
    name:'servicies',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =serviciesStore.actions
export default serviciesStore.reducer 