import React, { useState, useEffect } from "react";
import { getProductsBySearch } from "../utils/getProductApi";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useLoader } from "../context/LoaderContext";
const Combos = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const {updateLoaderStatus} = useLoader()
  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true)
      const res = await getProductsBySearch(page, { subCategory: "Shirt" });

      setProducts(res);
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
        <h5 className="heading-men-clothing">COMBOS (UNISEX)</h5>
        <div>
          <p className="for-p">
            Combo T Shirts - Buy T Shirt Combos Online in India at Low Price.
            Latest Collection of Plain and Printed Combo T shirts For Mens
            Online at Beyoung. ✓ Pack of 3 & 4 Combo T-shirts ✓Big Discounts
            ✓Free Shipping ✓COD.
          </p>
        </div>
      </div>
      <ProductsList products={products} />
    </div>
  );
};

export default Combos;
