import React, { useEffect, useState } from "react";
import "./home.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BigSavingZone = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "./images/zone1.jpg",
    "./images/zone2.jpg",
    "./images/zone3.jpg",
    "./images/zone4.jpg",
    "./images/zone5.jpg",
    "./images/zone6.jpg",
    "./images/zone7.jpg",
  ];
  const imagesToShow = 3;
  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  return (
    <div className="big-saving-zone">
      <p className="headaing-zone">big saving zone</p>
      <div className="saving-zone-2">
        <div onClick={prevImage}>
          <ArrowBackIosIcon/>
        </div>
       
        <div className="image-slider">
          {images
            .slice(imageIndex, imageIndex + imagesToShow)
            .map((image, i) => (
              <img className="big-save-image" width="400px" style={{padding:"10px 10px"}} key={i} src={image} alt={`Image ${i}`} />
            ))}
        </div>
        
       <div onClick={nextImage}>
        <ArrowForwardIosIcon/>
       </div>
      </div>
    </div>
  );
};

export default BigSavingZone;
