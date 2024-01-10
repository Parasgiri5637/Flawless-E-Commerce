import styles from "../SCSS/Home.module.scss";

import useDiscount from "../../Custome Hooks/useDiscount";

export default function Discount({ price, discount }) {
  return <span className={styles.price}>₹{useDiscount(price, discount)}</span>;
}
