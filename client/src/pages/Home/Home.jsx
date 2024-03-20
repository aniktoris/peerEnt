import React from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/header/Hero";
import TEST_ID from "./Home.testid";
import { Footer } from "../../components/footer/Footer";
import { ParentCategoriesItemsList } from "../../components/ParentCategoriesItemsList";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <Hero />
      <ParentCategoriesItemsList />
      <Footer />
    </div>
  );
};

export default Home;
