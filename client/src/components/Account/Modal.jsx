import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isVisible, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
