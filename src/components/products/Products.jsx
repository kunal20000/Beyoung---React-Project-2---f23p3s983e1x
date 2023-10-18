import React, { useEffect, useState } from "react";
import "./product.css";
import { apiURL, getProductById } from "../utils/getProductApi";
import axios from "axios";
import {
  getAuthHeaderConfig,
  getHeaderWithProjectIdAndBody,
} from "../utils/getHeader";
import { ReactComponent as LikeWhishlistIcon } from "../asset/likeWishlist.svg";
import { Link, NavLink } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${apiURL}api/v1/ecommerce/clothes/products`,
        getHeaderWithProjectIdAndBody()
      );
      setProduct([...product, ...res.data.data]);
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="product-container">
      <div className="men-clothing">
        <div className="filter-clothing">
          <h5>Filter</h5>
        </div>
        <div className="men-clothing-main">
          <h5 className="heading-men-clothing">Men clothing</h5>
          <div>
            <p className="for-p">
              <b>Men clothing</b>
              &nbsp; all about being stylish and comfortable all day long.
              Beyoung understands the same and provides you with a handsome
              range of Clothing For Men out there. Scroll below to get a look at
              it.
            </p>
          </div>
          <div className="productListContainer">
            {product.map((pro, id) => {
               const { name, price, _id, displayImage, subCategory } = pro;
              return (
              
                  <div className="product-container-male" key={id}>
                    <Link className="productCotainerStart" to={`/products/${_id}`}>
                    <a className="for-man-image" href="#">
                      <img
                        className="image-for-male"
                        src={pro.displayImage}
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
