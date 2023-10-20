import React, { useState, useEffect } from "react";
import "./login.css";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiURL } from "../utils/getProductApi";
import { useNavigate } from "react-router-dom";
import {
  getHeaderWithProjectIdAndBody,
  headerWithProjectIdOnly,
} from "../utils/getHeader";
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      setEmailErr("Please enter a valid email address.");
      console.log(value);
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
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data.name));
        setLoader(true);
        closeModal(true);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      setErr(true);
      toast.error("Something went wrong!Please try again later.");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(userInfo.email) && userInfo.password.length >= 6) {
      // If email and password are valid, attempt login
      signIn(userInfo);
    } else {
      // Display error messages
      setEmailErr(
        isValidEmail(userInfo.email)
          ? false
          : "Please enter a valid email address."
      );
      setPasswordErr(
        userInfo.password.length >= 6
          ? false
          : "Password must be at least 6 characters long."
      );
    }
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
                    fontSize: "17px",
                    textAlign: "center",
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
      <ToastContainer />
    </div>
  );
};

export default Login;
