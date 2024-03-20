import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import Input from "../Input.jsx";
import Modal from "./Modal.jsx";
import "./style.css";
import { logError } from "../../../../server/src/util/logging.js";
import UploadImages from "../postItem/UploadImages.jsx";
import PropTypes from "prop-types";

const SignUp = ({ onSignUpSuccess }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    userImageURL: "",
  };

  const handleRegister = async (values) => {
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setModalVisible(false);
        onSignUpSuccess();
      } else {
        const data = await response.json();
        if (
          (response.status === 400 &&
            data.message === "This username is already taken") ||
          (response.status === 400 &&
            data.message === "This email already exists")
        ) {
          setError(data.message || "Registration failed");
        }
      }
    } catch (error) {
      logError(error);
      setError(`An error occurred while registering: ${error.message}`);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleReset,
    errors,
    isSubmitting,
  } = useForm(initialValues, handleRegister);

  const handleCloseAndReset = () => {
    handleReset(); // Reset the form values and errors
    setModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.title = "Sign Up";
    } else {
      document.title = "Home";
    }
  }, [isModalVisible]);

  return (
    <div>
      <button
        className="get-started-button"
        onClick={() => setModalVisible(true)}
      >
        Sign Up
      </button>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <div className="upload-container">
          <span className="upload-text">
            Upload your profile picture (up to 2MB)
          </span>
          <UploadImages handleImageUpload={handleImageUpload} />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            className="custom-input"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Username*"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <Input
            className="custom-input"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          <Input
            className="custom-input"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />

          <br />

          <Input
            className="custom-input"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password*"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <Input
            className="custom-input"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password*"
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <br />

          <Input
            className="custom-input"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email*"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <Input
            className="custom-input"
            name="city"
            value={values.city}
            onChange={handleChange}
            placeholder="City*"
            required
          />
          {errors.city && <p className="error">{errors.city}</p>}
          {error && <div className="global-error">{error}</div>}

          <button
            className="submit-button"
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Submit
          </button>

          <button
            className="close-button"
            type="button"
            onClick={handleCloseAndReset}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

SignUp.propTypes = {
  onSignUpSuccess: PropTypes.func,
};

export default SignUp;
