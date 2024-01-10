import { Link } from "react-router-dom";

import Nav from "../Nav";
import useTyping from "../../Custome Hooks/useTyping";
import styles from "../SCSS/Home.module.scss";
const texts = ["Skin Care", "Body Lotion", "Cleanser", "Sunscreen"];

export default function Header() {
  return (
    <div className={styles.header}>
      <Nav />
      <div className={styles.headerText}>
        <h6>WELCOME TO FLAWLESS STORE</h6>
        <div className={styles.headerH1}>
          {useTyping(texts)}
          <h1>Products for You</h1>
        </div>
        <Link to="/shop">
          <button className={styles.headerBtn}>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}
