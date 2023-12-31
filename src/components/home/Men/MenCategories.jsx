import React from "react";
import "./men_cate.css";
import { Link } from "react-router-dom";
const MenCategories = () => {
  return (
    <div className="men-container">
      <div className="men-clothes">
        <p className="heading-men">categories for men</p>
        <div className="for-shirts-pants">
          <Link to={`/menproducts`}>
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/Shirts.jpg" alt="" />
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/Printed-tshirt.jpg" alt="" />
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/Plain-t-shirt.jpg" alt="" />
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/Polos.jpg" alt="" />
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/Full-sleeve-tshirt.jpg" alt="" />
          <img src="https://www.beyoung.in/api/catalog/home-page-07-02-23/men/desktop/activewear.jpg" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenCategories;
