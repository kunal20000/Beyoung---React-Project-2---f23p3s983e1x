import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import FilterProducts from "./FilterProducts";
import "./product.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductsListComponent = ({ products, pageNo }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const [collapsActive, setCollapsActive] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(products);

  let heading = "shop all";

  for (const value of params.values()) {
    if (value) {
      heading = value;
    }
  }

  const uniqueValues = (arr, key) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    return [...new Set(arr.map((item) => item[key].toLowerCase()))];
  };

  const getInitialFilter = (products) => {
    const subCategories = uniqueValues(products, "subCategory");
    const brands = uniqueValues(products, "brand");
    const colors = uniqueValues(products, "color");
    return {
      subCategory: subCategories,
      brand: brands,
      color: colors,
    };
  };

  const initialFilter = getInitialFilter(products);
  const [filterCriteria, setFilterCriteria] = useState(initialFilter);

  const [productsFilter, setProductsFilter] = useState({
    subCategory: [],
    brand: [],
    color: [],
  });

  const applyFilter = () => {
    const { subCategory, brand, color } = productsFilter;
    const filteredResult = products.filter((product) => {
      const subCategoryFilter =
        subCategory.length === 0 ||
        subCategory.includes(product.subCategory.toLowerCase());
      const brandFilter =
        brand.length === 0 || brand.includes(product.brand.toLowerCase());
      const colorFilter =
        color.length === 0 || color.includes(product.color.toLowerCase());
      return subCategoryFilter && brandFilter && colorFilter;
    });

    setFilteredProducts(filteredResult);
  };

  const clearFilter = () => {
    setProductsFilter({
      subCategory: [],
      brand: [],
      color: [],
    });
    setFilteredProducts(products);
  };

  const itemsToDisplay = filteredProducts.slice(0, pageNo * 20);

  return (
    <div className="products-list-compo-container">
      <section className="product-list-section">
        
        <div className="products-container">
          <div className="product-filters">
            <section
              className="filters-heading" 
              onClick={() => setCollapsActive(!collapsActive)}
            >
              <h5 style={{textAlign:"center", margin:"10px auto"}}>Filters</h5>
              {isSmallScreen && <ExpandMoreIcon />}
            </section>

            <div
              className={`filters-container ${
                collapsActive ? "collaps-active" : ""
              }`}
            >
              <FilterProducts
                values={filterCriteria.brand}
                type={"brand"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterProducts
                values={filterCriteria.subCategory}
                type={"subCategory"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <FilterProducts
                values={filterCriteria.color}
                type={"color"}
                filter={productsFilter}
                setFilter={setProductsFilter}
              />
              <div className="filter-btn">
                <button id="filter-btn" onClick={applyFilter}>
                  apply
                </button>
                <button id="filter-btn" onClick={clearFilter}>
                  clear
                </button>
              </div>
            </div>
          </div>

          {<ProductsList products={products} />}
        </div>
      </section>
    </div>
  );
};

export default ProductsListComponent;
