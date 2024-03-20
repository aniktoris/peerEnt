import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfilePic from "../../assets/fake-user.jpg";
import "./UserInfo.css";

const UserProfile = ({ user }) => {
  const { firstName, lastName, username, city, email, userImageURL } = user;
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage(
        "Order placed successfully! The item has been rented out. You will receive a confirmation email shortly."
      );
    }

    if (query.get("canceled")) {
      setMessage(
        "Unfortunately, order canceled - continue with purchase when you're ready."
      );
    }
  }, []);

  return (
    <div className="user-profile-container">
      <div className="user-image">
        <img
          src={userImageURL || ProfilePic} // Use ProfilePic if userImageURL is not provided
          alt="User"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        />
      </div>
      <div className="user-details">
        <h1>
          Hi {firstName && lastName ? `${firstName} ${lastName}` : username}{" "}
        </h1>
        <p>Location: {city}</p>
        <p>Email: {email}</p>
      </div>
      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

// PropTypes for type checking
UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userImageURL: PropTypes.string,
  }).isRequired,
};

export default UserProfile;
