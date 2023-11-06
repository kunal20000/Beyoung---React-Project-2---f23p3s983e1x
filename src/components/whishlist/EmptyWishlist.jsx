import React from "react";
import "./wishlist.css";
import MailIcon from "@mui/icons-material/Mail";
const EmptyWishlist = () => {
  return (
    <div className="whishlist-container">
      <div className="login--container-main">
        <h5>Login/Sign Up to explore great designs</h5>
        <div className="main-container-for-both">
          <div className="left-side-login">
            <h5>
              Login <span>or</span> SignUp
            </h5>
            <p>Get Exciting Offers & Track Order</p>
            <input type="number" />
            <button>Send OTP</button>
            <br />
            <span className="for-span-required">* Required Fields</span>
          </div>
          <div className="right-side-login">
            <b style={{ marginBottom: "35px" }}>Beyoung Customer Care</b>
            <br />
            <a href="#">
              <img width="5%" src="./images/email-icon.svg" alt="" />
              support@beyoung.in
            </a>
            <br />
            <label>
              You can reach us at support@beyoung.in with all queries. We do not
              have a Beyoung customer care number.
            </label>
            <p>
              If you receive an e-mail, a call from a person/association
              claiming to be from Beyoung seeking sensitive confidential
              information like debit/credit card PIN, net-banking or mobile
              banking password, we request you to never provide such
              confidential and personal data. We at Beyoung never ask for such
              confidential and personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;
