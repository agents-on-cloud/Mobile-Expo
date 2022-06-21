import {createSlice} from '@reduxjs/toolkit'

export const hrStore=createSlice({
    name:'layout',
    initialState:{
        value:66,
        dueDate:''
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + 1
    },
    dueDateHandler:(state,action)=>{
        let d=new Date()
        const currentDate = d;
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1 + '';
        if (month.length === 1) month = '0' + month;
        let day = currentDate.getDate() + '';
        if (day.length === 1) day = '0' + day;
        state.dueDate=`${year+'-'+month +'-'+day}`
        },
    }
})



export const {increment,dueDateHandler} =hrStore.actions
export default hrStore.reducer 