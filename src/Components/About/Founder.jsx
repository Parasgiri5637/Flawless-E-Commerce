import { FaInstagram,FaFacebook,FaPinterest,FaTwitter,FaYoutube} from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect,useRef } from "react";

import styles from "../SCSS/About.module.scss"

const svgIcon = <svg className={styles.txtIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 49" fill="none"><path d="M15.9996 48.4C10.9329 48.4 7.06628 46.8667 4.39961 43.8C1.86628 40.7333 0.599609 36.4667 0.599609 31C0.599609 25.8 1.53294 21.4 3.39961 17.8C5.26628 14.2 7.53294 11.2 10.1996 8.80001C12.9996 6.40001 15.7329 4.53334 18.3996 3.20001C21.1996 1.73333 23.5329 0.666666 25.3996 0L27.7996 5C25.5329 5.93333 23.1329 7.2 20.5996 8.80001C18.0663 10.4 15.8663 12.6667 13.9996 15.6C12.2663 18.4 11.3996 22.3333 11.3996 27.4C12.4663 26.8667 13.4663 26.5333 14.3996 26.4C15.3329 26.2667 16.3329 26.2 17.3996 26.2C21.2663 26.2 24.0663 27.2667 25.7996 29.4C27.6663 31.5333 28.5996 34 28.5996 36.8C28.5996 40 27.4663 42.7333 25.1996 45C23.0663 47.2667 19.9996 48.4 15.9996 48.4ZM53.9996 48.4C48.9329 48.4 45.0663 46.8667 42.3996 43.8C39.8663 40.7333 38.5996 36.4667 38.5996 31C38.5996 25.8 39.5329 21.4 41.3996 17.8C43.2663 14.2 45.5329 11.2 48.1996 8.80001C50.9996 6.40001 53.7329 4.53334 56.3996 3.20001C59.1996 1.73333 61.5329 0.666666 63.3996 0L65.7996 5C63.5329 5.93333 61.1329 7.2 58.5996 8.80001C56.0663 10.4 53.8663 12.6667 51.9996 15.6C50.2663 18.4 49.3996 22.3333 49.3996 27.4C50.4663 26.8667 51.4663 26.5333 52.3996 26.4C53.3329 26.2667 54.3329 26.2 55.3996 26.2C59.2663 26.2 62.0663 27.2667 63.7996 29.4C65.6663 31.5333 66.5996 34 66.5996 36.8C66.5996 40 65.4663 42.7333 63.1996 45C61.0663 47.2667 57.9996 48.4 53.9996 48.4Z" fill="#27272A"></path></svg>

export default function Founder() {
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
          ref={ref} className={styles.founder}>
        <div className={styles.founder__container}>
            <div className={styles.founder__img}>
                <img src="https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-about-founder-img-bg.jpg" alt="founder image" />
            </div>
            <div className={styles.founder__text}>
            <div className={styles.founder__text__details}>
            <h6>From Founder</h6>
            {svgIcon}
            <h3>Dedicated visionary shaping tomorrow's innovations. Leading with passion, forging a path of change.Driven by a vision, crafting success from ambition.</h3>
            <h5>mila christine</h5>
            <p>Founder</p>
            </div>
            <div className={styles.founder__text__social}>
            <p>social media</p>
            <div className={styles.socialIcons}>
            <FaInstagram className={styles.sclIcon}/>
            <FaFacebook className={styles.sclIcon}/>
            <FaPinterest className={styles.sclIcon}/>
            <FaTwitter className={styles.sclIcon}/>
            <FaYoutube className={styles.sclIcon}/>
            </div>
            </div>
            </div>
        </div>
    </motion.div>
  )
}
