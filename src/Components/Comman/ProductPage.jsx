import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import {  useLocation, useNavigate } from "react-router-dom";
import {   useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import toast , { Toaster }  from "react-hot-toast";

import { IoCloseCircle } from "react-icons/io5";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdZoomOutMap, MdOutlineNoTransfer } from "react-icons/md";
import { CiDeliveryTruck, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { GiTakeMyMoney, GiLaurelsTrophy, GiTripleLock } from "react-icons/gi";

import SPLoading from "./SPLoading";
import Nav from "../Nav";
import Footer from "./Footer";
import styles from "../SCSS/ProductPage.module.scss";
import Error from "./Error";
import Star from "./Star";
import Discount from "./Discount";
import useDiscount from "../../Custome Hooks/useDiscount";
import RealtedProduct from "./RealtedProduct";
import UserReviews from "./UserReviews";
import useUpperCase from "../../Custome Hooks/useUpperCase";

import { increaseItemCount,decreaseItemCount,addToCart} from "../../Toolkit/CartReducer";

async function fetchSingleProduct(id) {
  const res = await axios.get(`http://localhost:3000/flowless/${id}`);
  return res;
}

export default function ProductPage() {
  const [showSlider, setShowSlider] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const location = useLocation();
  const getId = +location.pathname.split("/").pop();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singleProduct", getId],
    queryFn: () => fetchSingleProduct(getId),
    refetchOnWindowFocus: false,
  });

  //* ===================================== Image Resizer

  const mainImg = data?.data?.images[imgIndex];

  return (
    <>
      <div className={styles.productPage}>
        <Nav />
   
    <Online>
    <AboutProduct
      mainImg={mainImg}
      data={data}
      setImgIndex={setImgIndex}
      imgIndex={imgIndex}
      setShowSlider={setShowSlider}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
    <UserReviews />
  <RealtedProduct/>
  </Online>
  <Offline>
    <Error />
  </Offline>
        <Footer />
      </div>
      {showSlider && (
        <ImageSlider
          mainImg={mainImg}
          data={data}
          setImgIndex={setImgIndex}
          setShowSlider={setShowSlider}
          imgIndex={imgIndex}
        />
      )}
    </>
  );
}

