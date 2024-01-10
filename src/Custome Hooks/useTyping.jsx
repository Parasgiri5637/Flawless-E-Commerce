import { useEffect, useState } from "react";
import styles from "../Components/SCSS/Home.module.scss";

const objPhase = {
  Typing: "Typing",
  Pausing: "Pausing",
  Deleting: "Deleting",
};

export default function useTyping(texts) {
  const [phase, setPhase] = useState(objPhase.Typing);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typeSpeed = 200;
    const pauseSpeed = 600;
    const deleteSpeed = 150;

    const textToType = texts[currentIndex];
    const textLength = textToType.length;

    let timeout;

    switch (phase) {
      case objPhase.Typing:
        if (currentText.length < textLength) {
          timeout = setTimeout(() => {
            setCurrentText(textToType.slice(0, currentText.length + 1));
          }, typeSpeed);
        } else {
          timeout = setTimeout(() => {
            setPhase(objPhase.Pausing);
          }, pauseSpeed);
        }
        break;

      case objPhase.Deleting:
        if (currentText.length > 0) {
          timeout = setTimeout(() => {
            setCurrentText(currentText.slice(0, currentText.length - 1));
          }, deleteSpeed);
        } else {
          timeout = setTimeout(() => {
            setPhase(objPhase.Pausing);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }, pauseSpeed);
        }
        break;

      case objPhase.Pausing:
        timeout = setTimeout(() => {
          if (currentText.length === 0) {
            setPhase(objPhase.Typing);
          } else {
            setPhase(objPhase.Deleting);
          }
        }, pauseSpeed);
        break;

      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, phase, texts]);

  return (
    <h1 className={styles.blinkingCursor}>
      The Best <span className={styles.changeText}>{currentText}</span>
    </h1>
  );
}
