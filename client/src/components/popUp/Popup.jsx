import React from "react";
import "./Popup.css";
import PropTypes from "prop-types";
const Popup = ({ message, buttonText, onClose }) => {
  return (
    <div className="popup-background">
      <div className="popup-box">
        <div className="popup-content">
          <p>{message}</p>
          <button className="popup-button" onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
Popup.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Popup;
