import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BiSolidUserCircle } from "react-icons/bi";
import { LuBaggageClaim } from "react-icons/lu";
import { useSelector } from "react-redux";

import styles from "../Components/SCSS/Nav.module.scss";

export default function Nav() {
  const [menuBar, setMenuBar] = useState(false);
  const selector = useSelector(state => state.cartProduct)
  let {cart} = selector
  const itemLength = Array.isArray(cart) && cart.length
  //* ======================= For Navbar style
  const location = useLocation();
  const splitPath = location.pathname.split("/");
  const path =
    location.pathname ===
      `/product/${splitPath[2]}/${splitPath[3]}/${splitPath[4]}` ||
    location.pathname === "/shop" || location.pathname === "/cart";

  return (
    <div className={path ? styles.nav2 : styles.nav}>
      <div className={styles.navLinks}>
        <HiOutlineMenuAlt1
          className={path ? styles.navMenu2 : styles.navMenu}
          onClick={() => setMenuBar(!menuBar)}
        />
        <div className={`${styles.links} ${menuBar ? styles.activeLinks : ""}`}>
          <NavLink to="/" className={path ? styles.prolinks : ""}>
            Home
          </NavLink>
          <NavLink to="/shop" className={path ? styles.prolinks : ""}>
            Shop
          </NavLink>
          <NavLink to="/about" className={path ? styles.prolinks : ""}>
            About
          </NavLink>
          <NavLink to="/contact" className={path ? styles.prolinks : ""}>
            Contact
          </NavLink>
        </div>
      </div>
      <NavLink to="/">
        <p className={path ? styles.navlogo2 : styles.navlogo}>Flawless</p>
      </NavLink>
      <div className={path ? styles.userAction2 : styles.userAction}>
        <BiSolidUserCircle className={styles.login} />
        <NavLink to="/cart">
        <LuBaggageClaim className={path ? styles.navCart2 : styles.navCart} />
        {itemLength > 0 ? <span>{itemLength}</span> : null}
        </NavLink>
      </div>
    </div>
  );
}
