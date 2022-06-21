import {createSlice} from '@reduxjs/toolkit'

export const suppliersStore=createSlice({
    name:'suppliers',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =suppliersStore.actions
export default suppliersStore.reducer 