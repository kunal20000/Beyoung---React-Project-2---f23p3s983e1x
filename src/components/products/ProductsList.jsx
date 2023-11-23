import React, { useEffect, useState } from "react";
import "./product.css";
import { ReactComponent as LikeWhishlistIcon } from "../asset/likeWishlist.svg";
import { Link, NavLink } from "react-router-dom";
import { useAuth, userUpdateLoginModalStatus } from "../context/AuthContext";
import { useUpdateWishlistNumbers } from "../context/CartNumberContext";
import { useLoader } from "../context/LoaderContext";
import { addToFavAPI } from "../utils/WishlistApi";
import { toast } from "react-toastify";
import FilterProducts from "./FilterProducts";

const ProductsList = ({ products }) => {
  console.log("Type of products:", typeof products);
  const { name, price, _id, displayImage, subCategory } = products;
  const loginStatus = useAuth();
  const setShowLoginModal = userUpdateLoginModalStatus();
  const updateWishlistNumbers = useUpdateWishlistNumbers();
  const { updateLoaderStatus } = useLoader();

  const handleAddToFav = async (e, productId) => {
    e.preventDefault();
    const body = {
      productId,
    };
    if (loginStatus) {
      try {
        updateLoaderStatus(true);
        console.log(updateLoaderStatus);
        const res = await addToFavAPI(body);
        console.log(body);
        // console.log(res);
        if (res.status === "success") {
          toast.success(res.message);
          updateWishlistNumbers(res.results);
        } else if (res.status === "fail") {
          toast.error(res.message);
        } else {
          toast.error("Something went wrong, please try again later.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        updateLoaderStatus(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <div className="product-container">
      {/* <div className="men-clothing"> */}
        {/* <div className="filter-clothing">
          <FilterProducts/>
        </div> */}

        <div className="productListContainer">
          {
          products.map((pro, id) => {
              //my mapping logic here
              const { name, price, _id, displayImage, subCategory } = pro;
              return (
                <div className="product-container-male" key={id}>
                  <Link
                    className="productCotainerStart"
                    to={`/products/${_id}`}
                  >
                    <a className="for-man-image" href="#">
                      <img
                        className="image-for-male"
                        src={displayImage}
                        alt=""
                      />
                      <div
                        className="heart-icon"
                        onClick={(e) => handleAddToFav(e, _id)}
                      >
                        <LikeWhishlistIcon />
                      </div>
                    </a>

                    <h6 style={{textAlign:"start"}} >{name}</h6>
                    <div className="for-price-off">
                      <p className="inline-elements">₹{price}</p> &nbsp; &nbsp;
                      <span className="inline-elements">(50%off)</span>
                    </div>
                  </Link>
                </div>
              );
            })
         
          }
        </div>
      {/* </div> */}
    </div>
  );
};

export default ProductsList;
