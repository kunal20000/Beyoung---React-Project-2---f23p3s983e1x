import React, { useState, useEffect } from "react";
import "./login.css";
import "./navbar.css";
import Modal from "react-modal";
import axios from "axios";
import { apiURL } from "../utils/getProductApi";
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    document.body.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [err, setErr] = useState(false);
  const [messageSucess, setSuceessMessage] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const signIn = async (userInfo) => {
    userInfo.appType = "ecommerce";

    try {
      const header = headerWithProjectIdOnly();
      const res = await axios.post(
        `${apiURL}api/v1/user/login`,
        header,
        userInfo
      );
      console.log(res);
      if (res.data.token) {
        setSuceessMessage("logged sucessfully");
        sessionStorage.setItem("loginStatus", true);
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data.name));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true} 
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
            <span class="span-offer-text">
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
                required
              />

              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />

              <button>Log in</button>
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
