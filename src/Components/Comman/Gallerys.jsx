import { useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "../SCSS/Gallerys.module.scss";

const galleryArr = [
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-6.jpg",
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-5.jpg",
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-4.jpg",
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-3.jpg",
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-2.jpg",
  "https://websitedemos.net/skin-cleanser-store-02/wp-content/uploads/sites/933/2021/08/skin-cleanser-template-gallery-img-1.jpg",
];

export default function Gallerys() {
  const [showGallery, setShowGallery] = useState(false);
  const [imgIndex, setImgIndex] = useState();
  function handleModalGallery(i) {
    setImgIndex(i);
    setShowGallery(true);
  }

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
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={animateControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        ref={ref}
        className={styles.gallery}
      >
        <h1>
          Follow Us{" "}
          <span style={{ borderBottom: "1px solid black" }}>
            @flawlesscleanser
          </span>
        </h1>
        <div className={styles.gallery__Container}>
          {Array.isArray(galleryArr) &&
            galleryArr.map((item, i) => (
              <img
                src={item}
                alt="Product image"
                key={i}
                onClick={() => handleModalGallery(i)}
              />
            ))}
        </div>
      </motion.div>
      {showGallery && (
        <ModalGallery
          imgIndex={imgIndex}
          setShowGallery={setShowGallery}
          setImgIndex={setImgIndex}
        />
      )}
    </>
  );
}

function ModalGallery({ imgIndex, setImgIndex, setShowGallery }) {
  const totalImages = galleryArr.length;

  const leftBtnIndex = useCallback(() => {
    if (imgIndex === 0) {
      setImgIndex(totalImages - 1);
    } else {
      setImgIndex(imgIndex - 1);
    }
  }, [imgIndex, setImgIndex, totalImages]);

  const rightBtnIndex = useCallback(() => {
    if (imgIndex === totalImages - 1) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  }, [imgIndex, setImgIndex, totalImages]);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "ArrowRight") rightBtnIndex();
      if (e.key === "ArrowLeft") leftBtnIndex();
      if (e.key === "Escape") setShowGallery(false);
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [rightBtnIndex, leftBtnIndex, setShowGallery]);

  return (
    <>
      <div
        className={styles.galleryOverlay}
        onClick={() => setShowGallery(false)}
      ></div>
      <div className={styles.modalGallery}>
        <div className={styles.galleryAction}>
          <p>
            {imgIndex + 1}/{totalImages}
          </p>
          <IoClose
            className={styles.closeBtn}
            onClick={() => setShowGallery(false)}
          />
        </div>

        <div className={styles.galleryContainer}>
          <div
            className={styles.images}
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {Array.isArray(galleryArr) &&
              galleryArr.map((item, i) => (
                <img src={item} alt="Product image" key={i} />
              ))}
          </div>
        </div>

        <FaChevronLeft className={styles.leftBtn} onClick={leftBtnIndex} />
        <FaChevronRight className={styles.rightBtn} onClick={rightBtnIndex} />
      </div>
    </>
  );
}
