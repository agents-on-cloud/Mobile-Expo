import {createSlice} from '@reduxjs/toolkit'

export const marketingStore=createSlice({
    name:'marketing',
    initialState:{
        value:66,
         x:40
    },
    reducers:{

        incrementt:(state,action)=>{
        state.value=state.value + action.payload
     




        }
    }
})
export const {incrementt} =marketingStore.actions
export default marketingStore.reducer