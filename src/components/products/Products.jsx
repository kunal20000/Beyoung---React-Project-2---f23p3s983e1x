import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getProductsBySearch } from "../utils/getProductApi";
import { useNavigate } from "react-router-dom";
import NoProducts from "./NoProducts";
import ProductsListComponent from "./ProductsListComponent";
import ProductsList from "./ProductsList";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [previousSearchParms, setPreviousSearchParams] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateLoaderStatus } = useLoader();
  const navigate = useNavigate(null);

  const fetchProducts = async (searchFilter) => {
    try {
      updateLoaderStatus(true);
      const res = await getProductsBySearch(searchFilter);
      console.log(res);
      if (res.status === "success") {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    let filter = {};
    if (searchParams.size === 0) {
      navigate("/");
    }
    searchParams.forEach((value, key) => {
      if (value !== "shop all") {
        filter[key] = decodeURIComponent(value);
      }
    });

    const isSearchChange = previousSearchParms !== searchParams.toString();
    if (isSearchChange) {
      setPageNo(1);
    }

    setPreviousSearchParams(searchParams.toString());
    console.log("Search Params:", searchParams.toString());
    fetchProducts(filter);
  }, [searchParams]);

   const isEmpty = !Object.keys(products).length;
  // console.log("isEmpty", isEmpty);
  
  return (
    <div>
      {isEmpty ? (
        <NoProducts searchValue={searchParams.get("name")} />
      ) : (
        <ProductsListComponent  products={products} pageNo={pageNo} />
      )}
    </div>
  );
};

export default Products;
