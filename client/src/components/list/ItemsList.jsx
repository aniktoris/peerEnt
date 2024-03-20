import React, { useContext, useEffect, useState } from "react";
import ItemElement from "./ItemElement";
import "./ItemsList.css";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import { SearchContext } from "../header/SearchContext";
import { useLocation } from "react-router-dom";

const ItemsList = () => {
  const itemsPerPage = 12; // items per page
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true); // tracking data availability
  const { state } = useContext(SearchContext);
  const { title: searchValue } = state;
  const {
    state: { category },
  } = useContext(SearchContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // Extract search parameters from the URL
  const searchParam = params.get("title");
  const categoryParam = params.get("category");

  // Set searchValue and category based on URL parameters or context state
  const initialSearchValue = searchParam || searchValue || "";
  const initialCategory = categoryParam || category || "";

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/item?page=${currentPage}${
      initialSearchValue && !initialCategory
        ? `&title=${initialSearchValue}`
        : ""
    }${
      initialCategory && !initialSearchValue
        ? `&category=${encodeURIComponent(initialCategory)}`
        : ""
    }`,
    (response) => {
      const newItems = response.result;
      setItems(newItems);
      const totalItems = response.totalItems;
      // Check if there are more items
      setHasMoreData(
        newItems.length === itemsPerPage &&
          totalItems > currentPage * itemsPerPage
      );
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [currentPage, initialSearchValue, initialCategory]);

  useEffect(() => {
    // Reset page when category changes
    setCurrentPage(1);
  }, [category, initialSearchValue]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.toString()}</div>;
  }
  // Get user's locale
  const userLocale = navigator.language;

  return (
    <div>
      <ul className="product-list">
        {items.map((item) => (
          <ItemElement key={item._id} item={item} userLocale={userLocale} />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={handleNextPage}
          disabled={!hasMoreData || items.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

ItemsList.propTypes = {
  selectedCategory: PropTypes.string,
};

export default ItemsList;
