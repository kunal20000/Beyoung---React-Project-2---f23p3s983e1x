import React, { useState, useEffect } from "react";
import "./productComponent.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/getProductApi";
import StarIcon from "@mui/icons-material/Star";
import { ReactComponent as CartLogo } from "../asset/cart.svg";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
const ProductComponent = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="product-component-container">
      <div className="product-component-box">
        <div className="product-left">
          <img width="30%" src={product.displayImage} alt="" />
        </div>
        <div className="product-right">
          <h5>{product.name}</h5>
          <p>{product.subCategory}</p>
          <b>&#8377; {product.price}</b>
          <span>&nbsp; &nbsp;(50%off)</span>
          <span class="discounted-text">
            Inclusive of All Taxes + Free Shipping
          </span>
          <section className="rating-container">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            &nbsp; &nbsp;
            <p>
              {product.ratings} <span>(328 Ratings & Reviews)</span>
            </p>
          </section>
          <label htmlFor="">
            Size Chart<sup>*</sup>
          </label>
          <select name="" id="">
            <option value="">Select</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <label htmlFor="">
            Quantity<sup>*</sup>
          </label>
          <select name="" id="">
            <option value="">Select</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
          <div className="btn-cart-buy">
            <button className="btn-cart"> <CartLogo/>  add to cart</button>
            <button className="btn-buy"> <ArrowCircleRightIcon/> buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
