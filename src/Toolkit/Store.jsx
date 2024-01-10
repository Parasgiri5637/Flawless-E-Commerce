import { configureStore,combineReducers } from "@reduxjs/toolkit";
import shopReducer from "./Reducers"; 
import filterProduct from "./FilterReducer"
import cartProduct from "./CartReducer"

const rootReducer = combineReducers({
  shopReducer,
  filterProduct,
  cartProduct
})


const store = configureStore({
  reducer:rootReducer
});

export default store;
