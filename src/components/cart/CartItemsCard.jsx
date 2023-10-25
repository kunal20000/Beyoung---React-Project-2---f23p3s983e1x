import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteItemFromCart } from "../utils/CartApi";
import {
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
  useWishlistNumbers,
} from "../context/CartNumberContext";
import { toast } from "react-toastify";
import { useCheckout } from "../context/CheckoutContext";
import { useLoader } from "../context/LoaderContext";
import { addToFavApi } from "../utils/WishlistApi";
import './cart.css';
const CartItemsCard = ({ product, removeProductFromState }) => {
  const {
    product: { _id, name, displayImage, price },
    quantity,
  } = product;

  const [updateTotalItems, updateTotalPrice] = useCheckout();
  const [qty, setQty] = useState(quantity);
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useWishlistNumbers();

  const { updateLoderStatus } = useLoader();

  const handleQtyChange = (event) => {
    const newQuantity = event.target.value;
    setQty(newQuantity);
  };

  const removeItemFromCart = async (_id) => {
    try {
      updateLoderStatus(true);
      const res = await deleteItemFromCart(_id);
      if (res.status === "success") {
        removeProductFromState(_id);
        updateTotalItems(res.data.items.length);
        updateCartNumbers(res.data.items.length);
        updateTotalPrice(res.data.totalPrice);
        toast.success(res.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateLoderStatus(false);
    }
  };

  const moveToWishlist = async () => {
    const body = { productId: id };
    try {
      updateLoderStatus(true);
      removeItemFromCart(id);
      const res = await addToFavApi(body);
      if (res.status === "success") {
        toast.success(res.message);
        updateWishlistNumbers(res.results);
      } else if (res.status === "fail") {
        toast.error(res.message);
      }
    } catch (err) {
    } finally {
      updateLoderStatus(false);
    }
  };

  return (
    <div className="cart-item-card">
      <section className="cart-item-content">
        <div className="cart-item-img">
          <Link to={`/products/${_id}`}>
            <img src={displayImage} alt={name} />
          </Link>
        </div>
        <div className="cart-item-details">
          <p>
            {" "}
            <Link to={`/products/${_id}`}>{name}</Link>
          </p>
          <p>&#8377;{price}</p>
          <div className="cart-item-qty">
            <label htmlFor="quantity">QTY:</label>
            <select
              name="quantity"
              id="quantity"
              value={qty}
              onChange={handleQtyChange}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <Divider />
      <section className="cart-action-btns">
        <button
          onClick={() => removeItemFromCart(_id)}
          style={{ borderRight: "1px solid #E6E6E6" }}
        >
          Remove
        </button>
        <button onClick={() => moveToWishlist(_id)}>Move To Wishlist</button>
      </section>
    </div>
  );
};

export default CartItemsCard;
