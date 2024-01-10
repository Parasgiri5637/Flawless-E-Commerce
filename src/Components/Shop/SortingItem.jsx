import { useDispatch,useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";

import { handleSorting } from "../../Toolkit/FilterReducer";
import useUrl from "../../Custome Hooks/useUrl";
import style from "../SCSS/Shop.module.scss";

import { handleFilterBtn } from "../../Toolkit/FilterReducer";

export default  function SortingItem(){
    const [searchParam,setSearchParam] = useSearchParams();
    const dispatch = useDispatch()
    const selector  = useSelector(state => state.filterProduct);
    const {page,totalProducts:allItem,sorted,category,searchUrlQuery,priceItemLength} = selector;
    const {urlCategory,urlPage,urlQuery,urlPrice,urlStartPrice, urlEndPrice,urlBrand,urlAll} = useUrl()
 


    const itemParPage = 10;
    const startRange =  (page - 1) * itemParPage + 1;
    let endRange = page * itemParPage;
    let totalLength = !urlCategory && !urlPrice && !urlBrand && !urlQuery ? Array.isArray(allItem) && allItem.length : priceItemLength
     if (endRange > totalLength) {
   endRange = totalLength;
 }

  useEffect(() => {
    dispatch(handleSorting(searchParam.get('sort')))
  },[dispatch,searchParam])
  
    function handleSelectChange(e){
    const selectedValue = e.target.value;
    urlAll ? setSearchParam({"a":urlAll, p:urlPage || page,"sort":selectedValue}) : setSearchParam({p:urlPage || page,"sort":selectedValue})
    urlPage && setSearchParam({p:urlPage || page,"sort":selectedValue})
    urlCategory && setSearchParam({"category":category,p:urlPage || page,"sort":selectedValue})
    urlQuery && setSearchParam({"query":searchUrlQuery,p:urlPage || page,"sort":selectedValue})
    urlPrice && setSearchParam({"pr":`${urlStartPrice}-${urlEndPrice}`,p:urlPage || page,"sort":selectedValue})
    urlBrand && setSearchParam({"brand":urlBrand,p:urlPage || page,"sort":selectedValue})
    dispatch(handleSorting(selectedValue))
   }
    return <div className={style.shopItem__Sort}>
    <p  className={style.showTotalItem} >{startRange}-{endRange} of {totalLength} Results</p>
    <div className={style.sortItem}>
    <FaFilter className={style.filterIcon} onClick={() => dispatch(handleFilterBtn(true))}/>
        <select className={style.selectSort}  onChange={handleSelectChange}>
          <option value="">SortBy: Features</option>
          <option value="lowest" selected={sorted === "lowest"}>Price: Low to High</option>
          <option value="highest" selected={sorted === "highest"}>Price: High to Low</option>
          <option value="a-z" selected={sorted === "a-z"}>Asce: A-Z</option>
          <option value="z-a" selected={sorted === "z-a"}>Desce: Z-A</option>
        </select>
    </div>
    </div>
  }
  