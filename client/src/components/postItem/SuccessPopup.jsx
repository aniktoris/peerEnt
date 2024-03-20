import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./SuccessPopup.css";

const SuccessPopup = ({ itemId }) => {
  return (
    <div className="success-popup">
      <p>
        <span role="img" aria-label="check-mark">
          ✅
        </span>{" "}
        Item added successfully!
      </p>
      {itemId && (
        <Link to={`/item/${itemId}`}>
          <button className="btn">View Item</button>
        </Link>
      )}
    </div>
  );
};

SuccessPopup.propTypes = {
  itemId: PropTypes.string,
  onClose: PropTypes.func,
};

export default SuccessPopup;
