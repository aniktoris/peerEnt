import React, { useState } from "react";
import "./PostItemForm.css";
import CategorySelect from "./CategorySelect";
import UploadImages from "./UploadImages";
import PropTypes from "prop-types";

const PostItemForm = ({ onSubmit, isLoading, error }) => {
  // State for form fields
  const initialFormData = {
    title: "",
    category: "",
    category_id: "",
    description: "",
    price: "",
    deposit: "",
    imageURL: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showDepositField, setShowDepositField] = useState(false);

  const handleImageUpload = (imageURL) => {
    setFormData({
      ...formData,
      imageURL,
    });
  };

  // get the category id and name
  const handleCategorySelect = (categoryId, categoryName) => {
    setFormData((prevData) => ({
      ...prevData,
      category: categoryName,
      category_id: categoryId,
    }));
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Convert value to number if the input type is "number"
    const parsedValue = type === "number" ? parseFloat(value) : value;

    // Handle different input types
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : parsedValue,
    }));
  };

  const handleCheckboxChange = () => {
    setShowDepositField(!showDepositField); // Toggle the state (true -> false, false -> true)
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageURL) {
      alert("Please upload the image");
      return; // Prevent form submission
    }
    if (formData.price < 0) {
      alert("Price cannot be negative");
      return; // Prevent form submission
    }
    if (formData.deposit < 0) {
      alert("Deposit cannot be negative");
      return; // Prevent form submission
    }
    if (
      (formData.price === 0 || formData.price === null) &&
      (formData.deposit === 0 || formData.deposit === null)
    ) {
      alert("Either price or deposit is required");
      return; // Prevent form submission
    }
    try {
      await onSubmit(formData);
    } catch (error) {
      // Handle errors by updating the success message state with an error message
    }
  };

  const handleClick = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="post-item-form-container">
      <h2>Add Item</h2>
      <div className="form-group">
        <label>
          <span className="upload-text">
            Upload your item image (up to 2MB)*
          </span>
          <UploadImages handleImageUpload={handleImageUpload} />
        </label>
      </div>
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>
            Title*
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Category*
            <CategorySelect onSelectCategory={handleCategorySelect} />
          </label>
        </div>

        <div className="form-group">
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required={!formData.deposit || formData.deposit === 0}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="label-checkbox">
            <input
              type="checkbox"
              name="containsDeposit"
              checked={
                formData.price === 0 ? !showDepositField : showDepositField
              }
              onChange={handleCheckboxChange}
            />
            Contains Deposit
          </label>
        </div>

        {showDepositField || formData.price === 0 ? (
          <div className="form-group">
            <label>
              Deposit Amount:
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                max={formData.price ? formData.price * 0.5 : ""}
                required={!formData.price || formData.price === 0}
              />
            </label>
          </div>
        ) : null}

        <div className="form-group">
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Item"}
          </button>
          <button className="btn" type="reset" onClick={handleClick}>
            Cancel
          </button>
        </div>

        {error && <div>Error: {error}</div>}
      </form>
    </div>
  );
};

PostItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PostItemForm;
