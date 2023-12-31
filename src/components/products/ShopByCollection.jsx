import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";
import { useLoader } from "../context/LoaderContext";
import "./product.css";

const ShopByCollection = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const { updateLoaderStatus} = useLoader();
  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true)
      const res = await getProductsBySearch({ sellerTag: "Trending" });

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      updateLoaderStatus(false)
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
    fetchProduct();
  }, [filter, page]);

  return (
    <div>
      <div className="men-clothing-main">
        <h5>SHOP By Collection</h5>
        <div>
          <p >
            <b>Trending</b>
            &nbsp; With the latest Active Trending shirts and pants for Men and woman, you can bring
            revolution in your fitness. Designed from the superior cool rush
            fabric this is an Active T-Shirts to give you the perfect motivation
            to work out harder. Explore and shop the best Men’s Active T Shirts
            online at Beyoung at the best price.
          </p>
        </div>
      </div>
     
        <ProductsList products={products} />
      
    </div>
  );
};

export default ShopByCollection;
