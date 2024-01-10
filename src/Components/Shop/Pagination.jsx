import { GrPrevious,GrNext } from "react-icons/gr";
import { useSelector,useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import style from "../SCSS/Shop.module.scss";

import { handleSetPage } from "../../Toolkit/FilterReducer";
import useUrl from "../../Custome Hooks/useUrl";

export default  function Pagination(){
    const [searchParam, setSearchParam] = useSearchParams()
    const dispatch = useDispatch()
    const selector  = useSelector(state => state.filterProduct);
    const {totalPages,page,searchQuery,searchUrlQuery,priceItemLength} = selector;
    const  {urlCategory,urlPrice,urlBrand,urlQuery,userStartPrice,userEndPrice}  =  useUrl();

      //* function for change page
  function handleChangePage(selectedPage) {
    if (selectedPage > 0 && selectedPage <= totalPages && selectedPage !== page){
      setSearchParam({ p: selectedPage});
      urlCategory && setSearchParam({"category":urlCategory,p:selectedPage})
      urlQuery &&  setSearchParam({"query":searchQuery || searchUrlQuery,p:selectedPage})
      urlPrice && setSearchParam({"pr":`${userStartPrice}-${userEndPrice}`,p:selectedPage})
      urlBrand && setSearchParam({"brand":urlBrand,p:selectedPage})

      dispatch(handleSetPage(selectedPage))
    }
  }

const pageLength = urlCategory || urlPrice || urlBrand || urlQuery ? priceItemLength : totalPages


    return <div className={style.shopItem__btn}>
        <GrPrevious onClick={() => handleChangePage(page - 1)} className={`${style.btn} ${page === 1 ?  style.disableBtn : ""} `}/>
          {[...Array(Math.ceil(pageLength / 10))].map((_,i) => {
            return (
            <span key={i} onClick={() => handleChangePage(i + 1)}  className={`${style.subBtn} ${page === i + 1 ? style.activeBtn : ""}`}>{i + 1}</span>
          )
          })}
          <GrNext onClick={() => handleChangePage(page + 1)} className={`${style.btn} ${page === Math.ceil(pageLength / 10) ?  style.disableBtn : ""} `}/>
         
        </div>
  }
  