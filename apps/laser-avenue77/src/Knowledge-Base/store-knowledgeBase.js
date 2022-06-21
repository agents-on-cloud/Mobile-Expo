import {createSlice} from '@reduxjs/toolkit'

export const knowledgeBaseStore=createSlice({
    name:'knowledgeBase',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =knowledgeBaseStore.actions
export default knowledgeBaseStore.reducer 