import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import PropTypes from "prop-types";
import "./Item.css";
import Popup from "../popUp/Popup.jsx";
import { useAuth } from "../Account/AuthContext";
import ProfilePic from "../../assets/fake-user.jpg";
import SideChat from "../chat/SideChat.jsx";
import { logError } from "../../../../server/src/util/logging.js";
function Item() {
  const { itemId } = useParams(); // Extract itemId from URL params using useParams
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [item, setItem] = useState(null);
  const [showSideChat, setShowSideChat] = useState(false);
  const { isAuthenticated, userData } = useAuth();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/item/${itemId}`,
    (response) => {
      const newItem = response.result; // Extract the item from the response
      setItem(newItem); // Update the state with the received item
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [itemId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!item) {
    return <div>No data found.</div>;
  }

  const handleRent = (itemId) => {
    handleNavigate(`/rentPage/${itemId}`);
  };
  // const handleChat = (itemId) => {
  //   handleNavigate(`/chatPage/${itemId}`);
  // };

  const handleChat = () => {
    if (isAuthenticated) {
      setShowSideChat((prevShowSideChat) => !prevShowSideChat);
    } else {
      setShowPopup(true);
    }
  };
  const handleCloseSidebar = () => {
    setShowSideChat(false);
    // handleNavigate(`/chat/${itemId}`);
  };

  const handleNavigate = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowPopup(true); // Show the popup if the user is not signed in
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const userLocale = navigator.language;

  const updateItemActiveStatus = async () => {
    try {
      await performFetch({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      navigate("/profile");
      cancelFetch();
    } catch (error) {
      logError(`Error deleting item: ${error.message}`);
    }
  };

  return (
    <>
      {item.active && (
        <div className="item">
          <div className="item_renter-info">
            <img
              className="item_renter-image"
              src={item.user.userImageURL || ProfilePic}
              alt={`Renter ${item.user.username}`}
            />
            <span>
              {item.user.firstName && item.user.lastName ? (
                <>
                  {item.user.firstName} {item.user.lastName}
                </>
              ) : (
                item.user.username
              )}
            </span>
          </div>
          <h2 className="item_title">{item.title}</h2>
          <img className="item_image" src={item.imageURL} alt={item.title} />
          <div className="item_details">
            <p className="item_detail">
              <span className="item_label">Category:</span> {item.category}
            </p>
            <p className="item_detail">
              <span className="item_label">Description:</span>{" "}
              {item.description}
            </p>
            <p className="item_detail">
              <span className="item_label">
                {item.price === null || item.price === 0
                  ? "Free to rent"
                  : "Price:"}
              </span>
              {item.price === null || item.price === 0
                ? ""
                : new Intl.NumberFormat(userLocale, {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.price)}
            </p>
            {item.deposit === null || item.deposit === 0 ? (
              ""
            ) : (
              <p className="item_detail">
                <span className="item_label">Deposit:</span>{" "}
                {new Intl.NumberFormat(userLocale, {
                  style: "currency",
                  currency: "EUR",
                }).format(item.deposit)}
              </p>
            )}
            <p className="item_detail">
              <span className="item_label">Location:</span> {item.user.city}
            </p>
          </div>
          <div className="buttons">
            {isAuthenticated && userData.user._id === item.renter_id && (
              <button className="rent" onClick={updateItemActiveStatus}>
                Disable
              </button>
            )}

            {isAuthenticated && userData.user._id !== item.renter_id && (
              <button className="rent" onClick={() => handleRent(itemId)}>
                Rent
              </button>
            )}

            {!isAuthenticated && (
              <button className="rent" onClick={() => handleRent(itemId)}>
                Rent
              </button>
            )}

            <button className="chat" onClick={handleChat}>
              Chat
            </button>
            <SideChat open={showSideChat} onClose={handleCloseSidebar} />
          </div>
        </div>
      )}
      {showPopup && (
        <Popup
          message="Please sign in to access this feature!"
          buttonText="Close"
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

Item.propTypes = {
  itemId: PropTypes.string,
};

export default Item;
