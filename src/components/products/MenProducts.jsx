import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList"; // Import the common component
import axios from "axios";
import { apiURL } from "../utils/getProductApi";
import { getHeaderWithProjectIdAndBody } from "../utils/getHeader";
import "./product.css";
const MenProducts = () => {
  const [IsLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${apiURL}api/v1/ecommerce/clothes/products`,
        getHeaderWithProjectIdAndBody()
      );
      setProducts([...products, ...res.data.data]);
      console.log(res);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div className="men-clothing-main">
        <h5 className="heading-men-clothing">Men clothing</h5>
        <div>
          <p className="for-p">
            <b>Men clothing</b>
            &nbsp; all about being stylish and comfortable all day long. Beyoung
            understands the same and provides you with a handsome range of
            Clothing For Men out there. Scroll below to get a look at it.
          </p>
        </div>
      </div>

      <ProductsList products={products} />
    </div>
  );
};

export default MenProducts;
