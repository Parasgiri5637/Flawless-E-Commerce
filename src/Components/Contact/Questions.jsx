import { useState } from "react";
import styles from "../SCSS/Contact.module.scss";
import { FaCaretDown,FaCaretUp } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef,useEffect } from "react";


export default function Questions() {
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
          ref={ref}className={styles.questions}>
      <div className={styles.questions__container}>
        <FrequentQuestions />
        <AskQuestions />
      </div>
    </motion.div>
  );
}

function FrequentQuestions() {
const [accordion,setAccordion] = useState(0)
    const frqntQnArr = [
        {
            "qn":"How can I track my order?",
            "ans":"Once your order is processed and shipped, you'll receive a tracking number via email. You can use this number to track your package through our website's Track Order section."
        },
        {
            "qn":"What is your return policy?",
            "ans":"We have a hassle-free return policy within 30 days of purchase. If you're not satisfied with your product, simply contact us, and we'll guide you through the return process for a refund or exchange."
        },
        {
            "qn":"Are your products cruelty-free?",
            "ans":"Yes, we're committed to producing cruelty-free products. We do not test on animals, and our ingredients are ethically sourced, ensuring both quality and compassion in our formulations."
        }
    ]

    function accordionToggle(i){
        console.log(accordion,i);
        if(accordion === null){
            setAccordion(null)
        }else {
            setAccordion(i)
        }
    }
  return (
    <div className={styles.frequentQuestions}>
      <h2 className={styles.frequentQuestions__title}>
        Have Any Question?
      </h2>
      <p className={styles.frequentQuestions__sub}>
        Curious about something? We're here to help! Ask us anything.
      </p>
      <h4>FREQUENTLY ASKED QUESTIONS</h4>
      {Array.isArray(frqntQnArr) && frqntQnArr.map((item,i) => (
       <div className={styles.frqntContainer} key={i}>
       <div className={styles.frqntTitle} onClick={() => accordionToggle(i)}>
       <h3 className={styles.frqntQn}>{item?.qn}</h3>
       <span>{accordion === i ? <FaCaretDown/> : <FaCaretUp/>}</span>
       </div>
       <p className={`${styles.frqntAns} ${accordion === i ? styles.openTab : null}`}>{item?.ans}</p>
       </div>
      ))}
    </div>
  );
}

const initialValues = {
    name:"",
    email: "",
    message: "",
}

const validateForm = Yup.object({
    name:Yup.string().min(2).max(10).required("Please enter a name"),
    email:Yup.string().email().required("Please enter a email"),
    message:Yup.string().min(10).max(30).required("Please enter a message")
})

function AskQuestions() {

const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({initialValues,validationSchema:validateForm,onSubmit:(values) => {
    console.log(values);
}})

  return <div className={styles.askQuestions}>
  <span className={styles.line}></span>
  <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.inputBox}>
  <label htmlFor="name">Name</label>
  <input type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Write Your Name " />
  {errors?.name && touched?.name ? <p className={styles.errorMsg}>{errors?.name}</p> : null}
  </div>
  <div className={styles.inputBox}>
  <label htmlFor="email">Email</label>
  <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter Email"/>
  {errors?.email && touched?.email ? <p className={styles.errorMsg}>{errors?.email}</p> : null }
  </div>
  <div className={styles.inputBox}>
  <label htmlFor="message">Name</label>
    <textarea name="message"  cols="30" rows="5" value={values.message} onChange={handleChange} onBlur={handleBlur} placeholder="Write a message"></textarea>
    {errors?.message && touched?.message ? <p className={styles.errorMsg}>{errors?.message}</p>: null}
    </div>
  <button>Submit</button>
  </form>
  </div>;
}
