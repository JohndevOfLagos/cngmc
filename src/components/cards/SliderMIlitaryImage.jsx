import React, { useState } from "react";

import { Icon } from "@iconify/react";

import "./Slider.scss";



export const SliderMIlitaryImage = ({ images }) => {

   const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };
 
   return (
     <div className="carousel">
      <div className="imageContainer">
        <img src={images[currentImage]} alt={`${currentImage}`} className="active"/>
      </div>
      <div className="controls">
        <button className="prevButton" onClick={prevImage}>
        <Icon icon="carbon:previous-outline" />
        </button>
        <button className="nextButton" onClick={nextImage}>
        <Icon icon="carbon:next-outline" />
        </button>
      </div>
    </div>
   );
 };