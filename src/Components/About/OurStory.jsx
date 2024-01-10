import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";

import styles from "../SCSS/About.module.scss"

export default function OurStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

useEffect(() => {
  if (inView) {
    animateControl.start("visible");
  }
}, [inView, animateControl]);
  return (
    <motion.div  variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControl}
          transition={{ duration: 0.5, delay: 0.25 }}
          ref={ref}  className={styles.ourStory}>
    <div className={styles.ourStory__container}>
    <h5 className={styles.storyTitle}>our story</h5>
    <div className={styles.story}>
    <h3 className={styles.story__heading}>
    Crafting top-tier skin cleansers for ultimate skincare. Delivering excellence in every product, ensuring premium quality
    </h3>
    <p className={styles.story__mainStory}>
    Specializing in the meticulous creation of premium-grade skin cleansers, our focus lies in delivering unparalleled quality and efficacy to elevate skincare routines. With a commitment to excellence, each product undergoes rigorous formulation and testing, ensuring optimal performance and gentleness on the skin.<br/>
    Our dedication to sourcing the finest ingredients reflects our mission to provide a cleansing experience that surpasses expectations.<br/>
    Through a blend of innovation and expertise, we craft cleansers that cater to diverse skin types, addressing specific concerns while promoting a healthy, radiant complexion
    </p>
    </div>
    </div>
    </motion.div>
  )
}
