import { motion, useAnimation, useInView } from "framer-motion";

import { useState, useRef, useEffect } from "react";

import styles from "../SCSS/Home.module.scss";
import Modal from "./Modal";

export default function ReadMore() {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

  useEffect(() => {
    if (inView) {
      animateControl.start("visible");
    }
  }, [inView, animateControl]);

  return (
    <div className={styles.readMore}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animateControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        ref={ref}
        className={styles.readMore__img}
      >
        <img
          src="https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-face-lotion-img.jpg"
          alt="skin cleanser image"
        />
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animateControl}
        transition={{ duration: 0.5, delay: 0.35 }}
        ref={ref}
        className={styles.readMore__text}
      >
        <div className={styles.divider}>
          <span></span>
        </div>
        <h2>Beauty Flawless Skin</h2>
        <p>
          Having flawless skin is a common beauty goal for many people.
          Achieving flawless skin requires a consistent and well-planned
          skincare routine. A flawless complexion is not just about covering
          imperfections with makeup. it's about having healthy, radiant skin
          that looks great both with and without makeup.
          <br />
          <br />
          Discuss a comprehensive skincare routine that includes cleansing,
          toning, moisturizing, and special treatments for achieving flawless
          skin.
        </p>

        <button onClick={() => setShowModal(true)}>Read More</button>
      </motion.div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
}
