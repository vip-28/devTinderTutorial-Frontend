import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        items: []
    },
    reducers:{
        addUser:(state,action)=>{
           state.items.push(action.payload);   
        },
        removeUser:(state,action)=>{
            state.items=[];
        }
    }
})
export const { addUser, removeUser }= userSlice.actions;

export default userSlice.reducer;