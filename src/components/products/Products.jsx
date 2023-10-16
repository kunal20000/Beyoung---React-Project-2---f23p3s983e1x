import React, { useEffect, useState } from "react";
import "./product.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/getProductApi";
import axios from "axios";

const Products = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      console.log(res);
      setProduct(res);
    
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  return (
    <div className="product-container">
      <div className="men-clothing">
        <div className="filter-clothing">
          <h5>Filter</h5>
        </div>
        <div className="men-clothing-main">
          <h5 className="heading-men-clothing">Men clothing</h5>
          <div>
            <p className="for-p">
              <b>Men clothing</b>
              &nbsp; all about being stylish and comfortable all day long.
              Beyoung understands the same and provides you with a handsome
              range of Clothing For Men out there. Scroll below to get a look at
              it.
            </p>
          </div>
          <div className="productListContainer">
            <div className="left-side">
              <img
                style={{ width: "100%" }}
                src={product.displayImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
