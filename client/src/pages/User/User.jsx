import React from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import UserInfo from "../../components/user/UserInfo";

const Home = () => {
  return (
    <div>
      <Header />
      <UserInfo />

      <Footer />
    </div>
  );
};

export default Home;
