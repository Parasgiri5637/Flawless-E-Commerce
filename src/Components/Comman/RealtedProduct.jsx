import Products from "./Products";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";


import styles from "../SCSS/ProductPage.module.scss";


async function fetchRelatedProduct(category) {
    const res = await axios.get(`http://localhost:3000/flowless?category=${category}`);
    return res.data;
  }
  
  function randomlyChangePosition(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return [];
    }
  
    const shuffleArr = [...arr];
    let currentIndex = shuffleArr.length;
    
  
    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
  
      currentIndex--;
  
      const temp = shuffleArr[currentIndex];
  
      shuffleArr[currentIndex] = shuffleArr[randomIndex];
      shuffleArr[randomIndex] = temp;
    }
  
    return shuffleArr.slice(0, 4);
  }
  
  
  
  
  const MemoizedRelatedProduct = React.memo(function RelatedProduct() {
  
    const location = useLocation();
    const relatedCategory = location.pathname.split("/");
    const { data: relatedData, isLoading, isError, error } = useQuery({
      queryKey: ["relatedProduct"],
      queryFn: () => fetchRelatedProduct(relatedCategory[2]),
      refetchOnWindowFocus: false,
    });

    const changedArray = randomlyChangePosition(relatedData);
  
    return (
      <div className={styles.relatedProduct}>
        <h1 className={styles.relatedItem__title}>Related Products</h1>
        <div className={styles.relatedItemContainer}>
          <Products
            productsArr={changedArray}
            isLoading={isLoading}
            isError={isError}
            error={error}
            itemLength={4}
          />
        </div>
      </div>
    );
  });
  
 
  export default MemoizedRelatedProduct;