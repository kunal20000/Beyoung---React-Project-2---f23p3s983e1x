import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";
import ProductComponent from "./ProductComponent";
import Products from "./ProductsList";
import axios from "axios";
import {
  getHeaderWithProjectIdAndBody,
  headerWithProjectIdOnly,
} from "../utils/getHeader";
import ProductsList from "./ProductsList";

const WomanProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await getProductsBySearch(page, { gender: "Women" });

      setProducts(res);
    } catch (error) {
      console.log(error);
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
        <h5 className="heading-men-clothing">Women clothing</h5>
        <div>
          <p className="for-p">
            <b>Women clothing</b>
            &nbsp; Get your hands on stylish and comfortable clothing for women
            - Buy a range of ladies' clothing online at affordable prices.
            Beyoung offers the latest collection of Kurtis, shirts, tops,
            t-shirts, pants, boxers, and jeggings with existing offers and
            discounts. Find women's clothing for formal to weekend outings in
            all styles. Free Shipping | COD | S - 4XL Sizes | 15 Days Return
          </p>
        </div>
      </div>
      <ProductsList products={products} />
    </div>
  );
};

export default WomanProducts;
