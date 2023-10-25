import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";
import { useCheckout } from "../context/CheckoutContext";
import { useLoader } from "../context/LoaderContext";
import { getCartItems } from "../utils/CartApi";

const CartComponent = () => {
    
  const { products, updateProducts, updateTotalItems, updateTotalPrice } = useCheckout();
  const { updateLoaderStatus } = useLoader();
  const fetchProducts = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getCartItems();
      const { items, totalPrice } = res.data;
      updateProducts(items);
      updateTotalPrice(totalPrice);
      updateTotalItems(items.length);
    } catch (error) {
      console.log(console.error);
    }finally{
        updateLoaderStatus(false);
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div>
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart-container">
          <CartItems />
        </div>
      )}
    </div>
  );
};

export default CartComponent;