function AboutProduct({
  mainImg,
  data,
  setImgIndex,
  imgIndex,
  setShowSlider,
  isLoading,
  isError,
  error,
}) {
  return (
    <div className={styles.aboutProduct}>
      {isLoading ? (
        <SPLoading />
      ) : (
        <>
          <div className={styles.aboutContainer}>
            {isError && (
              <Error
                ErrorMsg={error?.response?.statusText}
                ErrorStatus={error?.response?.status}
              />
            )}
            {!isLoading && !isError && (
              <>
                <ProductImg
                  mainImg={mainImg}
                  data={data}
                  setShowSlider={setShowSlider}
                  setImgIndex={setImgIndex}
                  imgIndex={imgIndex}
                  isLoading={isLoading}
                />
                <ProductDetails data={data} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ProductImg({
  mainImg,
  data,
  setShowSlider,
  setImgIndex,
  imgIndex,
  isLoading,
}) {
  const imgLenght = data?.data?.images.length;

  return (
    <div className={styles.productImg}>
      <div className={styles.mainImg}>
        <MdZoomOutMap className={styles.zoomOut} />

        <img
          src={mainImg}
          alt={`${data?.data?.brand} Main Image`}
          onClick={() => setShowSlider(true)}
          loading="lazy"
        />

        <FaChevronCircleLeft
          className={styles.leftBtn}
          onClick={() =>
            setImgIndex((index) => (index === 0 ? imgLenght - 1 : index - 1))
          }
        />
        <FaChevronCircleRight
          className={styles.rightBtn}
          onClick={() =>
            setImgIndex((index) => (index === imgLenght - 1 ? 0 : index + 1))
          }
        />
      </div>
      <div className={styles.thumbnailContainer}>
        <div className={styles.thumbnailImg}>
          {data?.data?.images.map((imgs, i) => (
            <img
              src={imgs}
              alt={`${data?.data?.brand} Thumbnail Image`}
              key={i}
              onClick={() => setImgIndex(i)}
              className={imgIndex === i ? styles.thumbnailImgActive : ""}
            />
          ))}
        </div>
      </div>

      {/* ================================ About Item 2 */}
      <div className={styles.aboutItem2}>
        <table>
          <tr>
            <td className={styles.aboutItem__Txt}>Category</td>
            <td className={styles.aboutItem__Val}>{data?.data?.category}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Brand</td>
            <td className={styles.aboutItem__Val}>{data?.data?.brand}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Net Quantity</td>
            <td className={styles.aboutItem__Val}>{data?.data?.netQuantity}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Number of Items</td>
            <td className={styles.aboutItem__Val}>
              {data?.data?.numberOfItems}
            </td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Use For</td>
            <td className={styles.aboutItem__Val}>{data?.data?.useFor}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Skin Type</td>
            <td className={styles.aboutItem__Val}>{data?.data?.skinType}</td>
          </tr>
        </table>
        <p className={styles.ingredients}>
          <span>Ingredients:</span>
          {data?.data?.ingredients}
        </p>
        <div className={styles.description}>
          <h2>Description:</h2>
          <ul>
            {data?.data?.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProductDetails({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.cartProduct)
  const {totalQuantity,cart} = selector;
  const stock = data?.data?.stock;
  let stockCheck = totalQuantity < stock
  const notify = () => toast(`${data?.data?.title} is Out of Stock`);
  const checkCart = (itemData) => toast(`You already have ${itemData[0]} of ${itemData[1]} Product in your cart`)
  
  let quantityCheck;
  let validateQuantity;
  let cartItemDetails;
  
  function checkQuantity(){
   quantityCheck =  cart.filter(item => item.id === data?.data?.id)
   validateQuantity = quantityCheck[0]?.quantity + totalQuantity === quantityCheck[0]?.stock || quantityCheck[0]?.quantity === stock
   cartItemDetails = [quantityCheck[0]?.quantity,quantityCheck[0]?.name]
   if(validateQuantity){
     checkCart(cartItemDetails)
   }else {
    stockCheck ? dispatch(increaseItemCount(["itemPage",1])) : notify()
   }
  

  }

function handleItemCount(str){
  if(str === "minus") return dispatch(decreaseItemCount(["itemPage",1]))
  if(str === "plus"){
    checkQuantity()
  }
}


function discount(price, discount) {
  const discountValue = discount / 100;
  const discountedPrice = price * discountValue;
  const mainPrice = Math.round(price - discountedPrice);

  return mainPrice;
}

const discountPrice = discount(data?.data?.price,data?.data?.discount)


function handleAddToCart(){

 const obj = {
    id:data?.data.id,
    name:data?.data?.title,
    img:data?.data?.images[0],
    price:discountPrice,
    subTotal:discountPrice * totalQuantity,
    quantity:totalQuantity,
    stock:data?.data?.stock
  }

  if(validateQuantity){
    checkCart(cartItemDetails)
    setTimeout(() => {
        location.reload();
      },5000)
  }else {
    navigate("/cart")
    dispatch(addToCart(obj))
  }
  
}

console.log(totalQuantity,stock);

const serviceArr = [
    {
      icon: <CiDeliveryTruck />,
      title: "Free Delivery",
    },
    {
      icon: <GiTakeMyMoney />,
      title: "Pay On Delivery",
    },
    {
      icon: <MdOutlineNoTransfer />,
      title: "Non-Returnable",
    },
    {
      icon: <GiLaurelsTrophy />,
      title: "Top Brand",
    },
    {
      icon: <GiTripleLock />,
      title: "Secure Transaction",
    },
  ];
 

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.title}>{data?.data?.title}</h1>
      <h3 className={styles.brand}>Brand:{useUpperCase(data?.data?.brand)}</h3>
      <div className={styles.rating}>
        <span className={styles.rating__Txt}>{data?.data?.rating}</span>
        <span>
          <Star
            ratings={data?.data?.rating}
            colorStr={"#8c8c91"}
            size={"1.4rem"}
          />
        </span>
        <span className={styles.rating__reviews}>
          ({data?.data?.reviews} Reviews)
        </span>
      </div>
      <div className={styles.price}>
        <table>
          <tr>
            <td className={styles.price__Txt}>M.R.P:</td>
            <td className={styles.price__Val}>
              <s>₹{data?.data?.price}</s>
            </td>
          </tr>
          <tr>
            <td className={styles.price__Txt}>Deal Price:</td>
            <td className={styles.price__Dis}>
              <Discount
                price={data?.data?.price}
                discount={data?.data?.discount}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.price__Txt}>You Save:</td>
            <td className={styles.price__Save}>
              ₹
              {data?.data?.price -
                useDiscount(data?.data?.price, data?.data?.discount)}{" "}
              ({data?.data?.discount}%)
            </td>
          </tr>
        </table>
      </div>
      <div className={styles.productService}>
        {Array.isArray(serviceArr) &&
          serviceArr.map((item, i) => (
            <div className={styles.serivce} key={i}>
              <span className={styles.serivce__Icon}>{item.icon}</span>
              <span className={styles.serivce__Title}>{item.title}</span>
            </div>
          ))}
      </div>
      {/*=================================================== Add to card section */}
      <div className={styles.cartBtn}>
        <div className={styles.itemNum}>
          <CiCircleMinus className={styles.minusIcon} onClick={() => handleItemCount("minus")} />
          <span>{totalQuantity}</span>
          <CiCirclePlus className={styles.plusIcon} onClick={() => handleItemCount("plus")}/>
          <Toaster toastOptions={{
            style:{
              fontSize:"1.5rem",
              fontWeight:"500",
              boxShadow:"1px 1px 10px #fa2d64"
            }
          }}/>
        </div>
     
        <button onClick={handleAddToCart} className={styles.addToCartBtn} disabled={totalQuantity === stock}>{stockCheck ? "Add To Cart" : "Out of Stock"}</button>
      
      </div>
      <div className={styles.aboutItem}>
        <table>
          <tr>
            <td className={styles.aboutItem__Txt}>Category</td>
            <td className={styles.aboutItem__Val}>{useUpperCase(data?.data?.category)}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Brand</td>
            <td className={styles.aboutItem__Val}>{useUpperCase(data?.data?.brand)}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Net Quantity</td>
            <td className={styles.aboutItem__Val}>{data?.data?.netQuantity}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Number of Items</td>
            <td className={styles.aboutItem__Val}>
              {data?.data?.numberOfItems}
            </td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Use For</td>
            <td className={styles.aboutItem__Val}>{data?.data?.useFor}</td>
          </tr>
          <tr>
            <td className={styles.aboutItem__Txt}>Skin Type</td>
            <td className={styles.aboutItem__Val}>{data?.data?.skinType}</td>
          </tr>
        </table>
        <p className={styles.ingredients}>
          <span>Ingredients:</span>
          {data?.data?.ingredients}
        </p>
        <div className={styles.description}>
          <h2>Description:</h2>
          <ul>
            {data?.data?.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ImageSlider({ mainImg, data, setImgIndex, setShowSlider, imgIndex }) {
  const imgLength = data?.data?.images.length;

  return (
    <>
      <div
        className={styles.imgLayer}
        onClick={() => setShowSlider(false)}
      ></div>
      <div className={styles.sliderContainer}>
        <div className={styles.imagesPart}>
          <IoCloseCircle
            className={styles.closeBtn}
            onClick={() => setShowSlider(false)}
          />
          <img src={mainImg} alt={`${data?.data?.brand} Slider Image`} />

          <FaChevronCircleLeft
            className={styles.sliderLeftBtn}
            onClick={() =>
              setImgIndex((index) => (index === 0 ? imgLength - 1 : index - 1))
            }
          />
          <FaChevronCircleRight
            className={styles.sliderRightBtn}
            onClick={() =>
              setImgIndex((index) => (index === imgLength - 1 ? 0 : index + 1))
            }
          />
        </div>
        <div className={styles.sliderThumbnailImg}>
          {data?.data?.images.map((imgs, i) => (
            <img
              src={imgs}
              alt={`${data?.data?.brand} Thumbnail Image`}
              key={i}
              onClick={() => setImgIndex(i)}
              className={imgIndex === i ? styles.sliderThumbImg : ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}




