import React from 'react';
import AddressBox from './AddressBox';

const Shipping = () => {
  return (
    <div className='address-container cart-items-container'>
      <h4>ADDRESS:</h4>
      <section className="saved-address"></section>
      <AddressBox/>
    </div>
  );
}

export default Shipping;
