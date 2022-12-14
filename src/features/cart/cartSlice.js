import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const url='https://course-api.com/react-useReducer-cart-project'

const initialState={
    cartItems:[],
    amount:0,
    total:0,
    isLoading:true
}

export const getCartItems=createAsyncThunk('cart/getCartItems',()=>{ //har function k create honay pr 3 lifecycle actions miltay hein i.e pending fulfilled rejected
    return fetch(url).then((resp)=>resp.json()).catch((err)=>console.log(err))
})

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[]
        },
        removeItem:(state,action)=>{
            const itemID=action.payload
            state.cartItems=state.cartItems.filter((item)=>item.id!==itemID)
        },
        increase:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=> item.id===payload.id)
            cartItem.amount=cartItem.amount+1
        },
        decrease:(state,{payload})=>{
            console.log(payload);
            const cartItem=state.cartItems.find((item)=> item.id===payload.id)
            cartItem.amount=cartItem.amount-1
        },
        calculateTotals: (state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * item.price;
          });
          state.amount = amount;
          state.total = total;
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state)=>{
            state.isLoading=true
        },
        [getCartItems.fulfilled]:(state,action)=>{
            console.log(action);
            state.isLoading=false
            state.cartItems=action.payload
        },
        [getCartItems.rejected]:(state)=>{
            state.isLoading=false
        },
         
    }
})

// console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotals}=cartSlice.actions  //clearCart function export kar rahy hein
export default cartSlice.reducer 