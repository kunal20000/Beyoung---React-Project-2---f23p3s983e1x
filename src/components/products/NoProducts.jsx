import React from "react";

const NoProducts = ({ searchValue }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h5 style={{ fontWeight: "600", fontSize: "22px" }}>
        For your search{" "}
        <span style={{ color: "rgb(81, 204, 204)" }}>"{searchValue}"</span>
      </h5>
      <img
        style={{ width: "180px" }}
        src="./images/cactus.png"
        alt="no matching your search"
      />
      <h5 style={{ fontWeight: "400", fontSize: "22px" }}>
        WE COULDN'T FIND ANY MATCHES
        
      </h5>
    </div>
  );
};

export default NoProducts;
