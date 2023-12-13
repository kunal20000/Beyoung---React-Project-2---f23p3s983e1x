import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList"; // Import the common component
import axios from "axios";
import { apiURL, getProductsBySearch } from "../utils/getProductApi";
import { getHeaderWithProjectIdAndBody } from "../utils/getHeader";
import "./product.css";
import { useLoader } from "../context/LoaderContext";
import { useSearchParams } from "react-router-dom";
const MenProducts = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const [products, setProducts] = useState([]);
  const { updateLoaderStatus } = useLoader();
  const fetchProduct = async (filter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch({ gender: "Men" });

      setProducts(res.data);
      console.log(res);
    } catch (error) {
      console.log("error", error);
    } finally {
      updateLoaderStatus(false);
    }
  };


  // this useEffect will filter state based on search parameters in the  url
  useEffect(() => {
    let filter = {};
    searchParams.forEach((value, key) => {
      filter[key] = value.replace(/-/g, " "); // replace all hyphens in value
    });
    setFilter(filter);
  }, [searchParams]);

  useEffect(() => {
    fetchProduct();
  }, [filter, page]);
  
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

      {/* {products.map((products, i) => ( */}
        <ProductsList products={products} />
      {/* ))} */}
    </div>
  );
};

export default MenProducts;
