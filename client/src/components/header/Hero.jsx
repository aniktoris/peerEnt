import React from "react";
import "./Hero.css"; // Importing the CSS file
import LandingImg from "../../assets/landing.png";

function Hero() {
  return (
    <>
      <div className="landing-container">
        <div className="landing-text">
          <h1 className="landing-title">
            Unlock the Power of <span className="text-pink">Sharing</span>
          </h1>
          <h1 className="landing-subtitle">
            Connect. Share. Thrive: Here is your Hub for Borrowing and Lending
          </h1>
        </div>
        <img src={LandingImg} alt="Landing" className="landing-image" />
      </div>
    </>
  );
}

export default Hero;
