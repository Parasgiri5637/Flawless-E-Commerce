import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { Offline, Online } from "react-detect-offline";

import styles from "../SCSS/Home.module.scss";
import Products from "../Comman/Products";
import Error from "../Comman/Error";
 import {addProducts,setIsLoading,setIsError,setError} from "../../Toolkit/Reducers";
import { Link } from "react-router-dom";


function fetchNewArrivals() {
  return axios
    .get(`http://localhost:3000/flowless`)
    .then((response) => {
      if (response.status === 200) {
        return response
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .catch((error) => {
      throw error;
    });
}

export default function NewArrivals() {
  const dispatch = useDispatch();
  const newArrivals = useSelector(state => {
    return state.shopReducer.newArrivals
  });
 const { data, isLoading, isError, error } = useQuery({
    queryKey: ["skinProdcuts"],
    queryFn: fetchNewArrivals,
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
  dispatch(addProducts(data?.data))
  dispatch(setIsLoading(isLoading))
  dispatch(setIsError(isError))
  dispatch(setError(error))
},[dispatch,data,isLoading,isError,error])

 

  return (
    <div className={styles.newArrivals}>
      <div className={styles.newArrivals_title}>
        <h2>New Arrivals</h2>
        <Link to="/shop">
        <button>Shop Now</button>
        </Link>
      </div>

      <Online>
        <div className={styles.newProducts}>
          <Products
            productsArr={newArrivals}
            isLoading={isLoading}
            isError={isError}
            error={error}
            itemLength={8}
          />
        </div>
      </Online>
      <Offline>
        <Error />
      </Offline>
    </div>
  );
}
