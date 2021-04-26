import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import "./style.css";

const ImageSlider = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? length - 1 : current - 1));
  };

  const nextSlide = () => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  };

  return (
    <React.Fragment>
      {slides.length === 0 ? (
        <div>
          <h2 className="warning">No Slides Found</h2>
        </div>
      ) : (
        <section className="react-slider">
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
          {slides.map((slide, idx) => {
            return (
              <div
                key={idx}
                className={current === idx ? "slide active" : "slide"}
              >
                {current === idx && (
                  <img src={slide.image} alt="nature" className="image" />
                )}
              </div>
            );
          })}
        </section>
      )}
    </React.Fragment>
  );
};

export default ImageSlider;
