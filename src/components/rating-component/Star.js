import React from "react";
import "./style.css";

function Star({
  value,
  color,
  handleHover,
  handleHoverLeave,
  handleClick,
  isFilled,
}) {
  return (
    <span
      className="star"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave(value)}
      onClick={() => handleClick(value)}
    >
      {isFilled ? "\u2605" : "\u2606"}
    </span>
  );
}

export default Star;
