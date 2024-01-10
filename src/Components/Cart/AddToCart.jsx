import { useSelector,useDispatch } from "react-redux";
import toast , { Toaster }  from "react-hot-toast";
import {CiCirclePlus, CiCircleMinus } from "react-icons/ci"

import Footer from "../Comman/Footer";
import Nav from "../Nav";

import { decreaseItemCount,increaseItemCount,removeFromCart } from "../../Toolkit/CartReducer";
import styles from "../SCSS/Cart.module.scss"
import { useEffect, useRef, useState } from "react";

export default function AddToCart() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.cartProduct)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let {cart,totalAmount} = selector

  const outOfStock = (name) => toast(`${name} is Out of Stock`);

function handleItemCount(str,num,id,quantity,stock,name){
   if(str === 'minus') {
   dispatch(decreaseItemCount(["cartPage", num,id]))
   }
   if (str === "plus") {
    if( quantity === stock){
      outOfStock(name)
      setTimeout(() => {
        location.reload();
      },5000)
    } else {
      dispatch(increaseItemCount(["cartPage", num, id]));
    }  
    }
}

useEffect(() => {
  const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
},[])

console.log(totalAmount);
  return (
   <>
   <Nav/>
   <div className={styles.cart}>
   {Array.isArray(cart) && cart.length > 0 && <div className={styles.cart__Container }>
   {screenWidth >= 992 ? <MoniterViewCart  cart={cart} onItemCount={handleItemCount}/> : <MobileViewCart  cart={cart} onItemCount={handleItemCount}/> }
   </div>}
   {Array.isArray(cart) && cart.length === 0 && <div className={styles.emptyCart}>
   <h2>Cart is Empty</h2>
   </div>}
   </div>
    <Footer/>
   </>
  )
}


function MoniterViewCart({cart,onItemCount}){
  const dispatch = useDispatch();
  const containerRef = useRef()
  const [divHeight,setdivHeight] = useState()

  useEffect(() => {
  if(containerRef.current){
    const containerHeight = containerRef.current.getBoundingClientRect().height;
      setdivHeight(Math.floor(containerHeight))
  }
},[])

 return <div className={styles.moniterCart}>
 <div className={styles.cartTitle}>
 <h2>Cart</h2>
 </div>
<div className={styles.moniterCart__Box}>
<div className={styles.moniterCart__Container}>
<div className={styles.moniterCart__heading}>
  <p>Product</p>
  <p>Price</p>
  <p>Quantity</p>
  <p>SubTotal</p>
</div>
<div ref={containerRef} className={`${styles.moniterCart__data} ${divHeight > 400 ? styles.activeScroll : null }`}>
  {Array.isArray(cart) && cart.map((item,i) => (
    <div className={styles.container} key={i}>
      <div className={styles.product}>
      <span className={styles.closeBtn} onClick={() => dispatch(removeFromCart(item?.id))} >X</span>
      <img src={item?.img} alt={item?.name} />
      <p>{item?.name}</p>
      </div>
      <div className={styles.price}>
      <p>₹{item?.price}</p>
      </div>
      <div className={styles.quantity}>
      <CiCircleMinus onClick={() => onItemCount("minus",1,item?.id)} className={styles.minusIcon}/>
      <span className={styles.cartQuantity}>{item?.quantity}</span>
      <CiCirclePlus onClick={() => onItemCount("plus",1,item?.id,item?.quantity,item?.stock,item?.name)} className={styles.plusIcon}/>
      </div>
      <div className={styles.subTotal}>
      <p>₹{item?.subTotal}</p>
      </div>
    </div>
  ))}
</div>
<Toaster toastOptions={{
  style:{
    fontSize:"1.2rem",
    fontWeight:"500",
    boxShadow:"1px 1px 10px #fa2d64"
  }
}}/>
</div>
</div>
<SubTotals/>
 </div>

 
}

function MobileViewCart({cart,onItemCount}){
  const dispatch = useDispatch();
  const containerRef = useRef()
  const [divHeight,setdivHeight] = useState()

  useEffect(() => {
  if(containerRef.current){
    const containerHeight = containerRef.current.getBoundingClientRect().height;
      setdivHeight(Math.floor(containerHeight))
  }
},[])

  return <div  className={`${styles.mobileCart}`}>
  <div ref={containerRef} className={`${styles.mobileCart__box} ${divHeight > 700 ? styles.activeScroll : null }`}>
  <h2 className={styles.cartTitle}>Cart</h2>
  <div className={styles.mobileCart__Container}>
  {Array.isArray(cart) && cart.map((item,i) => (
    <div className={styles.mobileCart__Data} key={i}> 
    <div className={styles.mobileCart__img}>
      <img src={item?.img} alt={item?.name} />
    </div>
    <div className={styles.mobileCart__itemdetails}>
      <p className={styles.itemTitle}>Product:</p>
      <p className={styles.itemName}>{item?.name}</p>
    </div>
    <div className={styles.mobileCart__itemdetails}>
      <p className={styles.itemTitle}>Price:</p>
      <p className={styles.itemName}>₹{item?.price}</p>
    </div>
    <div className={styles.mobileCart__itemdetails}>
      <p className={styles.itemTitle}>Quantity:</p>
      <div className={styles.ItemQuantity}>
        <CiCircleMinus onClick={() => onItemCount("minus",1,item?.id)} className={styles.minusIcon}/>
        <span className={styles.cartQuantity}>{item?.quantity}</span>
        <CiCirclePlus onClick={() => onItemCount("plus",1,item?.id,item?.quantity,item?.stock,item?.name)} className={styles.plusIcon}/>
      </div>
    </div>
    <div className={styles.mobileCart__itemdetails}>
      <p className={styles.itemTitle}>Subtotal:</p>
      <p className={styles.itemName}>₹{item?.subTotal}</p>
    </div>
        <div className={styles.btnBox}>
        <button onClick={() => dispatch(removeFromCart(item?.id))} className={styles.btnRemove}>Remove</button>
        </div>
    </div>
    
  ))}
  </div>
  </div>
  <Toaster toastOptions={{
            style:{
              fontSize:"1.2rem",
              fontWeight:"500",
              boxShadow:"1px 1px 10px #fa2d64"
            }
          }}/>
          <SubTotals/>
  </div>
}


function SubTotals(){
  const selector = useSelector(state => state.cartProduct)
 
  let {totalAmount} = selector

  return <div className={styles.totalAmount}>
  <div className={styles.totalAmount__container}>
  <div className={styles.totalAmount__heading}>
  <p>Cart Totals</p>
  </div>
  <div className={styles.amount}>
  <p>Total</p>
  <span>₹{totalAmount}</span>
  </div>
  <div className={styles.checkOutBtn}>
  <button >Proceed To Checkout</button>
  </div>
  </div>
  </div>
}
