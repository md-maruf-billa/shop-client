import { createSlice } from '@reduxjs/toolkit'
import { TCartProduct } from '@/Types'
import { RootState } from './store'

type Tstate = {
  carts: TCartProduct[]
}

const initialState: Tstate = {
  carts: []
}

//* backup code

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.carts.push(action.payload)
//     },
//     removeToCart: (state, action) => {
//       state.carts = state.carts.filter(cart => cart._id !== action.payload)
//     },
//     clearCart: (state) => {
//       state.carts = []  // Clears the cart
//     }
//   }
// })


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.carts.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.carts.find(item => item._id === action.payload._id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.carts = state.carts.filter(item => item._id !== action.payload._id);
        }
      }
    },

    removeFromCart: (state, action) => {

      state.carts = state.carts.filter(item => item._id !== action.payload);
    },

    clearCart: (state) => {
      state.carts = [];
    }
  }
});



export const { addToCart, removeFromCart, clearCart, decreaseQuantity } = cartSlice.actions

export const selectCart = (state: RootState) => state?.cart?.carts

export default cartSlice.reducer
