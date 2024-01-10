import { useSelector } from "react-redux";
import { Online,Offline } from "react-detect-offline";

import style from "../SCSS/Shop.module.scss";

//* Custome Hook
import useFetchProduct from "../../Custome Hooks/useFetchProduct";
import useFilteredProduct from "../../Custome Hooks/useFilteredProduct";
import useHandleEffects from "../../Custome Hooks/useHandleEffects";

//*components
import useUrl from "../../Custome Hooks/useUrl";
import SortingItem from "./SortingItem";
import ProductShop from "./ProductShop";
import Pagination from "./Pagination";
import Error from "../Comman/Error";


export default function ShopItem() {
  const selector  = useSelector(state => state.filterProduct);
  const {products,isLoading,isError,error,priceItemLength,totalPages} = selector;

  //* Handle Url dynamically
const {urlQuery,urlCategory,urlPrice,urlBrand } = useUrl()

  // * fetch Filter Products custome hooks
  const { filterProArr } = useFilteredProduct();
  
  
  // * Fecth All Products custome Hooks
  useFetchProduct();
  
  //* ================================== Handle useEffect hooks with custome hooks

  useHandleEffects(filterProArr)
  const pageLength = urlCategory || urlPrice || urlBrand || urlQuery ? priceItemLength : totalPages

  return (
    <div className={style.shopItem}>
     <Online> 
     <SortingItem />
     <ProductShop products={products} isLoading={isLoading} isError={isError} error={error}  />
     {Math.ceil(pageLength / 10) === 1 ? null : <Pagination totalItem={filterProArr}/>}
     </Online>
     <Offline>
    <Error/>
     </Offline>
    </div>
  );
}





