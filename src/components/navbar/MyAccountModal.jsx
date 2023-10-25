import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./myaccountmodal.css";
import { useNavigate } from "react-router-dom";

const MyAccountModal = ({ isOpenHomeModal, closeModal }) => {
  const navigate = useNavigate();
  const userName = JSON.parse(sessionStorage.getItem("userInfo"));
  const modelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current.contains != event.target) {
        closeModal();
      }
    };
    if (isOpenHomeModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[isOpenHomeModal,closeModal]);
  return (
    <>
      {isOpenHomeModal && (
        <section className="auth-modal" ref={modelRef}>
          <div className="auth-modal-subdiv">
            <h5>Hello {userName}</h5>
          </div>
          <div className="link-container">
            <Link
              className="link-direction"
              onClick={() => {
                navigate("/order");
              }}
            >
              Order
            </Link>

            <Link
              className="link-direction"
              onClick={() => {
                navigate("/address");
              }}
            >
              Address
            </Link>

            <Link
              className="link-direction"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </Link>

            <Link
              className="link-direction"
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              Wishlist
            </Link>

            <Link
              className="link-direction"
              onClick={() => {
                navigate("/coupons");
              }}
            >
              Coupons
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default MyAccountModal;
