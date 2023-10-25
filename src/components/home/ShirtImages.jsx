import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const ShirtImages = () => {
  return (
    <div className="shirt-image">
      <Link to={'/goggers'}>
        
        <a href="#">
          <img src="./images/Travel-Campaign.jpg" alt="travelCampagin" />
        </a>
      </Link>
      <Link to={'/goggers'}>
        <a href="#">
          <img src="./images/shop-the-look-home-page-section-f.jpg" alt="" />
        </a>
      </Link>
    </div>
  );
};

export default ShirtImages;
