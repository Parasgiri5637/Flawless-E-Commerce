import { IoLocationSharp } from "react-icons/io5";
import { TbPackages } from "react-icons/tb";
import { FaQuestion} from "react-icons/fa6";
import { FaSync } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";

import styles from "../SCSS/Contact.module.scss";

const servicesArr = [
    {
    "icon":<IoLocationSharp className={styles.servicesIcon}/>,
    "txt":"Track Order"
    },
    {
        "icon":<TbPackages className={styles.servicesIcon}/>,
        "txt":"Packaging & Delivery" 
    },
    {
        "icon":<FaQuestion className={styles.servicesIcon}/>,
        "txt":"FAQ Services" 
    },
    {
        "icon":<FaSync className={styles.servicesIcon}/>,
        "txt":"FAQ Services" 
    }
]

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

useEffect(() => {
  if (inView) {
    animateControl.start("visible");
  }
}, [inView, animateControl]);
    return (
      <motion.div variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControl}
          transition={{ duration: 0.5, delay: 0.25 }}
          ref={ref} className={styles.services}>
        <div className={styles.services__container}>
          {Array.isArray(servicesArr) &&
            servicesArr.map((item, i) => (
              <div className={styles.serviceBox} key={i}>
                <span>{item.icon}</span>
                <span className={styles.servicesTxt}>{item.txt}</span>
              </div>
            ))}
        </div>
      </motion.div>
    );
  }
  
