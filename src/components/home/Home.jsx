import React from "react";
import "./home.css";
import ImageSlider from "./ImageSlider";
import CashbackImageSlider from "./CashbackImageSlider";
import ShirtImages from "./ShirtImages";
import BigSavingZone from "./BigSavingZone";
import NewArrival from "./NewArrival";
import FreeShiping from "./FreeShiping";
import CashOnDelivery from "./CashOnDelivery";
import News from "./News";
import MenCategories from "./Men/MenCategories";
import WomanCategories from "./Woman/WomanCategories";
import HandShirtsBetter from "./HandShirtsBetter";
const Home = () => {
  return (
    <div className="main-home">
      <ImageSlider />
      <CashbackImageSlider />
      <ShirtImages />
      <BigSavingZone/>
      <NewArrival/>
      <FreeShiping/>
      <MenCategories/>
      <WomanCategories/>
      <HandShirtsBetter/>
      <CashOnDelivery/>
      <News/>
    </div>
  );
};

export default Home;
