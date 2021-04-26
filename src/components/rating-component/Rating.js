import React, { Component } from "react";
import Star from "./Star";
import "./style.css";

class Rating extends Component {
  static defaultProps = { max: 5 };

  constructor(props) {
    super(props);
    this.state = {
      dynamicValue: 0,
      value: 0,
    };
    this._colors = {
      1: "#f44336",
      2: "#FF5722",
      3: "#FF9800",
      4: "#FFC107",
      5: "#FFEB3B",
    };
    this._meanings = {
      1: "Terrible ",
      2: "Mediocre",
      3: "Average",
      4: "Solid",
      5: "Fantastic",
    };
  }

  handleClick = (newValue) => {
    this.setState({ value: newValue, dynamicValue: newValue });
  };

  handleMouseEnter = (newValue) => {
    this.setState({ dynamicValue: newValue });
  };

  handleMouseLeave = () => {
    this.setState({ dynamicValue: this.state.value });
  };

  render() {
    const { dynamicValue, value } = this.state;
    const { max } = this.props;
    const starSpans = [];
    let count = 0;
    for (let v = 1; v <= max; v++) {
      if (v <= dynamicValue) {
        count++;
      }
    }

    for (let value = 1; value <= max; value++) {
      starSpans.push(
        <Star
          key={value}
          color={this._colors[count]}
          isFilled={value <= dynamicValue}
          value={value}
          handleHover={this.handleMouseEnter}
          handleHoverLeave={this.handleMouseLeave}
          handleClick={this.handleClick}
        />
      );
    }

    return (
      <div className="rating-container">
        <p className="style-main-heading">Rating Component</p>
        <p className="style-rating-text">{this._meanings[value]}</p>
        <div>{starSpans}</div>
      </div>
    );
  }
}

export default Rating;
