import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch.js";

const CategorySelect = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const { performFetch } = useFetch("/category", (response) => {
    setCategories(response.result);
  });

  useEffect(() => {
    // Fetch categories when component mounts
    performFetch();
  }, []);

  return (
    <select
      onChange={(e) =>
        onSelectCategory(
          e.target.value,
          e.target.options[e.target.selectedIndex].text
        )
      }
      required
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option className="option" key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

// Prop validation using PropTypes
CategorySelect.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategorySelect;
