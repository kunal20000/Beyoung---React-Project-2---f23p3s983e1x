import React, { useEffect, useState } from "react";
import "./product.css";
import { ReactComponent as LikeWhishlistIcon } from "../asset/likeWishlist.svg";
import { Link, NavLink } from "react-router-dom";

const ProductsList = ({ products }) => {
  return (
    <div className="product-container">
      <div className="men-clothing">
        <div className="filter-clothing">
          <h5>Filter</h5>
        </div>

        <div className="productListContainer">
          {!products ? (
            <p>
              <span class="loader"></span>
            </p>
          ) : (
            products.map((pro, id) => {
              // my mapping logic here
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
                      <div className="heart-icon">
                        <LikeWhishlistIcon />
                      </div>
                    </a>

                    <h6>{pro.name}</h6>
                    <div className="for-price-off">
                      <p className="inline-elements">₹{pro.price}</p> &nbsp;
                      &nbsp;
                      <span className="inline-elements">(50%off)</span>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
//
export default ProductsList;
