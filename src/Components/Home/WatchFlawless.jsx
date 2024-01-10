import { AiFillYoutube } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "../SCSS/Home.module.scss";
import { useState } from "react";

export default function WatchFlawless() {
  const [showVideo, setShowVideo] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const animateControl = useAnimation();

  useEffect(() => {
    if (inView) {
      animateControl.start("visible");
    }
  }, [inView, animateControl]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={animateControl}
      transition={{ duration: 0.5, delay: 0.25 }}
      ref={ref}
      className={styles.WatchFlawless}
    >
      <div className={styles.watchVideo}>
        <h1>Flawless Skincare Regimen</h1>
        <button onClick={() => setShowVideo(true)}>
          watch the videos
          <span>
            <AiFillYoutube size="2.3rem" />
          </span>
        </button>
      </div>
      {showVideo && <VideoModal setShowVideo={setShowVideo} />}
    </motion.div>
  );
}

function VideoModal({ setShowVideo }) {
  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.video}>
        <AiFillCloseCircle
          onClick={() => setShowVideo(false)}
          className={styles.btnClose}
        />
        <iframe
          className={styles.iframe}
          src="https://www.youtube.com/embed/YKuYyp1kd5I?si=gZ_4C4XseF96TExh"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
