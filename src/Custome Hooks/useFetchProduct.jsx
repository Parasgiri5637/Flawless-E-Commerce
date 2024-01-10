import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { handleAllProducts } from "../Toolkit/FilterReducer";

function fetchAllpro() {
  return axios
    .get(`http://localhost:3000/flowless`)
    .then((response) => {
      if (response.status === 200) {
        return response?.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .catch((error) => {
      throw error;
    });
}

const useFetchProduct = function () {
  const dispatch = useDispatch()
  const { data: allProducArr, isLoading: allIsLoading, isError: allIsError, error: allError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllpro,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(handleAllProducts([allProducArr, allIsLoading, allIsError, allError ]));
  }, [dispatch,allProducArr, allIsLoading, allIsError, allError]);



  return {allProducArr, allIsLoading, allIsError, allError};
};

export default useFetchProduct;
