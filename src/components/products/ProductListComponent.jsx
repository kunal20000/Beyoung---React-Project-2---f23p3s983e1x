import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";
import ProductComponent from "./ProductComponent";
const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await getProductsBySearch(page, filter);
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [filter, page]);

  return <div>
    <ProductComponent products={products}/>
  </div>;
};

export default ProductListComponent;
