import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts:0,
    newArrivals:0,
    lovedByUser:0,
    isLoading:null,
    isError:null,
    error:null
};


  //* ============================================= Get NewArrivals Data

function getNewArrivals(items,index) {
    if (!Array.isArray(items)) {
        return [];
      }

    const selectedProducts = [];
    const categoryCount = {};
  
    for (const products of items) {
      const category = products.category;
  
      if (categoryCount[category] === undefined) {
        categoryCount[category] = 0;
      }
  
      if (categoryCount[category] < index) {
        selectedProducts.push(products);
        categoryCount[category]++;
      }
    }
  
    return selectedProducts;
  }
  
  //* ============================================= Get LovedByUser Data
  function getFilterItem(items,index){
    if (!Array.isArray(items)) {
        return [];
      }


      const bodylotion = items.filter(item => item.category === "bodylotion").filter(item => item.rating >= 4).slice(0,index);
      const cleanser = items.filter(item => item.category === "cleanser").filter(item => item.rating >= 4).slice(0,index);
      const moisturizer = items.filter(item => item.category === "moisturizer").filter(item => item.rating >= 4).slice(0,index);
      const sunscreens = items.filter(item => item.category === "sunscreens").filter(item => item.rating >= 4).slice(0,index);

    const lovedItem = [bodylotion,cleanser,moisturizer,sunscreens].flatMap(item => item)

    return lovedItem
  }




  //* =============================================== Reducer
const reducers = {
    addProducts:(state,action) => {
        state.allProducts = action.payload
        state.newArrivals =  getNewArrivals(action.payload,2)
        state.lovedByUser =  getFilterItem(action.payload,1)
        
    },
       setIsLoading:(state,action) => {
        state.isLoading = action.payload
       },
       setIsError:(state,action) => {
        state.isError = action.payload
       },
       setError:(state,action) => {
        state.error = action.payload
       }
}

  //* ============================================= Redux Toolkit Slice
const homeSlice = createSlice({
  name: "shopItem",
  initialState,
  reducers
});


export const {addProducts,setIsLoading,setIsError,setError} = homeSlice.actions;

 const {  reducer: shopReducer } = homeSlice; 

export default shopReducer;
