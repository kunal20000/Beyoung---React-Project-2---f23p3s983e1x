import React,{useState} from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import './newArrival.css';

const NewArrival = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "./images/new1.jpg",
    "./images/new2.jpg",
    "./images/new3.jpg",
    "./images/new4.jpg",
    "./images/new5.jpg",
    "./images/new6.jpg",
    "./images/new7.jpg",
    "./images/new8.jpg"
  ];
  const imagesToShow = 4;
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
      <p className="saving-zone1">New Arrival</p>
      <div className="saving-zone-2">
        <div onClick={prevImage}>
          <ArrowBackIosIcon />
        </div>

        <div className="image-slider">
          {images
            .slice(imageIndex, imageIndex + imagesToShow)
            .map((image, i) => (
              <img width="400px"
                style={{ padding: "10px 10px" }}
                key={i}
                src={image}
                alt={`Image ${i}`}
              />
            ))}
        </div>

        <div onClick={nextImage}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
