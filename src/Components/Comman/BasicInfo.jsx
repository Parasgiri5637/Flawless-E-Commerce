import { BiSolidLeaf } from "react-icons/bi";
import { RiHandHeartFill } from "react-icons/ri";
import { FaHandSparkles } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "../SCSS/Home.module.scss";

const data = [
  {
    icon: <FaHandSparkles />,
    title: "All Skin Types",
    text: "oily and combination skin types as well to treat various skin conditions. There is very low risk in using it in its topical form according to studies",
  },
  {
    icon: <BiSolidLeaf />,
    title: "Pure Organic",
    text: "Pure Organic face creams typically contain natural and botanical antioxidants, vitamins (A, C, D, E, and K), fatty acids, and omega acids to hydrate and balance the skin",
  },
  {
    icon: <RiHandHeartFill />,
    title: "Natural Care",
    text: "The ingredients found The ingredients found in natural skin products are extracted directly from nature.",
  },
];

const infoArr = Array.isArray(data) && data;

export default function BasicInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

  useEffect(() => {
    if (inView) {
      animateControl.start("visible");
    }
  }, [inView, animateControl]);

  return (
    <div className={styles.basicInfo}>
      {infoArr.map((item, i) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControl}
          transition={{ duration: 0.5, delay: 0.25 }}
          ref={ref}
          className={styles.basicDetail}
          key={i}
        >
          <span className={styles.basicDetail__Icon}>{item.icon}</span>
          <h3 className={styles.basicDetail__title}>{item.title}</h3>
          <p className={styles.basicDetail__text}>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
