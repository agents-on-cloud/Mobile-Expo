import {createSlice} from '@reduxjs/toolkit'


export const searchStore=createSlice({
    name:'provider',
    initialState:{
        value:66,
        searchInput:'',
        searchFlag:false,
        recentSearches:[]
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    },
    searchInputHandler:(state,action)=>{
        state.searchInput = action.payload,
        state.searchFlag = !state.searchFlag

        },
    emptySearchInput:(state,action)=>{
            state.searchInput =""
            },
    saveRecentSearches:(state,action)=>{
        state.recentSearches= [...state.recentSearches,action.payload]
        const uniqueAddresses = Array.from(new Set(state.recentSearches.map(a => a.entityID)))
        .map(id => {
          return state.recentSearches.find(a => a.entityID === id)
        })
     state.recentSearches=uniqueAddresses
        
        // state.recentSearches=recent
        // state.recentSearches= 
        // console.log('/////////////////',action.payload);
        // state.recentSearches.push(action.payload)
        // console.log('laaaaaaaaaaaaaaaaaith',JSON.stringify(state.recentSearches)  );
                },
     DeleteRecentSearch:(state,action)=>{
                    state.recentSearches=action.payload
                    console.log('/////////////////',action.payload);
                    console.log('====================================');
                    console.log(state.recentSearches);
                    console.log('====================================');

                    // console.log('888888888888',action.payload);
                    // let newRecentSearches=[]
                    // for (let i = 0; i < state.recentSearches.length; i++) {
                    //     console.log('state.recentSearches[i]',state.recentSearches[i]);
                    //     if (state.recentSearches[i] !== action.payload.entityID) {
                    //         newRecentSearches.push(state.recentSearches[i])
                    //     }
                      
                        
                    // }
                    // state.recentSearches = newRecentSearches
                    // console.log('state.recentSearchesstate.recentSearches',newRecentSearches);
                    },
                    saveUniqueRecentSearches:(state,action)=>{
                        console.log('action.payload',action.payload);
                        state.recentSearches=action.payload
                        console.log('state.recentSearches',state.recentSearches);
                    }
    }
})



export const {increment,searchInputHandler,emptySearchInput,saveRecentSearches,DeleteRecentSearch,saveUniqueRecentSearches} =searchStore.actions
export default searchStore.reducer 