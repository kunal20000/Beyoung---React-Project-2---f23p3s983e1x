import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import {
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
} from "../context/CartNumberContext";
import { removeItemFromWishlist } from "../utils/WishlistApi";
import { toast } from "react-toastify";
import { addItemToCart } from "../utils/CartApi";
import { Link } from "react-router-dom";
import "./wishlist.css";


const WishlistCard = ({ product, removeProductFromState }) => {
  const itemid = product._id;
  const {
    products: { displayImage, _id, name, price },
  } = product;

  const { updateLoaderStatus } = useLoader();
  const updateNumbers = useUpdateWishlistNumbers();
  const updateCartNumbers = useUpdateCartNumbers();

  const handleRemoveItem = async () => {
    try {
      updateLoaderStatus(true);
      const res = await removeItemFromWishlist(_id);
      console.log(res);
      if (res.status === "success") {
        toast.success(res.message);
        updateNumbers(res.results);
        removeProductFromState(itemid);
      } else if (res.status === "fail") {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateLoaderStatus(false);
    }
  };

  const moveToCart = async () => {
    try {
      updateLoaderStatus(true);
      const res = await addItemToCart(_id, 1);

      if (res.status === "success") {
        toast.success(res.message);
        handleRemoveItem();
        updateCartNumbers(res.results);
      } else if (res.status === "fail") {
        toast.error(res.message);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };

  return (
    <div className="wishlist-card">
      <Stack spacing={0.7}>
        <Link to={`/products/${_id}`}>
          <img
            src={displayImage}
            alt={name}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </Link>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            overflow: "hidden",
          }}
          variant="subtitle1"
        >
          {" "}
          {name}
        </Typography>
        <Typography sx={{ fontWeight: "600" }} variant="subtitle1">
          {" "}
          &#8377; {price}
        </Typography>
        <button onClick={moveToCart} className="move-to-cart-btn">
          <img
            src="https://www.beyoung.in/mobile/images/my-account/bag.png"
            alt=""
          />{" "}
          Add To Cart
        </button>
      </Stack>
      <button onClick={handleRemoveItem} className="remove-from-wish-btn">
        X
      </button>
    </div>
  );
};

export default WishlistCard;
