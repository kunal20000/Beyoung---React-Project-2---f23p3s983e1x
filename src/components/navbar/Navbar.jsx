import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { Badge } from "@mui/material";
import { ReactComponent as LocationLogo } from "../asset/location.svg";
import { ReactComponent as BeyoungLogo } from "../asset/beyoung.svg";
import { ReactComponent as SearchLogo } from "../asset/searchbar.svg";
import { ReactComponent as WishListLogo } from "../asset/wishlist.svg";
import { ReactComponent as CartLogo } from "../asset/cart.svg";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

import MyAccountModal from "./MyAccountModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const navbar = ({ products }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("authToken");
    toast.success("Logged Out Successfully");
  };
  const isLoggedIn = sessionStorage.getItem("userInfo");

  const navigate = useNavigate(null);

  const [showModal, setShowModal] = useState(false);
  const openLoginModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const closeLoginModal = () => {
    setShowModal(false);
  };

  const [showModalSignUp, SetShowModalSignUp] = useState(false);
  const openSignUp = (e) => {
    e.preventDefault();
    SetShowModalSignUp(true);
  };
  const closeSignUpModal = () => {
    SetShowModalSignUp(false);
  };

  const [modalHome, setModalHome] = useState(false);
  const openMyAccountModal = () => {
    setModalHome(true);
    console.log("true");
  };

  const closeMyAccountModal = () => {
    setModalHome(false);
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
              {!isLoggedIn ? (
                <Link
                  id="loginBtn"
                  onClick={openLoginModal}
                  className="activeBtnLogin"
                >
                  Log In
                </Link>
              ) : (
                <Link
                  id="loginBtn"
                  onClick={openMyAccountModal}
                  className="activeBtnLogin"
                >
                  My Account
                </Link>
              )}

              {!isLoggedIn ? (
                <Link id="registerBtn" onClick={openSignUp}>
                  Signup
                </Link>
              ) : (
                <Link id="registerBtn" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header_container">
        <div className="fixedHeader">
          <div className="container">
            <div className="left">
              <figure>
                <a href="/">
                  <BeyoungLogo />
                </a>
              </figure>
              <div>
                <ul className="menuBar">
                  <li className="menu-top">
                    <NavLink
                      className="menu-title"
                      to={`/productslist?gender=men`}
                    >
                      Men
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink
                      className="menu-title"
                      to={`/productslistcomponent?gender=Woman`}
                    >
                      Woman
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title" to={`/products`}>
                      COMBOS
                    </NavLink>
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
              <Link className="searchBar" href="#">
                <SearchLogo />
              </Link>
              <Link to="/wishlist" className="wishlist-icon">
                <WishListLogo />
              </Link>
              <Link className="cart-icon" to={`/cart`}>
                <Badge>
                  <CartLogo />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Login isOpen={showModal} closeModal={closeLoginModal} />
      <SignUp isOpen={showModalSignUp} closeModal={closeSignUpModal} />
      <MyAccountModal
        isOpenHomeModal={modalHome}
        closeModal={closeMyAccountModal}
      />
    </header>
  );
};

export default navbar;
