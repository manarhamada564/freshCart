import { categoriesReducer } from "./categoriesSlice";
import { couterReducer } from "./counterSlice";

const { configureStore } = require("@reduxjs/toolkit");


export let store = configureStore({
  reducer: {
    //reducer
    counter: couterReducer,
    categories:categoriesReducer
  }
  });