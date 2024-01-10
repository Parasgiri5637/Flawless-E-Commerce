import { useFormik } from "formik";
import * as Yup from "yup";
import StarRating from "./StarRating";
import styles from "../SCSS/ProductPage.module.scss";
import Star from "./Star";

import toast , { Toaster }  from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  message: "",
  rating: 0,
};

const submitSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter a valid name"),
  email: Yup.string().email().required("Please enter a valid email"),
  message: Yup.string().min(3).max(30).required("Please write a review before submitting"),
  rating: Yup.number().min(1, "Please provide a rating").required("Rating is required"),
});

export default function UserReviews() {
 

  const {
    values,errors,touched,handleBlur,handleChange,handleSubmit,setFieldValue} = useFormik({initialValues: initialValues,validationSchema: submitSchema,
    onSubmit: (values, action) => {
      action.resetForm({
        values: {
          ...initialValues,
          rating: 0, 
        },
      });
      notify();
    },
  });

  const notify = () => toast('Thanks for your review. Your review is awaiting approval ');



  return (
    <div className={styles.userReviews}>
      <UserReplay />
      <div className={styles.reviewsContainer}>
        <h2>Add a Review</h2>
        <div className={styles.reviewForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.starRating}>
              <span>Your Rating:</span>
              <StarRating
                size={25}
                maxRating={5}
                color="#8c8c91"
                name="rating"
                value={values.rating}
                setFieldValue={(value) => {
                  setFieldValue("rating", value);
                }}
                userRating={values.rating}
                
              />
              {errors.rating && touched.rating ? (
                <p className={styles.formError}>{errors.rating}</p>
              ) : null}
            </div>
            <div className={styles.reviewMsg}>
              <label className={styles.msgTxt}>Your Review:</label>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="4"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.message && touched.message ? (
                <p className={styles.formError}>{errors.message}</p>
              ) : null}
            </div>
            <div className={styles.reviewSubmit}>
              <span className={styles.submitData}>
                <label htmlFor="name" className={styles.labelTxt}>
                  Name:
                </label>
                <input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  type="text"
                  placeholder="Write Your Name"
                  className={styles.inputTxt}
                  autoComplete="off"
                />
                {errors.name && touched.name ? (
                  <p className={styles.formError}>{errors.name}</p>
                ) : null}
              </span>
              <span className={styles.submitData}>
                <label htmlFor="email" className={styles.labelTxt}>
                  Email:
                </label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  placeholder="Write Your Email"
                  className={styles.inputTxt}
                  autoComplete="off"
                />
                {errors.email && touched.email ? (
                  <p className={styles.formError}>{errors.email}</p>
                ) : null}
              </span>
            </div>
            <button className={styles.submitBtn} type="submit">
              submit
            </button>
      <Toaster toastOptions={{
        style:{
          fontSize:"1.5rem",
          fontWeight:"500",
          boxShadow:"1px 1px 10px #fa2d64"
        }
      }}/>

          </form>
        </div>
      </div>
    </div>
  );
}

function UserReplay() {
  return (
    <div className={styles.userReplay}>
      <div className={styles.userImg}>
        {
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            alt="user img"
          /> || (
            <img
              src="https://secure.gravatar.com/avatar/dfc47b6f30af08a16b9847ea8c457aca?s=60&d=mm&r=g"
              alt="no user img"
            />
          )
        }
      </div>
      <div className={styles.userReplayMsg}>
        <h3>User name</h3>
        <Star ratings={4} colorStr={"#8c8c91"} size={"1.4rem"} />
        <p>This Product is very Good</p>
      </div>
    </div>
  );
}
