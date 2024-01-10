import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

import Discount from "../Comman/Discount";
import Star from "../Comman/Star";
import styles from "../SCSS/Home.module.scss";
import SkeletonLoading from "../Comman/Skeleton";
import Error from "../Comman/Error";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Products({
  productsArr,
  isLoading,
  isError,
  error,
  itemLength,
}) {
  return (
    <>
      {isLoading && <SkeletonLoading productsArr={itemLength} />}
      {isError && (
        <Error
          ErrorMsg={error?.response?.statusText}
          ErrorStatus={error?.response?.status}
        />
      )}
      {productsArr &&
        productsArr.map((item) => <ProductItem item={item} key={item?.id} />)}
    </>
  );
}

function ProductItem({ item }) {
  //* =================================== Framer Motion animation

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

  useEffect(() => {
    if (inView) {
      animateControl.start("visible");
    }
  }, [inView, animateControl]);

  return (
    <Link
      to={`/product/${item?.category}/${item?.title
        .split(" ")
        .slice(0, 1)
        .join(" ")}/${item?.id}`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animateControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        ref={ref}
        className={`${styles.product}`}
      >
        <div className={styles.product__img}>
          <img src={item?.images[0]} alt={item?.name} />
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productInfo__category}>
            {item?.category?.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}
          </h3>
          <p className={styles.productInfo__title} style={{ color: "#000000" }}>
            {item?.title.split(" ").slice(0, 4).join(" ")}
          </p>
          <div className={styles.ratings}>
            <Star ratings={item?.rating} colorStr={"#8c8c91"} size={"1.4rem"} />
          </div>
          <div className={styles.productInfo__price}>
            <div className={styles.discountPrice}>
              <Discount price={item?.price} discount={item?.discount} />
              <span className={styles.discount}>{item?.discount}%</span>
            </div>

            <p>
              <s>₹{item?.price}</s>
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
