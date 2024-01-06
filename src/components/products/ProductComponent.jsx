import React, { useState, useEffect } from "react";
import "./productComponent.css";
import { Navigate, useParams } from "react-router-dom";
import { getProductById } from "../utils/getProductApi";
import StarIcon from "@mui/icons-material/Star";
import { ReactComponent as CartLogo } from "../asset/cart.svg";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  Divider,
  FormControlLabel,
  LinearProgress,
  RadioGroup,
  Rating,
  Radio,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useAuth, userUpdateLoginModalStatus } from "../context/AuthContext";
import {
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
} from "../context/CartNumberContext";
import { useLoader } from "../context/LoaderContext";
import { addItemToCart } from "../utils/CartApi";
import { toast } from "react-toastify";
import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate(null);
  const { id } = useParams();
  const loginStatus = useAuth();
  const updateCartNumber = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers();
  const setShowLoginModal = userUpdateLoginModalStatus();
  const { updateLoaderStatus } = useLoader();

  const [selectedImage, setSelectedImage] = useState("");
  const { updateProducts, updateTotalItems, updateTotalPrice } = useCheckout();
  const [selectedSize, setSelectedSize] = useState(false);

  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getProductById(id);
      setProduct(res);
      setSelectedImage(res.displayImage); // Set default image
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const [selectedQty, setSelectedQty] = useState(1);

  const handleQtyChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setSelectedQty(newQuantity);
  };

  const handleAddToCart = async () => {
    if (loginStatus) {
      try {
        updateLoaderStatus(true);
        const res = await addItemToCart(id, selectedQty);
        if (res.status === "success") {
          toast.success(res.message);
          updateCartNumber(res.results);
        } else if (res.status === "fail") {
          toast.error(res.message);
        } else {
          toast.error("Something went wrong, please try again later.");
        }
      } catch (err) {
        console.log(err);
      } finally {
        updateLoaderStatus(false);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleBuyNow = () => {
    if (loginStatus) {
      const checkproduct = [
        {
          quantity: selectedQty,
          product: { _id: id },
        },
      ];

      updateProducts(checkproduct);
      updateTotalItems(1);
      updateTotalPrice(product.price * selectedQty);
      navigate("/cart");
    } else {
      setShowLoginModal(true);
    }
  };
  const sizes = ["S", "M", "L", "XL"];
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const [randomRating] = useState((Math.random() * 5).toFixed(1));
  return (
    <div className="product-component-container">
      <div className="product-component-box">
        <div className="product-left">
          <div className="forImageShowing">
            {product.images &&
              product.images
                .slice(0, 5)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
          </div>

          <img width="30%" src={selectedImage} alt="" />
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
            <Rating name="read-only" value={randomRating} readOnly />
            &nbsp;
            <p>
              {randomRating} ratings and{" "}
              {Math.floor(Math.random() * 10000) + 1000} reviews
            </p>
          </section>
          <label className="for-size">
            Size Chart<sup>*</sup>
          </label>
          <RadioGroup
            row
            name="size"
            sx={{ marginLeft: "8px" }}
            value={selectedSize}
            className="for-radio"
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizes.map((size) => (
              <FormControlLabel
                className={`size-label ${
                  selectedSize === size ? "active-size" : ""
                }`}
                key={size}
                value={size}
                control={<Radio sx={{ display: "none" }} color="default" />}
                label={size}
              />
            ))}
          </RadioGroup>

          <label className="for-size">
            Quantity<sup>*</sup>
          </label>
          <select
            name="quantity"
            id="quantity"
            value={selectedQty}
            onChange={handleQtyChange}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <div className="btn-cart-buy">
            <button className="btn-cart" onClick={handleAddToCart}>
              {" "}
              <CartLogo /> add to cart
            </button>
            <button className="btn-buy" onClick={handleBuyNow}>
              {" "}
              <ArrowCircleRightIcon /> buy now
            </button>
          </div>
        </div>
      </div>
      <div className="product-info-container">
        <h3>Product Details</h3>
        <div className="product-details-section">
          <div className="product-details-box">
            <h5>Product Highlights</h5>
            <content>{product.description}</content>
          </div>
        </div>
      </div>
      <div className="ratings-review-container">
        <h3>Rating & Reviews</h3>
        <div className="ratings-review-section">
          <div className="review-section-left">
            <h3>{randomRating}</h3>
            <Rating name="read-only" value={randomRating} readOnly />
            <p>Based on 31K+ ratings and 9K+ reviews</p>
          </div>
          <div className="review-section-right">
            <h4>Product reviews</h4>
            <p>
              <ThumbUpIcon />
              91% of customers recommend this brand
            </p>
            <Divider sx={{ marginBottom: "2rem" }} />
            <div className="rating-bar">
              <span>5</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={80}
              />
              <span>80+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>4</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={10}
              />
              <span>10+</span>{" "}
            </div>
            <div className="rating-bar">
              <span>3</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={7}
              />{" "}
              <span>7+</span>
            </div>
            <div className="rating-bar">
              <span>2</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={3}
              />{" "}
              <span>3+</span>
            </div>
            <div className="rating-bar">
              <span>1</span>
              <StarBorderIcon />
              <LinearProgress
                style={{ width: "70%" }}
                color="inherit"
                variant="determinate"
                value={1}
              />{" "}
              <span>1+</span>
            </div>
          </div>
        </div>
      </div>
      {/* <BestSeller/> */}
      <div className="about-us-container">
        <ul>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon1.jpg"
              alt="1.5M+ Happy Beyoungsters"
            />
            <p>1.5M+ Happy Beyoungsters</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon2.jpg"
              alt="15 Days Easy Returns"
            />
            <p>15 Days Easy Returns</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon3.jpg"
              alt="Homegrown Brand"
            />
            <p>Homegrown Brand</p>
          </li>
          <li>
            <img
              src="https://www.beyoung.in/desktop/images/product-details-2/product-discription-icon4.jpg"
              alt="Packed with Safety"
            />
            <p>Packed with Safety</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;
