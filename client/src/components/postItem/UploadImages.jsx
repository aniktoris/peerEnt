import React, { useState } from "react";
import "./UploadImages.css";
import PropTypes from "prop-types";

const UploadImages = ({ handleImageUpload }) => {
  const [imageSrc, setImageSrc] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnChange = async (changeEvent) => {
    const file = changeEvent.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB in bytes
        alert("File size exceeds 2MB. Please select a smaller file");
        changeEvent.target.value = null;
        setImageSrc(null);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "user-uploads");

      setIsUploading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dibnqoge8/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to upload image. Please try again later.");
        }
        const data = await response.json();
        setImageSrc(data.secure_url);
        handleImageUpload(data.secure_url);
      } catch (error) {
        setError(`Error uploading image: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form method="post">
      <p>
        <input
          className="file-input"
          type="file"
          name="file"
          onChange={handleOnChange}
        />
      </p>
      <div className="image-container">
        <img className="upload-image" src={imageSrc} />
      </div>
      {isUploading && <p className="notification">Uploading image...</p>}
      {error && <p className="notification">{error}</p>}
    </form>
  );
};

UploadImages.propTypes = {
  handleImageUpload: PropTypes.func,
};

export default UploadImages;
