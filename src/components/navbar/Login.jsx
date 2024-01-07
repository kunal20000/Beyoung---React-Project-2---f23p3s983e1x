import React, { useState, useEffect } from "react";
import "./login.css";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../utils/getProductApi";
import { useNavigate } from "react-router-dom";
import {
  getHeaderWithProjectIdAndBody,
  headerWithProjectIdOnly,
} from "../utils/getHeader";
import { useUpdateLoginStatus } from "../context/AuthContext";
import { useUpdateCartNumbers, useUpdateWishlistNumbers } from "../context/CartNumberContext";
import { getnumberOfCartItems } from "../utils/CartApi";
import { getNumberOfWishlistItems } from "../utils/WishlistApi";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px 0px",
    border: "none",
  },
};
const Login = ({ isOpen, closeModal }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(null);
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState(false);
  const [messageSucess, setSuceessMessage] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumber = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers();


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      setEmailErr("Please enter a valid email address.");
    } else {
      setEmailErr(false);
    }

    if (name === "password" && value.length < 6) {
      setPasswordErr("Password must be at least 6 characters long.");
    } else {
      setPasswordErr(false);
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (userInfo) => {
    userInfo.appType = "ecommerce";

    try {
      const header = headerWithProjectIdOnly();
      const res = await axios.post(
        `${apiURL}api/v1/user/login`,
        userInfo,
        header
      );
      
      console.log(res);
      if (res.data.token) {
        
        setSuceessMessage("logged sucessfully");
        toast.success("Logged In Sucessfully");
        sessionStorage.setItem("loginStatus", true);
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem("username", res.data.data.name);
        sessionStorage.setItem("userEmail", res.data.data.email);
        
        const numberOfCartItems = await getnumberOfCartItems();
        const numberOfWishlistItems = await getNumberOfWishlistItems();
        updateLoginStatus(true);
        updateCartNumber(numberOfCartItems);
        updateWishlistNumbers(numberOfWishlistItems);
        setLoader(true);
        closeModal(true);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      setErr(true);
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(userInfo);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true} // Add this line
      >
        <div className="login-container">
          <div className="image-close-bar">
            <img
              className="login-image"
              src="./images/login-image-final.jpg"
              alt=""
            />
            <button className="btn-close" onClick={closeModal}>
              X
            </button>
          </div>

          <div className="welcome-header">
            Login <span className="welcome-header-small">or</span> Signup
            <span className="span-offer-text">
              Get Exciting Offers &amp; Track Order
            </span>
          </div>
          <form className="form-Submisson" onSubmit={handleSubmit}>
            <div className="form-in">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              {emailErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "15px",
                    textAlign: "center",
                    margin:"0px"
                  }}
                >
                  {emailErr}
                </p>
              )}
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {passwordErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "15px",
                    textAlign: "center",
                    margin:"0px"
                  }}
                >
                  {passwordErr}
                </p>
              )}
              <button className="btn-login">Log in</button>
              {err && <p>{err}</p>}
              <p className="heading-bottom" onClick={closeModal}>
                Continue as Guest
              </p>
            </div>
          </form>
        </div>
      </Modal>
     
    </div>
  );
};

export default Login;
