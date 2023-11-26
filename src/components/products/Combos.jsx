import React, { useState, useEffect } from "react";
import { getProductsBySearch } from "../utils/getProductApi";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useLoader } from "../context/LoaderContext";
import axios from "axios";
import { apiURL } from "../utils/getProductApi";
import { headerWithProjectIdOnly } from "../utils/getHeader";
import "./product.css";
const Combos = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const { updateLoaderStatus } = useLoader();

  const fetchProduct = async (filter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch({ subCategory: "Shirt" });

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    let filter = {};
    searchParams.forEach((value, key) => {
      filter[key] = value.replace(/-/g, " ");
    });
    setFilter(filter);
  }, [searchParams]);

  useEffect(() => {
    fetchProduct(filter);
  }, [filter, page]);

  return (
    <div>
      <div className="men-clothing-main">
        <h5>COMBOS (UNISEX)</h5>
        <p>
          Combo T Shirts - Buy T Shirt Combos Online in India at Low Price.
          Latest Collection of Plain and Printed Combo T shirts For Mens Online
          at Beyoung. ✓ Pack of 3 & 4 Combo T-shirts ✓Big Discounts ✓Free
          Shipping ✓COD.
        </p>
      </div>

      {/* {products.map((products, i) => ( */}
        <ProductsList products={products}  />
      {/* ))} */}
    </div>
  );
};

export default Combos;
