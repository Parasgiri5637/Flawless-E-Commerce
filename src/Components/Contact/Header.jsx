
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";
import Nav from "../Nav";
import styles from "../SCSS/Contact.module.scss"

export default function Header() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

useEffect(() => {
  if (inView) {
    animateControl.start("visible");
  }
}, [inView, animateControl]);
  return (
    <div className={styles.headerContact}>
    <Nav/>
    <motion.div variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControl}
          transition={{ duration: 0.5, delay: 0.25 }}
          ref={ref} className={styles.headerText}>
    <h1>Contact</h1>
    <p>Reach out to us for personalized skincare guidance and product inquiries.</p>
    <p>Your skin's wellbeing matters to us connect with our experts for tailored advice.</p>
    <span></span>
  </motion.div>
    </div>
  )
}
