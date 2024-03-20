import React, { useState, useContext } from "react";
import { useAuth } from "../Account/AuthContext";
import SignUp from "../Account/SignUp";
import Login from "../Account/Login";
import SearchIcon from "../../assets/search-icon.svg";
import Logo from "../../assets/logo-color.svg";
import AddItemButton from "./AddItemButton";
import Message from "./Message";
import ProfileDropdown from "./ProfileDropdown";
import "./Header.css";
import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, userData, logout } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const { dispatch } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    setIsSignInVisible(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // Dispatch the search action here
    dispatch({ type: "SEARCH_TITLE", payload: searchValue });
    navigate(`/search?title=${searchValue}`);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo-image" />
        </Link>{" "}
      </div>
      <div className="header-content">
        <div className="search-container">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="search-icon"
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Bike, laptop, stroller..."
            className="search-input"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </div>
        {isAuthenticated ? (
          <>
            <AddItemButton />
            <Message />
            <ProfileDropdown
              onLogout={logout}
              profilePicture={userData?.user.userImageURL}
            />
          </>
        ) : (
          <>
            <SignUp onSignUpSuccess={handleSignUpSuccess} />
            <Login
              isInputVisible={isSignInVisible}
              setIsInputVisible={setIsSignInVisible}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
