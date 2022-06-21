import {createSlice} from '@reduxjs/toolkit'

export const consumersStore=createSlice({
    name:'consumers',
    initialState:{
        value:66







    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload

    }
    }
})



export const {increment} =consumersStore.actions
export default consumersStore.reducer 