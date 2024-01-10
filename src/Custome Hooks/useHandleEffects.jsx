import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { handleUrlQuery,handleLengthStatus,handleCategoryProducts,handleSetPage, handleSearchSetPage,handlePrice} from "../Toolkit/FilterReducer";
import useUrl from "./useUrl";

export default function useHandleEffects(filterProArr) {
  const selector  = useSelector(state => state.filterProduct);
  const {searchUrlQuery,page,category,pricePro} = selector
  const dispatch =  useDispatch()
 
  const {urlSort,urlQuery,urlPage,urlAll,urlCategory,urlPrice,urlBrand} = useUrl()


    //* handle search query and data
    useEffect(() => {
        urlQuery && dispatch(handleUrlQuery(urlQuery || searchUrlQuery));
      }, [dispatch, urlQuery,urlSort,searchUrlQuery]);
     
      useEffect(() => {
     
        searchUrlQuery || urlQuery && dispatch(handleSearchSetPage(1))
      },[dispatch,searchUrlQuery,urlQuery])

      useEffect(() => {
        dispatch(handleLengthStatus(filterProArr?.length > 10 ? true : false) );
      },[dispatch,filterProArr?.length])
      
        //* handle category products routing 
  useEffect(() => {
    if(urlCategory || urlAll){
      dispatch(handleCategoryProducts(urlCategory || urlAll));
    }else  if(!urlPrice && !urlAll && !urlQuery && !urlBrand && !urlCategory){
      dispatch(handleCategoryProducts("all"))
      }else {
      dispatch(handleCategoryProducts(""))
    }
    },[dispatch,urlCategory,urlAll,urlQuery,urlBrand,urlPrice])

    //* handle Price filter routing
    useEffect(() => {
      if(urlPrice || urlAll){
        dispatch(handlePrice(urlPrice || urlAll));
      }else if(!urlPrice && !urlAll && !urlQuery && !urlBrand && !urlCategory){
        dispatch(handlePrice("all"));
      }else{
        dispatch(handlePrice(""));
      }
      urlPrice && dispatch(handleSearchSetPage(1))
  

    },[urlPrice,dispatch,urlAll,urlQuery,urlBrand,urlCategory])


    
    //* ================================================== Handle Paginate
    //* when there is one value is true other is false then true value should handle pagination
    useEffect(() => {
        dispatch(handleSetPage(+urlPage || page))},
        [dispatch,urlPage,page])

  //* when there no setSearchParam pagination start with 1
  useEffect(() => {
    urlPage ? dispatch(handleSetPage(+urlPage)) : !urlAll && !urlCategory ? dispatch(handleSetPage(1)) : null
 },[urlAll,urlCategory,dispatch,urlPage])
 
      //* when url is "all" then pagination start with 1 page 
  useEffect(() => {
    urlAll ? dispatch(handleSetPage(1)) : null
  },[dispatch,urlAll])

 
}


