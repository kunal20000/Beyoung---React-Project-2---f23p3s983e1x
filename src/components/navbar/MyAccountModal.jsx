import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./myaccountmodal.css";
import { useNavigate } from "react-router-dom";

const MyAccountModal = ({ isOpenHomeModal, closeModal }) => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("username");
  const modelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        closeModal(true);
      }
    };
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      {isOpenHomeModal && (
        <section className="auth-modal" ref={modelRef}>
          <div className="auth-modal-subdiv">
            <h5>
              Hello{" "}
              {userName.split(" ")[0].charAt().toUpperCase() +
                userName.split(" ")[0].slice(1)}
            </h5>
            <button onClick={closeModal}>X</button>
          </div>
          <div className="link-container">
            <Link className="link-direction" to={`myaccount/order`}>
              Order
            </Link>

            <Link className="link-direction" to={`myaccount/address`}>
              Address
            </Link>

            <Link className="link-direction" to={`/myaccount/profile`}>
              Profile
            </Link>

            <Link className="link-direction" to={`myaccount/wishlist`}>
              Wishlist
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default MyAccountModal;
