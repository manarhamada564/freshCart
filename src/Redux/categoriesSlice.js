import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiName = process.env.REACT_APP_API;
export let getCategories = createAsyncThunk('categories/getCategories', 
    async()=>{
        let {data} = await axios.get(`${apiName}categories`)
        return data.data;
});

let initialState = {categories: [], loading: false, isError: null};
let categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState,
    reducers: { 
    }
    // 2 methods for each asyncThunk [fullfilled, pending, rejected]
    , extraReducers: (builder)=>{
        builder.addCase(
            getCategories.fulfilled, (state, action)=>{
                state.loading = false;
                state.categories = action.payload;
            }
        )
        builder.addCase(
            getCategories.pending, (state)=>{
                state.loading = true;
            }
        )
    }
    

});
export let categoriesReducer = categoriesSlice.reducer;