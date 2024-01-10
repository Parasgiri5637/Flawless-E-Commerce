
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";
import Nav from "../Nav";
import styles from "../SCSS/About.module.scss"


export default function Header() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

useEffect(() => {
  if (inView) {
    animateControl.start("visible");
  }
}, [inView, animateControl]);
  
  return <div className={styles.headerAbout}>
  <Nav />
  <motion.div  variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControl}
          transition={{ duration: 0.5, delay: 0.25 }}
          ref={ref} className={styles.headerText}>
    <h1>About</h1>
    <p>Empowering shoppers with quality products and seamless experiences.</p>
    <p>We're dedicated to redefining online shopping through innovation and customer-centric service</p>
    <span></span>
  </motion.div>
</div>
}
