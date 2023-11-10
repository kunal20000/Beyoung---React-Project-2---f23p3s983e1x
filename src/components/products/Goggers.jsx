import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";
import { useLoader } from "../context/LoaderContext";
const Goggers = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});
  const { updateLoaderStatus } = useLoader();
  const fetchProduct = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(page, { sellerTag: "Top Rated" });
      setProducts(res);
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
    fetchProduct();
  }, [filter, page]);

  return (
    <div>
      <div className="men-clothing-main">
        <h5 style={{ marginBottom: "30px" }} className="heading-men-clothing">
          ALL PURPOSE JOGGERS
        </h5>
      </div>
      <ProductsList products={products} />
    </div>
  );
};

export default Goggers;
