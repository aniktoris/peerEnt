import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import Chato from "./Chato.jsx";
import "./chatStyle.css";

const SideChat = ({ open, onClose }) => {
  const [showSide, setShowSide] = useState(false);
  const sideRef = useRef(null);

  useEffect(() => {
    setShowSide(open);
  }, [open]);

  const closeSidebar = () => {
    setShowSide(false);
    if (onClose) onClose(); // Call the onClose prop function when sidebar is closed
  };

  useOutsideClick(sideRef, closeSidebar);

  return (
    <>
      {showSide && (
        <div ref={sideRef} className="sidebar">
          <Chato />
        </div>
      )}
    </>
  );
};

SideChat.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default SideChat;
