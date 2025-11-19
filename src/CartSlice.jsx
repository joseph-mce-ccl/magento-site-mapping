import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {name, cost, image} = action.payload;
        //This checks if the item is already in the cart by comparing the names
        const itemExists = state.items.find(item => item.name === name);
        if (itemExists) {
            //if the item does already exist then increase the quanity
            itemExists.quantity++;
        }
        else{
            //If it doesn't exist, then add it to the cart
            state.items.push({name, cost, image, quantity: 1})
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToBeUpdated = state.items.find(item => item.name === name);
        if (itemToBeUpdated) {
            itemToBeUpdated.quantity = quantity; // If the item is found then update its quantity to the new value
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
