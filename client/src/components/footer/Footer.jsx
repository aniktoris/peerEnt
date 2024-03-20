import React from "react";
import "./Footer.css";
import Logo from "../../assets/logo-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export const Footer = () => {
  return (
    <footer>
      <div className="column">
        <img src={Logo} alt="logo-black" />
        <p className="description">Hub for Borrowing & Lending</p>
        <p className="copyright">© Copyright 2024.</p>
      </div>
      <div className="column"></div>
      <div className="column">
        <h3 className="contact">contactUs</h3>
        <a className="email" href="mailto:info@peerent.com">
          <p>info@peerent.com</p>
        </a>
        <a className="phone" href="tel:+3122222333">
          <p>+31 6 22 22 22 33</p>
        </a>
      </div>
      <div className="column">
        <h3 className="contact">ourLocation</h3>
        <p>Amsterdam, 1031KS</p>
        <p>Overhoeksplein 2</p>
      </div>
      <div className="column">
        <h3 className="contact">followUs</h3>
        <FontAwesomeIcon icon={["fab", "facebook"]} />
        <FontAwesomeIcon icon={["fab", "instagram"]} />
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
        <FontAwesomeIcon icon={["fab", "x-twitter"]} />
      </div>
    </footer>
  );
};
