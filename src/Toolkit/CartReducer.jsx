import { createSlice } from "@reduxjs/toolkit";

const cartStorage = JSON.parse(localStorage.getItem('cartItem')) || [];
const totalQuantityStorage = JSON.parse(localStorage.getItem('totalQuantity')) || 1;
const totalAmountStorage = JSON.parse(localStorage.getItem("totalAmount")) || null;

const initialState = {
    cart: cartStorage,
    stock:null,
    totalQuantity:totalQuantityStorage,
    totalAmount:totalAmountStorage
}


function handleLocalStorage(cart,quantity,amount,stock){
    localStorage.setItem("cartItem",JSON.stringify(cart.map(item => item)))
    localStorage.setItem("totalAmount",JSON.stringify(amount))
    localStorage.setItem("totalQuantity",JSON.stringify(quantity))
    localStorage.setItem("stock",JSON.stringify(stock))
}

const reducers = {
    increaseItemCount: (state, action) => {
        const [str,num,id] = action.payload
        if(str === 'itemPage'){
            state.totalQuantity += num
        }
        if(str === "cartPage"){
          const data = Array.isArray(state.cart) && state.cart.filter(item => item.id === id)
          data[0].quantity += 1
          data[0].subTotal = data[0].quantity * data[0].price
        }
        state.totalAmount = Array.isArray(state.cart) && state?.cart.map(item => item.subTotal).reduce((acc,item) => acc + item,0)
   
        handleLocalStorage(state.cart,state.totalQuantity,state.totalAmount)
    },
    
    decreaseItemCount: (state, action) => {
        const [str,num,id] = action.payload
        if(str === 'itemPage'){
            state.totalQuantity === 1 ? 1 :state.totalQuantity -= num
        }
        if(str === "cartPage"){
            const data = Array.isArray(state.cart) && state.cart.filter(item => item.id === id)
            if(data[0].quantity === 1){
                data[0].quantity = num
            }else {
                data[0].quantity -= num
                data[0].subTotal = data[0].quantity * data[0].price
            }
         }
        state.totalAmount = Array.isArray(state.cart) && state.cart.map(item => item.subTotal).reduce((acc,item) => acc + item,0)
       
        handleLocalStorage(state.cart,state.totalQuantity,state.totalAmount)
    },
    
    addToCart:(state,action) => {
        const newItem = action.payload
        const existingItemIndex = Array.isArray(state.cart) && state?.cart.findIndex(item => item.id === newItem.id)
        if(existingItemIndex !== -1){
            state.cart[existingItemIndex].quantity += newItem.quantity
            state.cart[existingItemIndex].subTotal += newItem.subTotal
        }else {
            state.cart.push(newItem)
        }
        state.totalQuantity = 1
        state.totalAmount = Array.isArray(state.cart) && state.cart.map(item => item.subTotal).reduce((acc,item) => acc + item,0)
        state.stock = newItem.stock
        handleLocalStorage(state.cart,state.totalQuantity,state.totalAmount,state.stock)
        
    },
    removeFromCart: (state, action) => {
        const removedItemId = action.payload;
        state.cart = Array.isArray(state.cart) && state.cart.filter(item => item.id !== removedItemId);
        state.totalAmount = Array.isArray(state.cart) && state.cart.map(item => item.subTotal).reduce((acc, item) => acc + item, 0);
        handleLocalStorage(state.cart,state.totalQuantity,state.totalAmount,state.stock)
    },
    
    
};

const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers
})


export const {handleTotalItems,increaseItemCount,decreaseItemCount,addToCart,removeFromCart} = cartReducer.actions
export default cartReducer.reducer