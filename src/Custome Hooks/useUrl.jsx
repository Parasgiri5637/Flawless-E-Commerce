import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useUrl() {
    const [searchParam, setSearchParam] = useSearchParams();
    const selector  = useSelector(state => state.filterProduct);
    const {category,searchUrlQuery,page,pricePro} =  selector
    
    const urlPage = searchParam.get("p")
    const urlCategory = searchParam.get("category");
    const urlAll = searchParam.get("a")
    const urlQuery = searchParam.get("query");
    const urlSPage = +searchParam.get("sp")
    const urlSort = searchParam.get("sort")
    const urlPrice = searchParam.get("pr") 
    const urlBrand = searchParam.get("brand");
   
    function getPrice(priceRange) {
      if (priceRange && typeof priceRange === 'string' && priceRange.trim() !== '') {
        return priceRange.split("-").map(item => +item);
      }
      return [0, 0];
    }
    
    const urlSplitPrice = getPrice(urlPrice);
    const [urlStartPrice, urlEndPrice] = urlSplitPrice;
    
    const userSplitPrice = getPrice(pricePro);
    const [userStartPrice, userEndPrice] = userSplitPrice;
    


   
let productsUrl;
if (!urlCategory) {
  productsUrl = [`?_page=${+urlPage}&_limit=10`, +urlPage];
} else  {
  productsUrl = [`?category=${category}`, category];
}  
if (urlAll) {
  productsUrl = [`?_page=${1}&_limit=10`, +urlPage];
}
if(urlQuery){
  productsUrl = [`?q=${searchUrlQuery}`,searchUrlQuery];
}
if(urlPrice){
  productsUrl = [`?price_gte=${userStartPrice}&price_lte=${userEndPrice}`,pricePro]
}
if(urlBrand){
  productsUrl = [`?brand=${urlBrand}`,urlBrand]
  
}




return {productsUrl,urlQuery,urlCategory,urlAll,urlPage,urlSPage,urlSort,urlPrice,userStartPrice, userEndPrice,urlStartPrice, urlEndPrice,urlBrand}
}
