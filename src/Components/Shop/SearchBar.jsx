import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import style from "../SCSS/Shop.module.scss";
import {
  handleUrlQuery,
  handleSearchResult,
  handleSearchQuery,
} from "../../Toolkit/FilterReducer";
import { CgSearch } from "react-icons/cg";

import useUrl from "../../Custome Hooks/useUrl";
import { useEffect } from "react";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.filterProduct);
  let { searchQuery, searchResult, totalProducts } = selector;
 
  const { urlQuery} = useUrl()

  function onSearchQuery(e) {
    const query = e.target.value;
    dispatch(handleSearchQuery(query));
  }

  function onSubmit(e) {
    e.preventDefault();
    setSearchParam({ query: searchQuery });
    dispatch(handleUrlQuery(searchQuery)); 
    dispatch(handleSearchResult(""));
  }

  function onSearchResult(str) {
    setSearchParam({ query: str });
    dispatch(handleUrlQuery(str));
    dispatch(handleSearchResult(""));
  }

  useEffect(() => {
    if(!urlQuery){
      dispatch(handleSearchQuery(""))
    }
  },[urlQuery,dispatch])

  const checkData = Array.isArray(totalProducts) && totalProducts.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
const checkStr = searchQuery ===  urlQuery

  return (
    <div className={style.filterItem__SearchBar}>
      <div className={style.searchBarContainer}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            onChange={onSearchQuery}
            value={searchQuery}
            autoComplete="off"
            className={`${style.input} ${
             !checkStr && searchQuery.length >= 1 ? style.activeSearchBar : style.input
            }`}
          />
          <CgSearch className={style.searchIcon} />
        </form>
        {searchQuery.length < 1 ? null : !checkStr && (
          <div className={style.searchResult}>
            {checkData.length > 0 ? (
              Array.isArray(searchResult) &&
              searchResult.map((item, i) => (
               <>
               <span
                  key={i}
                  onClick={() => onSearchResult(item?.title)}
                  className={style.result}
                >
               <CgSearch className={style.searchResultIcon} key={i}/>
                {item?.title}
                </span>
               </>
                
              ))
            ) : (
              <span className={style.noData}>No Data Available</span> 
            )}
          </div>
        )}
      </div>
    </div>
  );
}
