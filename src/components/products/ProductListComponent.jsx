import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";
import ProductComponent from "./ProductComponent";
import Products from "./Products";
import axios from "axios";
import {
  getHeaderWithProjectIdAndBody,
  headerWithProjectIdOnly,
} from "../utils/getHeader";

const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await getProductsBySearch(page, {"gender":"woman"});

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
    <div className="woman-container">
      <div className="woman-container-subdiv">
        {Array.isArray(products) &&
          products.map((pro, id) => {
            return (
              <div className="woman" key={id}>
                <img src={pro.displayImage} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductListComponent;
