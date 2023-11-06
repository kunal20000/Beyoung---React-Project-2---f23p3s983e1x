import React from "react";
import "./checkout.css";
import { useCheckout } from "../context/CheckoutContext";
import EmptyCart from "../cart/EmptyCart";
import AddressBox from "./AddressBox";
import TotalPriceBox from "./TotalPriceBox";
import { Outlet } from "react-router";

const CheckoutComponent = () => {
  const { totalItems, checkoutAddress } = useCheckout();
  console.log("totalItems", totalItems);
  console.log("checkoutAddress", checkoutAddress);
  return (
    <div>
      {totalItems === 0 && Object.keys(checkoutAddress).length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="checkout-Container cart-container">
          <Outlet />
          <TotalPriceBox />
          
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;
