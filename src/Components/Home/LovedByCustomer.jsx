import { Offline, Online } from "react-detect-offline";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


import Products from "../Comman/Products";
import Error from "../Comman/Error";

import styles from "../SCSS/Home.module.scss";



export default function LovedByCustomer() {
  const selector = useSelector(state => state.shopReducer);
  const {lovedByUser,isLoading,isError,error} = selector
  
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
    <div className={styles.lovedByCustomer}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animateControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        ref={ref}
        className={styles.lovedByCustText}
      >
        <h1>Most Loved by the Customers</h1>
        <p>Best Products and Selling across the Countries</p>
      </motion.div>
      <Online>
        <div className={styles.loverByCustProduct}>
          <Products
            productsArr={lovedByUser}
            isLoading={isLoading}
            isError={isError}
            error={error}
            itemLength={4}
          />
        </div>
      </Online>
      <Offline>
        <Error />
      </Offline>
    </div>
  );
}
