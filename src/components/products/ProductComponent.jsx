import React, { useState, useEffect } from "react";
import "./productComponent.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/getProductApi";
import StarIcon from "@mui/icons-material/Star";
import { ReactComponent as CartLogo } from "../asset/cart.svg";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Divider, LinearProgress, Rating } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
          {/* <div className="forImageShowing">
            <img src={product.images} alt="" />
          </div> */}
          <img width="30%" src={product.displayImage} alt="" />
        </div>
        <div className="product-right">
          <h5>{product.name}</h5>
          <p>{product.subCategory}</p>
          <b>&#8377; {product.price}</b>
          <span>&nbsp; &nbsp;(50%off)</span>
          <span className="discounted-text">
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <label htmlFor="">
            Quantity<sup>*</sup>
          </label>
          <select name="" id="">
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <div className="btn-cart-buy">
            <button className="btn-cart"> <CartLogo/>  add to cart</button>
            <button className="btn-buy"> <ArrowCircleRightIcon/> buy now</button>
          </div>
        </div>
      </div>
      <div className="product-info-container">
        <h3>Product Details</h3>
        <div className="product-details-section">
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <content>
              Fabric Stretch Denim Weave Type Twill Fade Light Blue Fit Slim
              Tapered Fit Pocket 5 Pockets Waist Rise Mid-Rise Wash Indigo Wash
              Style Everyday Casuals
            </content>
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <content>
              Fabric Stretch Denim Weave Type Twill Fade Light Blue Fit Slim
              Tapered Fit Pocket 5 Pockets Waist Rise Mid-Rise Wash Indigo Wash
              Style Everyday Casuals
            </content>
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <content>
              Fabric Stretch Denim Weave Type Twill Fade Light Blue Fit Slim
              Tapered Fit Pocket 5 Pockets Waist Rise Mid-Rise Wash Indigo Wash
              Style Everyday Casuals
            </content>
          </div>
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <content>
              Fabric Stretch Denim Weave Type Twill Fade Light Blue Fit Slim
              Tapered Fit Pocket 5 Pockets Waist Rise Mid-Rise Wash Indigo Wash
              Style Everyday Casuals
            </content>
          </div>
        </div>
      </div>
      <div className="ratings-review-container">
        <h3>Rating & Reviews</h3>
        <div className="ratings-review-section">
          <div className="review-section-left">
            <h3>4.8</h3>
            <Rating name="read-only" value={5} readOnly />
            <p>Based on 31K+ ratings and 9K+ reviews</p>
          </div>
          <div className="review-section-right">
            <h4>Product reviews</h4>
            <p><ThumbUpIcon/>91% of customers recommend this brand</p>
            <Divider sx={{marginBottom:'2rem'}}/>
            <div className="rating-bar"><span>5</span><StarBorderIcon/><LinearProgress style={{ width:'70%' }} color='inherit' variant="determinate" value={80} /><span>80+</span> </div>
            <div className="rating-bar"><span>4</span><StarBorderIcon/><LinearProgress style={{  width:'70%' }} color='inherit' variant="determinate" value={10} /><span>10+</span> </div>
            <div className="rating-bar"><span>3</span><StarBorderIcon/><LinearProgress style={{  width:'70%' }} color='inherit' variant="determinate" value={7} /> <span>7+</span></div>
            <div className="rating-bar"><span>2</span><StarBorderIcon/><LinearProgress style={{  width:'70%' }} color='inherit' variant="determinate" value={3} /> <span>3+</span></div>
            <div className="rating-bar"><span>1</span><StarBorderIcon/><LinearProgress style={{  width:'70%' }} color='inherit' variant="determinate" value={1} /> <span>1+</span></div>


          </div>
        </div>
      </div>
      {/* <BestSeller/> */}
      <div className="about-us-container">
        <ul>
          <li><img src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon1.jpg" alt="1.5M+ Happy Beyoungsters" /><p>1.5M+ Happy Beyoungsters</p></li>
          <li><img src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon2.jpg" alt="15 Days Easy Returns" /><p>15 Days Easy Returns</p></li>
          <li><img src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon3.jpg" alt="Homegrown Brand" /><p>Homegrown Brand</p></li>
          <li><img src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon4.jpg" alt="Packed with Safety" /><p>Packed with Safety</p></li>
          
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;
