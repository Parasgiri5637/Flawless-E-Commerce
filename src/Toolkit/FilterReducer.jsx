import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products:null,
    page:1,
    searchPage:1,
    totalProducts:null,
    totalPages:null,
    isLoading:null,
    isError:null,
    error:null,
    allIsLoading:null,
    allIsError:null,
    allError:null,
    sorted:"",
    category:"",
    allPro:"",
    searchQuery:"", 
    searchResult:"",
    searchUrlQuery:"",
    lengthStatus:false,
    pricePro:"",
    priceItemLength:null,
    filterBtn:false
};

function onSorting(sortVal, itemArr) {
    switch (sortVal) {
      case "lowest":
        return itemArr && itemArr.slice().sort((a, b) => a.price - b.price);
      case "highest":
        return itemArr && itemArr.slice().sort((a, b) => b.price - a.price);
      case "a-z":
        return itemArr && itemArr.slice().sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return itemArr && itemArr.slice().sort((a, b) => b.title.localeCompare(a.title));
      default:
        return itemArr;
    }
  }
  

const reducers = {
    handleAllProducts: (state, action) => {
      const [allProducArr, allIsLoading, allIsError, allError] = action.payload
        state.totalProducts= allProducArr;
        state.allIsLoading = allIsLoading
        state.allIsError = allIsError
        state.allError = allError
       state.totalPages = Math.ceil(Array.isArray(allProducArr) && allProducArr.length)
    },
    handleSearchProducts:(state, action) => {
      const [filterProArr, filterIsLoading, filterIsError, filterError,page ] = action.payload;
      let itemArr;
      if(Array.isArray(filterProArr) && filterProArr.length > 10){
         itemArr = Array.isArray(filterProArr) ?  filterProArr.slice(page * 10 - 10,page * 10) : [];
      }else {
         itemArr = Array.isArray(filterProArr) ?  filterProArr : [];
      }
     
      state.priceItemLength = Array.isArray(filterProArr) && filterProArr.length 
      state.products = onSorting(state.sorted, itemArr);
      state.isLoading = filterIsLoading;
      state.isError = filterIsError;
      state.error = filterError
    },
    handleSetPage:(state, action) => {
        state.page = action.payload;
    },
    handleSearchSetPage:(state, action) => {
      state.searchPage = action.payload;
    },  
    handleSorting: (state, action) => {
        state.sorted = action.payload;
        const itemArr = Array.isArray(state.products) ? state.products : null;
        state.products = onSorting(state.sorted, itemArr)
      },
   handleCategoryProducts:(state,action) => {
        state.category = action.payload
    },
  handleSelctedPro:(state,action) => {
    state.status = action.payload
  },
  handleAllUrl:(state,action) => {
    state.allPro = action.payload
  },
  handleSearchQuery: (state, action) => {
    state.searchQuery = action.payload;

    if (!state.searchQuery || state.searchQuery.length < 0) {
      state.searchResult = [];
    } else {
      const filteredItems = state.totalProducts.filter(item =>
        item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      ).slice(0, 5);
      if(filteredItems){
        state.searchResult = filteredItems;
      }
    }
  },
  handleUrlQuery:(state,action) => {
    state.searchUrlQuery = action.payload
    state.searchQuery = state.searchUrlQuery
  },
  handleSearchResult:(state,action) => {
    state.searchResult = action.payload
  },
  handleLengthStatus:(state,action) => {
    state.lengthStatus = action.payload
  },
handlePrice:(state,action) => {
  state.pricePro = action.payload
},
handleFilterBtn:(state,action) => {
  state.filterBtn = action.payload
}
};

const filterReducer = createSlice({
    name: "filterItem",
    initialState,
    reducers,
});

export const {handleAllProducts,handleFilterProduct, handleSorting,handleSetPage,handleCategoryProducts,handleSelctedPro,handleAllUrl, handleSearchQuery,handleUrlQuery,handleSearchResult,handleSearchSetPage, handleLengthStatus,handleSearchProducts,handlePrice,handleFilterBtn} = filterReducer.actions;
export default filterReducer.reducer;



