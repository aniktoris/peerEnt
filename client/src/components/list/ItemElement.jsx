import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemsList.css"; // Import the CSS file
import Renter from "./Renter";

const ItemElement = ({ item, userLocale }) => {
  // Function to shorten the description to the first 5 words
  const shortenDescription = (text, words) => {
    const textWords = text.split(" ");
    const shortenedText = textWords.slice(0, words).join(" ");
    return shortenedText;
  };

  return (
    <li className="product-item">
      <Renter userId={item.renter_id} />
      <img
        src={item.imageURL}
        alt={item.title}
        className="product-item__image"
      />
      <h2 className="product-item__name">
        {item.title} <span> - {item.category} </span>
      </h2>
      <div className="item-description">
        {" "}
        {shortenDescription(item.description, 7)}...
      </div>
      <div className="product-item__view">
        <span className="product-item__price">
          {item.price === null || item.price === 0
            ? "Free to rent"
            : new Intl.NumberFormat(userLocale, {
                style: "currency",
                currency: "EUR",
              }).format(item.price) + "/per day"}
        </span>
        {/* Link to the DetailedPage with the itemId */}
        <Link to={`/item/${item._id}`} className="product-item__view-button">
          View Details
        </Link>{" "}
      </div>
    </li>
  );
};
ItemElement.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number,
    renter_id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  userLocale: PropTypes.string.isRequired,
};

export default ItemElement;
