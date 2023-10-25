import React, { useState } from "react";

import { useCheckout } from "../context/CheckoutContext";
import CartItemsCard from "./CartItemsCard";

const CartItems = () => {
  const { products, updateProducts } = useCheckout();

  const removeProductFromState = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.product._id !== productId
    );
    updateProducts(updatedProducts);
  };
  return (
    <div className="cart-items-container">
      {products.length &&
        products.map((product, i) => (
          <CartItemsCard
            key={i}
            product={product}
            removeProductFromState={removeProductFromState}
          />
        ))}
    </div>
  );
};

export default CartItems;