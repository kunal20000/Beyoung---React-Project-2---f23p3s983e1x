import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { Badge, ClickAwayListener, Popper, TextField } from "@mui/material";
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
import { getProductsBySearch } from "../utils/getProductApi";
import "react-toastify/dist/ReactToastify.css";
import {
  useCartNumbers,
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
  useWishlistNumbers,
} from "../context/CartNumberContext";
import {
  useAuth,
  useUpdateLoginStatus,
  userUpdateLoginModalStatus,
} from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

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

const Navbar = () => {
  const loginStatus = useAuth();
  const numberOfCartItems = useCartNumbers();
  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumber = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers();
  const numberOfWishlistItems = useWishlistNumbers();
  const setShowLoginModal = userUpdateLoginModalStatus();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("useremail");
    updateLoginStatus(false);
    updateCartNumber(0);
    updateWishlistNumbers(0);
    toast.success("Logged Out Successfully");
  };

  // for cart
  const handleGoToCart = () => {
    if (loginStatus) {
      navigate("/cart");
      console.log("login Status", loginStatus);
    } else {
      setShowModal(true);
    }
  };
  
  // for wishlist
  const handleGoToWishlist = ()=>{
    if(!loginStatus){
      setShowModal(true)
    }
  }

  // for search bar
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchInputRef = useRef();

  const handleSearchBtnClick = (event) => {
    if (anchorEl) {
      setIsSearchbarOpen(false);
      setAnchorEl(null);
    } else {
      setIsSearchbarOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };
  const handleSearch = async () => {
    const { value } = searchInputRef.current;
    setIsSearchbarOpen(false);
    navigate(`/products?name=${value}`);
  };
  
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

  const closeMyAccountModal = (e) => {
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
              <a href={`myaccount/order`}>
                <LocationLogo />
                Track Order
              </a>
            </div>
            <div className="rightSlide">
              {!loginStatus ? (
                <>
                  <Link
                    id="loginBtn"
                    onClick={openLoginModal}
                    className="activeBtnLogin"
                  >
                    Log In
                  </Link>
                  <Link id="registerBtn" onClick={openSignUp}>
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    id="loginBtn"
                    onClick={openMyAccountModal}
                    className="activeBtnLogin"
                  >
                    My Account
                  </Link>
                  <Link id="registerBtn" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header_container fixed-header">
        {/* <div className="fixedHeader"> */}
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
                      to={`menproducts?gender=men`}
                    >
                      Men
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink
                      className="menu-title"
                      to={`/womanproducts?gender=woman`}
                    >
                      Woman
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title" to={`/combos`}>
                      COMBOS
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title" to={`/goggers`}>
                      JOGGERS
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink className="menu-title" to={`shopthelook?`}>
                      SHOP THE LOOK
                    </NavLink>
                  </li>
                  <li className="menu-top">
                    <NavLink
                      className="menu-title"
                      to={`/shopbycollection?shopall`}
                    >
                      SHOP BY COLLECTION
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right">
              <Link className="searchBar" onClick={handleSearchBtnClick}>
                <SearchLogo />
              </Link>
              <Link to={`myaccount/wishlist`} onClick={handleGoToWishlist} className="wishlist-icon">
                <Badge badgeContent={numberOfWishlistItems} color="primary">
                  <div style={{ width: "24px", height: "24px" }}>
                    <WishListLogo />
                  </div>
                </Badge>
              </Link>
              <button className="cart-icon" onClick={handleGoToCart}>
                <Badge badgeContent={numberOfCartItems} color="primary">
                  <div style={{ width: "24px", height: "24px" }}>
                    <CartLogo />
                  </div>
                </Badge>
              </button>
            </div>
          </div>
        {/* </div> */}
        {isSearchbarOpen && (
          <ClickAwayListener onClickAway={handleSearchBtnClick}>
            <Popper
              open={isSearchbarOpen}
              anchorEl={anchorEl}
              placement="bottom-start"
              style={{ width: "350px" }}
            >
              <div className="search-bar">
                <input
                  id="searchBarInput"
                  type="text"
                  placeholder="Search entire store here..."
                  ref={searchInputRef}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </Popper>
          </ClickAwayListener>
        )}
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

export default Navbar;
