import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import { useSearchParams } from "react-router-dom";
import { getProductsBySearch } from "../utils/getProductApi";

const ShopTheLook = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await getProductsBySearch(page, { sellerTag: "best seller" });

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
        <h5 className="heading-men-clothing">SHOP THE LOOK</h5>
        <div>
          <p className="for-p">
            <b>Shop the Look</b>
            &nbsp; From casual to formal, we've added a wide selection of
            outfits to make you look your best and feel confident. Get a perfect
            look for dinner dates to lounging around in no time at the most
            affordable price on Beyoung. Each clothing set is carefully curated
            by our in-house designers to give you a stylish look and comfortable
            fit. Scroll down to find the best look for you.
          </p>
        </div>
      </div>
      <ProductsList products={products} />
    </div>
  );
};

export default ShopTheLook;
