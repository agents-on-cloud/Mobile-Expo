import {createSlice} from '@reduxjs/toolkit'

export const incidientStore=createSlice({
    name:'incidient',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =incidientStore.actions
export default incidientStore.reducer 