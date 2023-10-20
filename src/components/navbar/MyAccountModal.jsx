import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myaccountmodal.css";
import { useNavigate } from "react-router-dom";

const MyAccountModal = ({ isOpenHomeModal, closeModal }) => {
  const userName = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  return (
    <>
      {isOpenHomeModal && (
        <section className="auth-modal">
          <div className="auth-modal-subdiv">
            <h5>Hello {userName}</h5>
            <button onClick={closeModal}>X</button>
          </div>
          <hr />

          <Link
            className="signin-btn"
            onClick={() => {
              navigate("/Profile");
            }}
          >
            Profile
          </Link>
        </section>
      )}
    </>
  );
};

export default MyAccountModal;
