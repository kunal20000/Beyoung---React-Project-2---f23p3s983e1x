import React from "react";
import "./navbar.css";
import { ReactComponent as LocationLogo } from "../asset/location.svg";
import { ReactComponent as BeyoungLogo } from "../asset/beyoung.svg";
import { ReactComponent as SearchLogo } from "../asset/searchbar.svg";

const navbar = () => {
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
              <a id="loginBtn" className="activeBtnLogin" href="">
                Log In
              </a>
              <a id="registerBtn" href="">
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="header_container">
        <div className="container">
          <div className="left">
            <figure>
              <a href="/"></a>
              <BeyoungLogo />
            </figure>
            <div>
              <ul className="menuBar">
                <li className="menu-top">
                  <a className="menu-title" href="">
                    Men
                  </a>
                </li>
                <li className="menu-top">
                  <a className="menu-title" href="">
                    Woman
                  </a>
                </li>
                <li className="menu-top">
                  <a className="menu-title" href="">
                    COMBOS
                  </a>
                </li>
                <li className="menu-top">
                  <a className="menu-title" href="">
                    JOGGERS
                  </a>
                </li>
                <li className="menu-top">
                  <a className="menu-title" href="">
                    SHOP THE LOOK
                  </a>
                </li>
                <li className="menu-top">
                  <a className="menu-title" href="">
                    SHOP BY COLLECTION
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="right">
            <a className="searchBar" href="">
            <SearchLogo/>
            </a>
          </div>
          <div className=""></div>
        </div>
      </div>
    </header>
  );
};

export default navbar;
