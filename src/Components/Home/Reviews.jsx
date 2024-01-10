import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

import Star from "../Comman/Star";
import styles from "../SCSS/Home.module.scss";

const customerArr = [
  {
    rating: 4,
    msg: "I have been using a particular skin care brand for many years and I must say I am highly satisfied with the results.",
    img: "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-testimonials-avatar-img-2.jpg",
    name: "JENNIFER LEWIS",
  },
  {
    rating: 4.5,
    msg: " The products are natural, gentle on the skin, and effective. They are free of harsh chemicals and fragrances.",
    img: "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-testimonial-avatar-img.jpg",
    name: "ALICIA HEART",
  },
  {
    rating: 4,
    msg: "They help to nourish, cleanse, and hydrate my skin, all while leaving it looking healthy and glowing.",
    img: "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-testimonials-avatar-img-1.jpg",
    name: "JUAN CARLOS",
  },
];

const custReviews = Array.isArray(customerArr) && customerArr;

export default function Reviews() {
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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={animateControl}
      transition={{ duration: 0.5, delay: 0.25 }}
      ref={ref}
      className={styles.reviews}
    >
      <h1>What Our Customers Say</h1>
      <div className={styles.reviewsContainer}>
        {custReviews.map((item, i) => (
          <div className={styles.custmReviews} key={i}>
            <div className={styles.reviewsStar}>
              <Star
                ratings={item?.rating}
                colorStr={"#fa2d64"}
                size={"1.6rem"}
              />
            </div>
            <p className={styles.reviewsText}>{item?.msg}</p>
            <div className={styles.reviewsImg}>
              <img src={item?.img} alt={item?.name} />
            </div>
            <span className={styles.reviewsName}>{item?.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
