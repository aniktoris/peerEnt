import React, { useState, useEffect } from "react";
import "./Message.css";
import { useAuth } from "../Account/AuthContext";
import MessageIcon from "../../assets/message.svg";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const { userData } = useAuth();
  const [listedItems, setListedItems] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsIdWithNotifications, setItemsIdWithNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.user) {
      const { user } = userData;
      const userId = user._id;

      const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `${process.env.BASE_SERVER_URL}/api/transactions/${userId}`
          );
          const data = await response.json();
          setListedItems(data.listedItems);
        } catch (error) {
          // console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();
    }
  }, [userData]);

  useEffect(() => {
    const socket = io(process.env.BASE_SERVER_URL);

    socket.on("notification", (message) => {
      const itemId = message.split("-")[1]; // Extract the item ID from the message

      // Check if the item belongs to the current user
      const itemBelongsToUser = listedItems.some((item) => item._id === itemId);

      if (itemBelongsToUser && !itemsIdWithNotifications.includes(itemId)) {
        setItemsIdWithNotifications((prevItemsIds) => [
          ...prevItemsIds,
          itemId,
        ]);
        setNotificationCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [listedItems, itemsIdWithNotifications]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelectedItem = (itemId) => {
    navigate(`/item/${itemId}`);
    toggleDropdown();
  };

  return (
    <div className="message-container">
      <div className="add-item-icon-container" onClick={toggleDropdown}>
        <img src={MessageIcon} alt="Message" className="add-item-icon" />
        {notificationCount > 0 && (
          <div className="notification-count">{notificationCount}</div>
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {listedItems
            .filter((item) => itemsIdWithNotifications.includes(item._id))
            .map((item) => (
              <li key={item._id} onClick={() => handleSelectedItem(item._id)}>
                {item.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Message;
