import React from "react";
import { Link } from "react-router-dom";
import "./AddItemButton.css";
import AddItemIcon from "../../assets/add-item.svg";

const AddItemButton = () => {
  return (
    <div className="add-item-container">
      <Link to="/post-item" className="add-item-link">
        <div className="add-item-icon-container">
          <img src={AddItemIcon} alt="Add Item" className="add-item-icon" />
        </div>
      </Link>
    </div>
  );
};

export default AddItemButton;
