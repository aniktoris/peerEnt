import React, { useEffect, useState, useContext } from "react";
import "./Categories.css";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import { SearchContext } from "../header/SearchContext";
import { useNavigate } from "react-router-dom";
function Categories() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/category",
    (response) => {
      setCategories(response.result);
    }
  );

  const {
    state: { category },
    dispatch,
  } = useContext(SearchContext);

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Toggle selected category
    const newSelectedCategory = category === categoryName ? null : categoryName;
    dispatch({ type: "SEARCH_CATEGORY", payload: newSelectedCategory });
    navigate(
      `/search?${
        newSelectedCategory
          ? `category=${encodeURIComponent(newSelectedCategory)}`
          : ""
      }`
    );
  };

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <ul className="list-categories">
        {categories &&
          categories.map((categoryItem) => {
            const isSelected = categoryItem.name === category;
            return (
              <li
                key={categoryItem._id}
                onClick={() => handleCategoryClick(categoryItem.name)}
                className={isSelected ? "selected-category" : ""}
              >
                <img
                  className="icon"
                  src={categoryItem.icon}
                  alt={categoryItem.name}
                />
                <span>{categoryItem.name}</span>
              </li>
            );
          })}
      </ul>
    );
  }

  return <div className="categories">{content}</div>;
}

Categories.propTypes = {
  handleCategoryClick: PropTypes.func,
  selectedCategory: PropTypes.string,
};

export default Categories;
