import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

import styles from "../SCSS/Home.module.scss";

export default function Star({ ratings, colorStr, size }) {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {ratings >= index + 1 ? (
          <FaStar
            className={styles.icon}
            style={{ color: colorStr, fontSize: size }}
          />
        ) : ratings >= number ? (
          <FaStarHalfAlt
            className={styles.icon}
            style={{ color: colorStr, fontSize: size }}
          />
        ) : (
          <AiOutlineStar
            className={styles.icon}
            style={{ color: colorStr, fontSize: size }}
          />
        )}
      </span>
    );
  });

  return <>{ratingStar}</>;
}
