import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineSupport,MdOutlineAccessTimeFilled } from "react-icons/md";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";
import styles from "../SCSS/Contact.module.scss";

const findUsArr = [
    {
        "icon":<IoLocationSharp className={styles.findUsIcon}/>,
        "txt":"FIND US",
        "info":"123 Demo St, San Francisco, CA",
        "meetUs":"45678, United States"
    },
    {
        "icon":<MdOutlineSupport className={styles.findUsIcon}/>,
        "txt":"SUPPORT",
        "info":"Call: +1 123 456 7890",
        "meetUs":"Email: mail@example.com"
    },
    {
        "icon":<MdOutlineAccessTimeFilled className={styles.findUsIcon}/>,
        "txt":"WORKING HOURS",
        "info":"Mon - Fri: 08:30 - 20:00",
        "meetUs":"Sat & Sun: 09:30 - 21:30"
    },
]


export default function FindUs() {
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
          ref={ref} className={styles.findUs}>
    <div className={styles.findUs__container}>
    <div className={styles.map}>
    <iframe className={styles.findMap} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6310.336590043394!2d-122.47481505902373!3d37.73919582242334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7dea6bc53467%3A0x77b499b25c58aca0!2sWest%20Portal%2C%20San%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1704575541605!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" style={{border:"0"}}  loading="lazy"></iframe>
    </div>
    <div className={styles.findUs__details}>
    {Array.isArray(findUsArr) && findUsArr.map((item,i) => (
        <div className={styles.findUsBox} key={i}>
        <span>{item?.icon}</span>
        <div className={styles.findUsInfo}>
        <span>{item?.txt}</span>
        <span>{item?.info}</span>
        <span>{item?.meetUs}</span>
        </div>
        </div>
    ))}
    </div>
    </div>
    </motion.div>
  )
}
