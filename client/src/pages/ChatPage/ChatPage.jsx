// ChatPage.jsx
import React from "react";
// import Chat from './components/Chat';
import Chato from "../../components/chat/Chato";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

const ChatPage = () => {
  return (
    <div>
      <Header />
      <Chato />
      <Footer />
    </div>
  );
};

export default ChatPage;
