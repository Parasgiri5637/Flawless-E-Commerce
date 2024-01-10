import { useSelector } from "react-redux";

import Products from "../Comman/Products"
import style from "../SCSS/Shop.module.scss";



export default function ProductShop(){
  const selector  = useSelector(state => state.filterProduct);
  const {products,isLoading,isError,error} = selector
    return <div className={`${Array.isArray(products) && products.length <= 3 ? style.activeWidth : style.shopItem__Products}`}>
          <Products
            productsArr={products}
            isLoading={isLoading}
            isError={isError}
            error={error}
            itemLength={Array.isArray(products) ? products?.length : 10}
          />
        </div>
  }