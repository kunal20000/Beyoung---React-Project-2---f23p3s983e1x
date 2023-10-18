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

import Login from "./Login";

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
  const navigate = useNavigate(null);

  const [showModal, setShowModal] = useState(false);

  const openLoginModal = () => {
    setShowModal(true);
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
              <Link
                id="loginBtn"
                onClick={openLoginModal}
                className="activeBtnLogin"
              >
                Log In
              </Link>

              <Link id="registerBtn">Signup</Link>
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
                    <NavLink className="menu-title" to={"/products?gender=men"}>
                      Men
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink
                      className="menu-title"
                      to={"/products?gender=woman"}
                    >
                      Woman
                    </NavLink>
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
              <a className="searchBar" href="#">
                <SearchLogo />
              </a>
              <NavLink to="/wishlist" className="wishlist-icon">
                <WishListLogo />
              </NavLink>
              <NavLink className="cart-icon" to="/cart">
                <CartLogo />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Login isOpen={showModal} closeModal={setShowModal} />
    </header>
  );
};

export default navbar;
