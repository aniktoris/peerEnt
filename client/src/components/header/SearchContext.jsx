import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  title: null,
  category: null,
};

export const SearchContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TITLE":
      return { ...state, title: action.payload, category: null };
    case "SEARCH_CATEGORY":
      return { ...state, title: null, category: action.payload };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
