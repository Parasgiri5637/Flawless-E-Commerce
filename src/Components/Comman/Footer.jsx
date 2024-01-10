import {
  FaTruck,
  FaCreditCard,
  FaCircleQuestion,
  FaInstagram,
} from "react-icons/fa6";
import { FaTruckPickup, FaFacebook, FaTwitter } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import styles from "../SCSS/Footer.module.scss";

const serviceArr = [
  {
    icon: <FaTruck />,
    title: "FREE DELIVERY",
    text: "Nullam pharetra egestas mollis",
  },
  {
    icon: <FaCreditCard />,
    title: "EASY PAYMENT",
    text: "Nullam pharetra egestas mollis",
  },
  {
    icon: <FaTruckPickup />,
    title: "TRACK ORDER",
    text: "Nullam pharetra egestas mollis",
  },
  {
    icon: <FaCircleQuestion />,
    title: "HAVE QUESTIONS?",
    text: "Nullam pharetra egestas mollis",
  },
];

export default function Footer() {
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.service}>
        {Array.isArray(serviceArr) &&
          serviceArr.map((item, i) => (
            <div className={styles.serviceContainer} key={i}>
              <span>{item.icon}</span>
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
      </div>

      <h1 className={styles.logo}>
        <Link to="/">Flawless</Link>
      </h1>

      <div className={`${styles.footerLinks}`}>
        <Link
          to="/"
          className={
            location.pathname === "/" ? styles.linkActive : styles.aLinks
          }
        >
          Home
        </Link>

        <Link
          to="/shop"
          className={
            location.pathname === "/shop" ? styles.linkActive : styles.aLinks
          }
        >
          Shop
        </Link>

        <Link
          to="/about"
          className={
            location.pathname === "/about" ? styles.linkActive : styles.aLinks
          }
        >
          About
        </Link>

        <Link
          to="/contact"
          className={
            location.pathname === "/contact" ? styles.linkActive : styles.aLinks
          }
        >
          Contact
        </Link>
      </div>

      <div className={styles.footerSocialIcon}>
        <FaInstagram className={styles.socialIcon} />
        <FaFacebook className={styles.socialIcon} />
        <FaTwitter className={styles.socialIcon} />
      </div>

      <div className={styles.footerCompany}>
        <p>© {year} Skin Cleanser Store. Powered by Skin Cleanser Store.</p>
      </div>
    </div>
  );
}
