import React, { useEffect, useState } from "react";
import { getWishlistItems } from "../utils/WishlistApi";
import { useLoader } from "../context/LoaderContext";
import WishlistCard from "./WishlistCard";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const { updateLoaderStatus } = useLoader();

  const removeProductFormState = (productId) => {
    console.log(products);
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
    console.log(updatedProducts);
  };

  
  const fetchProducts = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getWishlistItems();
      console.log("res", res);
      if (res.status === "success") {
        setProducts(res.data.items);
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products.length === 0 ? (
        <>
          <img
            style={{ width: "70%", margin: "0 10%" }}
            className="empty-wishlist"
            src="https://beyoung-project.vercel.app/static/media/EMPTY-WISHLIST-PAGE.f387771e0f3a4c41214b.jpg"
            alt="empty-wishlist"
          />
        </>
      ) : (
        <div className="wishlist-container">
          {products.map((product, i) => (
            <WishlistCard
              key={i}
              product={product}
              removeProductFromState={removeProductFormState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
