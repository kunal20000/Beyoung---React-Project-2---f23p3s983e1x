import React, { useEffect, useState } from "react";
import "./home.css";
import Slider from 'react-slick';
const CashbackImageSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    "./images/cashbackimage.png",
    "./images/discountImage1.png",
    "./images/mysetrycashback.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="cashback-swipper">
      <img
        className="moving-image"
        src={images[imageIndex]}
        alt={`Image ${imageIndex}`}
      />
    </div>
  );
};

export default CashbackImageSlider;
