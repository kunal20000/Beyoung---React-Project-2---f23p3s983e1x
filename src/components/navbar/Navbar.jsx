import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { ReactComponent as LocationLogo } from "../asset/location.svg";
import { ReactComponent as BeyoungLogo } from "../asset/beyoung.svg";
import { ReactComponent as SearchLogo } from "../asset/searchbar.svg";
import { ReactComponent as WishListLogo } from "../asset/wishlist.svg";
import { ReactComponent as CartLogo } from "../asset/cart.svg";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { apiURL } from "../utils/getProductApi";
import { headerWithProjectIdOnly } from "../utils/getHeader";

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
const navbar = () => {
  // let subtitle;
  const navigate = useNavigate(null);
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState(false);
  const [messageSucess, setSuceessMessage] = useState();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    appType: "ecommerce",
  });
  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const signIn = async (userInfo) => {
    userInfo.appType = "ecommerce";

    try {
      const header = headerWithProjectIdOnly();
      const res = await axios.post(
        `${apiURL}}/api/v1/user/login`,
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
  const [userInfo1, setUserInfo1] = useState({
    name: "",
    email: "",
    password: "",
    appType: "ecommerce",
  });
  const handleChange2 = (e) => {
    const { name, value } = e.target.value;
    setUserInfo1({ ...userInfo1, [name]: value });
  };
  const signUp = async (userInfo1) => {
    // userInfo1.appType = "ecommerce";

    try {
      const header = headerWithProjectIdOnly();
      const res = await axios.post(
        `${apiURL}}/api/v1/user/signup`,
        header,
        userInfo1
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
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    signUp(userInfo1);
  };
  return (
    <header>
      <div className="navbar">
        <div className="firstSlide">
          <span style={{ color: "000", fontWeight: "700" }}>
            Free Shipping on All Orders |
          </span>
          &nbsp;Get Extra ₹100 OFF on Spent of ₹999 Use Code:
          <span style={{ color: "000", fontWeight: "700" }}> BEYOUNG100</span>
        </div>
        <div className="secondSlide">
          <div className="secondSlide-Top">
            <div className="leftSide">
              <a href="">
                <LocationLogo />
                Track Order
              </a>
            </div>
            <div className="rightSlide">
              <a id="loginBtn" onClick={openModal} className="activeBtnLogin">
                Log In
              </a>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
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
                    Login <span className="welcome-header-small">or</span>{" "}
                    Signup
                    <span class="span-offer-text">
                      Get Exciting Offers &amp; Track Order
                    </span>
                  </div>
                  <form className="form-Submisson" onSubmit={handleSubmit}>
                    <div className="form-in">
                      <input
                        type="email"
                        placeholder="Email"
                        name={email}
                        value={email}
                        onChange={handleChange}
                      />

                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="off"
                      />

                      <button>Log in</button>
                      <p className="heading-bottom" onClick={closeModal}>
                        Continue as Guest
                      </p>
                    </div>
                  </form>
                </div>
              </Modal>
              <a id="registerBtn" onClick={openModal}>
                Signup
              </a>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <div className="login-container">
                  <div className="image-close-bar">
                    <img
                      className="login-image"
                      src="./images/login-image-final.jpg"
                      alt=""
                    />
                    <button  className="btn-close" onClick={closeModal}>
                      X
                    </button>
                  </div>

                  <div className="welcome-header">
                    Login <span className="welcome-header-small">or</span>{" "}
                    Signup
                    <span class="span-offer-text">
                      Get Exciting Offers &amp; Track Order
                    </span>
                  </div>
                  <form
                    className="form-Submisson"
                    onSubmit={handleSubmitSignUp}
                  >
                    <div className="form-in">
                      <input
                        type="name"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange2}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        name={email}
                        value={email}
                        onChange={handleChange2}
                      />

                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange2}
                        placeholder="Password"
                        autoComplete="off"
                      />

                      <button style={{cursor:"pointer"}}>Log in</button>
                      <p className="heading-bottom" onClick={closeModal}>
                        Continue as Guest
                      </p>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="header_container">
        <div className="fixedHeader">
          <div className="container">
            <div className="left">
              <figure>
                <a href="/"></a>
                <BeyoungLogo />
              </figure>
              <div>
                <ul className="menuBar">
                  <li className="menu-top">
                    <NavLink className="menu-title" to="/products">
                      Men
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title">Woman</NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title">COMBOS</NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title">JOGGERS</NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title">SHOP THE LOOK</NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title">SHOP BY COLLECTION</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right">
              <a className="searchBar" href="">
                <SearchLogo />
              </a>
              <a href="" className="wishlist-icon">
                <WishListLogo />
              </a>
              <a className="cart-icon" href="">
                <CartLogo />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default navbar;
