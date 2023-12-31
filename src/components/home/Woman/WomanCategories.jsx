import React from "react";
import "./woman_cate.css";
import { Link } from "react-router-dom";

const WomanCategories = () => {
  return (
    <div className="woman-container">
      <div className="woman-clothes">
        <p className="heading-woman">categories for woman</p>
        <div className="for-shirts-pants-woman">
          <Link to={`/womanproducts`}>
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/women-Oversize-T-Shirts.jpg"
              alt=""
            />
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/Kurti.jpg"
              alt=""
            />
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/Printed-T-Shirts.jpg"
              alt=""
            />
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/Plain-T-Shirts.jpg"
              alt=""
            />
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/Full-Sleeves.jpg"
              alt=""
            />
            <img
              src="https://www.beyoung.in/api/catalog/home-page-07-02-23/women/new/Boxers.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WomanCategories;
