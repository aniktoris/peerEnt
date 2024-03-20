import React from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { ParentCategoriesItemsList } from "../../components/ParentCategoriesItemsList";
import TEST_ID from "../Home/Home.testid";

const SearchItem = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <ParentCategoriesItemsList />
      <Footer />
    </div>
  );
};

export default SearchItem;
