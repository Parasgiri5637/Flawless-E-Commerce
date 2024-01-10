import { useSelector, useDispatch } from "react-redux";
import { FaDotCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import style from "../SCSS/Shop.module.scss";
import {handleCategoryProducts,handleAllUrl,handlePrice,handleSetPage,handleFilterBtn,} from "../../Toolkit/FilterReducer";

import { useSearchParams} from 'react-router-dom';
import useUrl from "../../Custome Hooks/useUrl";



export default function FilterItem() {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.filterProduct);
  let {totalProducts,category,pricePro,filterBtn} = selector;
const {urlBrand} = useUrl();

  //* ====================================== Handle Category functions 
  const categoryArr = ["all",'cleanser',"bodylotion","moisturizer","sunscreens"]

  function handleCategoryPro(categoryVal){
    dispatch(handleSetPage(1))
    if(categoryVal === 'all'){
      setSearchParam({a:categoryVal})
      dispatch(handleAllUrl(categoryVal))
    }else {
      setSearchParam({category: categoryVal});
      dispatch(handleCategoryProducts(categoryVal));
    }
    filterBtn && dispatch(handleFilterBtn(false))
}
function upperCaseWord(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}



//* =================================== Handle Price function

const productsByPrice = ["all","0-200","200-400","400-500","600-850"]

function handlePricePro(priceRange){
  if(priceRange === "all"){
    setSearchParam({a:priceRange})
  dispatch(handleAllUrl(priceRange))
  }else {
    setSearchParam({"pr":priceRange})
    dispatch(handlePrice(priceRange))
  }
  filterBtn && dispatch(handleFilterBtn(false))
}
  
//* ================================== Products by Company

let itemByBrand;
if (Array.isArray(totalProducts) && totalProducts.length > 0) {
    const brand = [...new Set(totalProducts.map(item => item.brand))];
    itemByBrand = ["all", ...brand]
} else {
    console.log('totalProducts is not an array or is empty.');
}

function handleBrandItem(e){
  const brandName = e.target.value;
  if(brandName === 'all'){
    setSearchParam({a: brandName})
    dispatch(handleAllUrl(brandName))
  }else {
    setSearchParam({'brand':brandName})
  }
  filterBtn && dispatch(handleFilterBtn(false))
}

return (
   <div className={`${style.filterItem} ${filterBtn ? style.activeFilterSlide : ""}`}>
   <div className={style.filterCloseIcon}>
   <AiFillCloseCircle className={style.filtercloseBtn} onClick={() => dispatch(handleFilterBtn(false))}/>
   </div>
      <div className={style.filterItem__bycategory}>
      <FilterByOptions txt={"Category"} arr={categoryArr} values={category} onFilterOpt={handleCategoryPro} upperCaseWord={upperCaseWord}/>
      </div>
      <div className={style.filterItem__byPrice}>
        <FilterByOptions txt={"Price"} arr={productsByPrice} values={pricePro} onFilterOpt={handlePricePro} upperCaseWord={upperCaseWord}/>
      </div>  
      <div className={style.filterItem__byCompany}>
      <h2 className={style.brandTitle}>Brand</h2>
        <select className={style.brandDropDown} onChange={handleBrandItem}>
        {Array.isArray(itemByBrand) && itemByBrand.map((item,i) => (
          <option className={style.brandOpt} key={i} selected={item === urlBrand} value={item} >{item.charAt(0).toUpperCase() + item.slice(1)}</option>
        ))}
        </select>
      </div>
    </div>
  );
}


function FilterByOptions({txt,arr,values,onFilterOpt,upperCaseWord}){

  return <div className={style.filterSection}>
  <h2 className={style.filterTitle}>{txt}</h2>
  <div className={style.container}>
  {Array.isArray(arr) && arr.map((item,i) => (
     <div className={style.filterOption} key={i}>
        <span className={style.spanFilter}  onClick={() => onFilterOpt(item)} >
         <span>{item === values  ? <FaDotCircle className={style.circle}/> : <FaRegDotCircle className={style.circle}/> }</span>    
         <span className={style.filterName}>{upperCaseWord(item) || item === "all" ? upperCaseWord(item) : item}</span>
        </span>
     </div>
   ))}  
  </div>
  </div>
}




/*   <div className={style.filterItem__byCategory}>
   <h2 className={style.categoryTitle}>Category</h2>
   <div className={style.container}>
   {Array.isArray(categoryArr) && categoryArr.map((item,i) => (
     <div className={style.byCategory} key={i}>
        <span  onClick={() => handleCategoryPro(item)} >
         <span>{item === category  ? <FaDotCircle className={style.circle}/> : <FaRegDotCircle className={style.circle}/> }</span>    
         <span className={style.categoryName}>{upperCaseWord(item)}</span>
        </span>
     
     </div>
   ))}
   </div>
   
   </div> */

  /*  {Array.isArray(productsByPrice) && productsByPrice.map((item,i) => (
        <h2  key={i} onClick={() => handlePricePro(item)}>{item === "all" ? upperCaseWord(item) : item}</h2>
      ))}*/