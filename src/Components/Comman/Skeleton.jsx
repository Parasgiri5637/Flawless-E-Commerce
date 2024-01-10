import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../SCSS/Home.module.scss";

export default function SkeletonLoading({ productsArr }) {
  return (
    <>
      {Array(productsArr)
        .fill(0)
        .map((_, i) => (
          <div className={styles.product} key={i}>
            <div className={styles.product__img}>
              <Skeleton height={200} />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productInfo__category}>
                <Skeleton />
              </h3>
              <p className={styles.productInfo__title}>
                <Skeleton />
              </p>
              <div className={styles.ratings}>
                <Skeleton />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
