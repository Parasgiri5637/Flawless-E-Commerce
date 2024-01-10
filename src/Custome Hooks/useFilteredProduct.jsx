import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { handleFilterProduct,handleSearchProducts } from "../Toolkit/FilterReducer";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import useUrl from "./useUrl";


function fetchSelectedProduct(url) {
    return axios
      .get(`http://localhost:3000/flowless${url}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(`Failed to fetch data ${error.message}`);
      });
  }
  

export default function useFilteredProduct() {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.filterProduct)
  const {searchPage,page} = selector
  const {productsUrl} =  useUrl()
  const [url,key] = productsUrl;

    const { data:filterProArr, isLoading:filterIsLoading, isError:filterIsError, error:filterError} = useQuery({
        queryKey: ["selectedProduct",  key],
        queryFn: () => fetchSelectedProduct(url),
        refetchOnWindowFocus: false,
        refetchOnReconnect:true,
      });

      console.log(filterProArr);

      const itemLength = Array.isArray(filterProArr) && filterProArr.length <= 10;
      useEffect(() => {
       dispatch( handleSearchProducts([ filterProArr, filterIsLoading, filterIsError, filterError,page ]))
      },[itemLength,dispatch, filterProArr, filterIsLoading, filterIsError, filterError,page])
   
      return {filterProArr,filterIsLoading,filterError,filterIsError}
}
