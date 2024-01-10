import { AiFillCloseCircle } from "react-icons/ai";

import styles from "../SCSS/Home.module.scss";

export default function Modal({ showModal, setShowModal }) {
  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modal}>
        <div className={styles.container}>
          <ul>
            <li className={styles.btnClose}>
              <h2>Flawless Skin</h2>
              <AiFillCloseCircle
                size="2rem"
                onClick={() => setShowModal(false)}
              />
            </li>
            <li>
              <span>1.Choose the Right Cleanser:</span> Start with a gentle,
              sulfate-free cleanser that suits your skin type. Foaming cleansers
              work well for oily skin, while cream or gel cleansers are better
              for dry or sensitive skin.
            </li>
            <li>
              <span>2.Cleansing Frequency: </span>Cleanse your face twice a day,
              in the morning and before bedtime, to remove dirt, makeup, and
              impurities.
            </li>
            <li>
              <span>3.Cleansing Technique:</span> Use lukewarm water and gently
              massage the cleanser onto your skin in circular motions. Rinse
              thoroughly.
            </li>
            <li>
              <span>4.Broad-Spectrum SPF:</span> Apply a broad-spectrum
              sunscreen with at least SPF 30 in the morning. This is crucial for
              preventing sun damage, premature aging, and maintaining flawless
              skin.
            </li>
            <li>
              <span>5.Moisturizer Type:</span> Select a moisturizer appropriate
              for your skin type. Creams are more hydrating, while gels are
              lightweight.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
