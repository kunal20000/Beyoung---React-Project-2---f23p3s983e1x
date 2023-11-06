import React from 'react';
import AddressBox from './AddressBox';
import "../cart/cart.css";
const Shipping = () => {
  return (
    <div className='address-container cart-items-container'>
      <h4>Delivery Address:</h4>
      <section className="saved-address"></section>
      <AddressBox/>
    </div>
  );
}

export default Shipping;
