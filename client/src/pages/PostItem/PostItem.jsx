import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import PostItemForm from "../../components/postItem/PostItemForm";
import useFetch from "../../hooks/useFetch.js";
import SuccessPopup from "../../components/postItem/SuccessPopup";

const PostItem = () => {
  const { isLoading, error, performFetch } = useFetch("/item", (result) => {
    // Handle successful response
    if (result.success) {
      setSuccess(true); // Set the state to indicate success
      setItemId(result.item._id); // Set the ID of the newly added item
    } else {
      // Handle unsuccessful response
    }
  });

  const [userData, setUserData] = useState(null); // State to hold user data
  const [success, setSuccess] = useState(false); // State to track success
  const [itemId, setItemId] = useState(null); // State to store the item ID

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // This effect runs only once on component mount

  const handleSubmit = (formData) => {
    const additionalFields = {
      renter_id: userData.user._id,
    };
    const postData = { ...formData, ...additionalFields };

    performFetch({
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <Header />
      <PostItemForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      {success && <SuccessPopup itemId={itemId} />}
      <Footer />
    </div>
  );
};

export default PostItem;
