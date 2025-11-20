import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import CartItem from './CartItem';

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);



  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    //Initilise total variable
    let total = 0;
    //For each item in cart, multiply the total by the quantity and add in back into the total variable
    cart.forEach((item) => {
    //Convert string to number
    const numericalCost = parseFloat(item.cost.substring(1));
    total += numericalCost * item.quantity;
    });
    return total.toFixed(2);
  };
  

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };
  const handleCheckoutShopping = (e) => {
    alert('Thank you for your purchase!');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
    }))
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) { //Checks to see if the item is above 1
        dispatch(updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        }));
      } else {
        //Remove the item if it goes below 1
        dispatch(removeItem(item.name));
        //update add to cart button back to "add to cart" from "Added"
        onRemoveFromCart(item);
      }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    //Adding this to resent the add to cart button from "added" back to "add to cart"
    onRemoveFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    //Convert to string
    const numericalCost = parseFloat(item.cost.substring(1));
    //To get total cost multiply by the item quantity
    return numericalCost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: £{calculateTotalAmount()}</h2>
      <h3>{totalItems}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Item Cost: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Sub Total: £{calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


