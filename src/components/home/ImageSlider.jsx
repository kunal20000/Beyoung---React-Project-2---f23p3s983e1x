import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
const ImageSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = ["./images/banner-image1.jpg", "./images/banner-image2.jpg"];
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the image index, and loop back to the first image when we reach the end
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  });

  return (
    <div className="swipper">
      <Link to={`/shopthelook`}><img src={images[imageIndex]} alt={`Image ${imageIndex}`} /></Link>
      <div className="swipper-bullets">
        <span className="swipper-bullet-1"></span>
        <span className="swipper-bullet-2"></span>
      </div>
    </div>
  );
};

export default ImageSlider;
