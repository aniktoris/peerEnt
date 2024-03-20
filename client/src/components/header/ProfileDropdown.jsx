import React, { useState } from "react";
import "./ProfileDropdown.css";
import ProfilePic from "../../assets/fake-user.jpg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ onLogout, profilePicture }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate("/");
    }
    // Close the dropdown after logout
    setIsOpen(false);
  };
  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <div className="dropdown">
      <div className="profile-picture" onClick={toggleDropdown}>
        <img src={profilePicture || ProfilePic} alt="Profile" />
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={handleLogout}>Logout</li>
          <li onClick={handleNavigate}>Your Profile/Items</li>
        </ul>
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  onLogout: PropTypes.func.isRequired,
  profilePicture: PropTypes.string,
};

export default ProfileDropdown;
