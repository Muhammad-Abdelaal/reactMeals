import React from 'react';
import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import CartForm from './cartForm';
import { useState } from 'react/cjs/react.development';

const Cart = (props) => {
  const [isCartFormOpen , setIsCartFormOpen ] = useState(false);
  const cartCtx = useContext(CartContext);
   
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const isCartValid = cartCtx.items.length > 0 ;

  function cartItemAddHandler (item) {
    
    cartCtx.addItem({...item , amount:1});
  }

  function cartItemRemoveHandler (id) {
    cartCtx.removeItem(id)
  }
   
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
         <CartItem 
            key = {item.id}
            name = {item.name}
            price = {item.price}
            amount = {item.amount}
            onRemove = {cartItemRemoveHandler.bind(null,item.id)}
            onAdd = {cartItemAddHandler.bind(null,item)}
         />
        ))}
    </ul>
  );
  
  function openCartForm() {
    setIsCartFormOpen(true);
  }
  function closeCartForm(isClosed) {
    setIsCartFormOpen(isClosed)
  }
  return (
    <Modal hideCart = {props.hideCart}> 
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCartFormOpen && <CartForm closeCartForm = {closeCartForm}/>}
      <div className={classes.actions}>
        <button onClick ={props.hideCart} className={classes['button--alt']}>Close</button>
        {isCartValid && !isCartFormOpen && <button onClick={openCartForm} className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;