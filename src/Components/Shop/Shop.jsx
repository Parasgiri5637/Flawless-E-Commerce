import Nav from "../Nav";
import Footer from "../Comman/Footer"
import style from "../SCSS/Shop.module.scss"
import FilterItem from "./FilterItem";
import ShopItem from "./ShopItem";
import SearchBar from "./SearchBar";

import { useSelector } from "react-redux";

export default function Shop() {
const selector = useSelector(state => state.filterProduct);
const {filterBtn} = selector
  return (
    <>
    <div className={filterBtn && style.darkShad}></div>
      <Nav />
      <div className={style.shop} >
      <SearchBar/>
      <div className={style.shopContainer}>
      <FilterItem/>
      <ShopItem/>
      </div>
      </div>
      <Footer/>
    </>
  );
}
