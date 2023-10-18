import React from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate(null);

  return (
    <div className='cart-container'>
      <div className='image-container-cart'>
       <img src="./images/empty-cart.gif" alt="" />
       <h5>Your Cart is empty and sad:(</h5>
       <p>Add Something To Make It Happy!</p>
       <button onClick={()=>navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default Cart;
