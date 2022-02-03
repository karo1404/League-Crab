import React from "react";
import propTypes from "prop-types";
import Text from "./Text";
import "./Card.css";

function Card({ image, header, text, height, width }) {
  const cardDimensions = { minHeight: `${height}rem`, maxWidth: `${width}rem` };
  const imageDimensions = { height: `${0.6 * height}rem` };

  return (
    <div className="container card-container g-0" style={cardDimensions}>
      <div className="row">
        <img
          src={image}
          alt="card"
          className="image-fluid"
          style={imageDimensions}
        />
      </div>
      <div className="row m-2 mt-3">
        <div className="col-md-auto">
          <h5 className="fw-bold">
            <Text textId={header} />
          </h5>
          <p>
            <Text textId={text} />
          </p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: propTypes.string,
  header: propTypes.string,
  text: propTypes.string,
};

export default Card;
